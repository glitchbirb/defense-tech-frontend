'use client';

import { formatCurrency } from '@/lib/formatting';

export function TrendingInsights() {
  return (
    <div className="bg-[#0f1433] border border-[#1a2147] rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#00ff00] mb-4">TRENDING INSIGHTS</h2>

      <div className="space-y-4">
        {/* Biggest Contract */}
        <InsightCard
          icon="📈"
          title="Biggest Contract This Month"
          content={
            <>
              <p className="text-[#00d4ff] font-bold">Lockheed Martin → Google Cloud</p>
              <p className="text-[#00ff00] text-2xl font-mono my-2">{formatCurrency(500200000)}</p>
              <p className="text-gray-400 text-sm">Cloud Infrastructure (C303)</p>
              <p className="text-gray-400 text-sm">Date: 2024-02-01</p>
              <p className="text-green-500 text-sm mt-2">↑ 12% from Jan | ↑ 35% YoY</p>
            </>
          }
          actions={
            <>
              <button className="text-xs px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors">
                View Details
              </button>
              <button className="text-xs px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors">
                Share
              </button>
            </>
          }
        />

        {/* Most Active Pair */}
        <InsightCard
          icon="🔥"
          title="Most Active Partnership"
          content={
            <>
              <p className="text-[#00d4ff] font-bold">Lockheed Martin ↔ Google Cloud</p>
              <p className="text-gray-300 text-sm my-2">Total Value: {formatCurrency(1200000000)} (8 contracts)</p>
              <p className="text-gray-400 text-sm">Primary Services: Cloud, AI/ML, Cybersecurity</p>
              <p className="text-green-500 text-sm mt-2">↑ Growing (3 contracts in last 6 months)</p>
            </>
          }
          actions={
            <>
              <button className="text-xs px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors">
                View All Contracts
              </button>
            </>
          }
        />

        {/* Emerging Category */}
        <InsightCard
          icon="🎯"
          title="Fastest Growing Category"
          content={
            <>
              <p className="text-[#00d4ff] font-bold">Artificial Intelligence & Machine Learning</p>
              <p className="text-gray-300 text-sm my-2">YTD Spending: {formatCurrency(340000000)}</p>
              <p className="text-green-500 text-sm">↑ 45% vs. last year</p>
              <p className="text-gray-400 text-sm mt-2">Top Recipients: Google (32%), Microsoft (28%), Amazon (18%)</p>
            </>
          }
          actions={
            <>
              <button className="text-xs px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors">
                Filter by Category
              </button>
            </>
          }
        />
      </div>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  content,
  actions
}: {
  icon: string;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-[#00d4ff] pl-4 py-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-sm font-bold text-gray-300">{title}</h3>
      </div>
      <div className="mb-3">{content}</div>
      {actions && (
        <div className="flex gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
