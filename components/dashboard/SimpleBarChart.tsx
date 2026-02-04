'use client';

import { formatCurrency } from '@/lib/formatting';

interface DataPoint {
  name: string;
  value: number;
  fullName: string;
}

interface SimpleBarChartProps {
  data: DataPoint[];
  color: string;
  title: string;
}

export function SimpleBarChart({ data, color, title }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-black border border-[#666666] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#FFD700]">{title}</h2>
        <span className="text-xs text-[#666666]">Click for details ({data.length} items)</span>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="group">
            <div className="flex items-center gap-3">
              <div className="w-32 text-right text-[#FFA500] text-sm truncate">
                {item.name}
              </div>
              <div className="flex-1 bg-[#1a1a1a] rounded-full h-4 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 cursor-pointer hover:opacity-80"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: color,
                    minWidth: item.value > 0 ? '2%' : '0%'
                  }}
                  onClick={() => alert(`${item.fullName}: ${formatCurrency(item.value)}`)}
                />
              </div>
              <div className="w-24 text-left text-white text-sm font-mono font-bold">
                {formatCurrency(item.value)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-[#666666]">
        Data from USAspending.gov | Last verified: 2h ago
      </div>
    </div>
  );
}
