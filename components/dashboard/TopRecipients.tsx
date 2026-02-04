'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/formatting';
import { Company } from '@/types';

interface TopRecipientsProps {
  data: Company[];
}

export function TopRecipients({ data }: TopRecipientsProps) {
  const handleBarClick = (data: unknown) => {
    const payload = data as { fullName?: string };
    if (payload.fullName) {
      alert(`Company profile for "${payload.fullName}" coming soon!`);
    }
  };

  // Transform data for recharts
  const chartData = data.slice(0, 10).map(company => ({
    name: company.name.length > 20 ? company.name.substring(0, 20) + '...' : company.name,
    value: company.total_contract_value,
    fullName: company.name
  }));

  // Debug: log chart data
  console.log('TopRecipients chartData:', chartData);

  return (
    <div className="bg-[#0f1433] border border-[#1a2147] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#00ff00]">TOP RECIPIENTS</h2>
        <span className="text-xs text-gray-500">Click for details ({chartData.length} companies)</span>
      </div>

      {chartData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <BarChart
            data={chartData}
            layout="horizontal"
            width={600}
            height={300}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
              <XAxis
                type="number"
                stroke="#666"
                tick={{ fill: '#666', fontSize: 11 }}
                tickFormatter={(value) => {
                  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
                  if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
                  return `$${value}`;
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#666"
                tick={{ fill: '#00ff00', fontSize: 11 }}
                width={150}
              />
          <Tooltip
            cursor={{ fill: 'rgba(0, 255, 0, 0.1)' }}
            contentStyle={{
              backgroundColor: '#0a0e27',
              border: '1px solid #00d4ff',
              borderRadius: '4px',
              padding: '12px'
            }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ backgroundColor: '#0a0e27', border: '1px solid #00d4ff', borderRadius: '4px', padding: '12px' }}>
                    <p style={{ color: '#00ff00', fontWeight: 'bold', margin: 0, marginBottom: '4px' }}>
                      {payload[0].payload.fullName}
                    </p>
                    <p style={{ color: '#00d4ff', margin: 0 }}>
                      {formatCurrency(payload[0].value as number)}
                    </p>
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
                onClick={handleBarClick}
                cursor="pointer"
              />
          </BarChart>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Data from USAspending.gov | Last verified: 2h ago
      </div>
    </div>
  );
}
