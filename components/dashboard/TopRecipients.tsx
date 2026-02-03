'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/formatting';
import { Company } from '@/types';

interface TopRecipientsProps {
  data: Company[];
}

export function TopRecipients({ data }: TopRecipientsProps) {
  // Transform data for recharts
  const chartData = data.slice(0, 10).map(company => ({
    name: company.name.length > 20 ? company.name.substring(0, 20) + '...' : company.name,
    value: company.total_contract_value,
    fullName: company.name
  }));

  return (
    <div className="bg-[#0f1433] border border-[#1a2147] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#00ff00]">TOP RECIPIENTS</h2>
        <span className="text-xs text-gray-500">Click for details</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="horizontal">
          <XAxis type="number" stroke="#666" tick={{ fill: '#666', fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#666"
            tick={{ fill: '#00ff00', fontSize: 11 }}
            width={150}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#0a0e27] border border-[#00d4ff] p-3 rounded">
                    <p className="text-[#00ff00] font-bold">{payload[0].payload.fullName}</p>
                    <p className="text-[#00d4ff]">{formatCurrency(payload[0].value as number)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="value"
            fill="#00ff00"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-gray-500">
        Data from USAspending.gov | Last verified: 2h ago
      </div>
    </div>
  );
}
