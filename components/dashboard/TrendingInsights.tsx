'use client';

import { formatCurrency } from '@/lib/formatting';
import { Contract } from '@/types';

interface TrendingInsightsProps {
  contracts: Contract[];
}

export function TrendingInsights({ contracts }: TrendingInsightsProps) {
  // Find biggest contract
  const biggestContract = contracts.length > 0
    ? contracts.reduce((max, c) => c.contract_value > max.contract_value ? c : max, contracts[0])
    : null;

  // Find most active company-agency pair
  const pairCounts = new Map<string, { count: number; total: number; company: string; agency: string }>();
  contracts.forEach(c => {
    const key = `${c.company}|${c.agency}`;
    const existing = pairCounts.get(key) || { count: 0, total: 0, company: c.company, agency: c.agency };
    pairCounts.set(key, {
      count: existing.count + 1,
      total: existing.total + c.contract_value,
      company: c.company,
      agency: c.agency
    });
  });
  const mostActivePair = Array.from(pairCounts.values())
    .sort((a, b) => b.count - a.count)[0];

  // Analyze keywords for AI/ML category
  const aiKeywords = ['artificial intelligence', 'ai', 'machine learning', 'ml', 'data analytics'];
  const aiContracts = contracts.filter(c =>
    c.keywords.some(k => aiKeywords.some(ai => k.toLowerCase().includes(ai)))
  );
  const aiTotal = aiContracts.reduce((sum, c) => sum + c.contract_value, 0);

  // Calculate top AI recipients
  const aiByCompany = new Map<string, number>();
  aiContracts.forEach(c => {
    aiByCompany.set(c.company, (aiByCompany.get(c.company) || 0) + c.contract_value);
  });
  const topAiCompanies = Array.from(aiByCompany.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([company, value]) => ({
      company,
      percentage: aiTotal > 0 ? Math.round((value / aiTotal) * 100) : 0
    }));
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy link. Please copy manually: ' + window.location.href);
    }
  };

  const handleViewDetails = () => {
    alert('Detailed contract view coming soon!');
  };

  const handleViewAllContracts = () => {
    alert('Contract filtering coming soon!');
  };

  const handleFilterByCategory = () => {
    alert('Category filtering coming soon!');
  };
  return (
    <div className="bg-black border border-[#666666] rounded-lg p-6">
      <h2 className="text-xl font-bold text-[#FFD700] mb-4">TRENDING INSIGHTS</h2>

      <div className="space-y-4">
        {/* Biggest Contract */}
        <InsightCard
          icon="📈"
          title="Largest Recent Contract"
          content={
            biggestContract ? (
              <>
                <p className="text-[#00E5FF] font-bold">{biggestContract.company} ← {biggestContract.agency}</p>
                <p className="text-white text-2xl font-mono font-bold my-2">{formatCurrency(biggestContract.contract_value)}</p>
                <p className="text-[#B0B0B0] text-sm">{biggestContract.description.substring(0, 80)}{biggestContract.description.length > 80 ? '...' : ''}</p>
                <p className="text-[#B0B0B0] text-sm">Date: {new Date(biggestContract.contract_date).toLocaleDateString()}</p>
              </>
            ) : (
              <p className="text-[#B0B0B0]">No contract data available</p>
            )
          }
          actions={
            <>
              <button
                onClick={handleViewDetails}
                className="text-xs px-3 py-1 border border-[#666666] rounded text-[#B0B0B0] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
              >
                View Details
              </button>
              <button
                onClick={handleShare}
                className="text-xs px-3 py-1 border border-[#666666] rounded text-[#B0B0B0] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
              >
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
            mostActivePair ? (
              <>
                <p className="text-[#00E5FF] font-bold">{mostActivePair.company} ↔ {mostActivePair.agency}</p>
                <p className="text-[#FFA500] text-sm my-2">Total Value: <span className="text-white font-bold">{formatCurrency(mostActivePair.total)}</span> ({mostActivePair.count} contracts)</p>
                <p className="text-[#B0B0B0] text-sm">Based on recent contract data</p>
              </>
            ) : (
              <p className="text-[#B0B0B0]">No partnership data available</p>
            )
          }
          actions={
            <>
              <button
                onClick={handleViewAllContracts}
                className="text-xs px-3 py-1 border border-[#666666] rounded text-[#B0B0B0] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
              >
                View All Contracts
              </button>
            </>
          }
        />

        {/* Emerging Category */}
        <InsightCard
          icon="🎯"
          title="AI & Machine Learning Contracts"
          content={
            aiContracts.length > 0 ? (
              <>
                <p className="text-[#00E5FF] font-bold">Artificial Intelligence & Machine Learning</p>
                <p className="text-[#FFA500] text-sm my-2">Total Spending: <span className="text-white font-bold">{formatCurrency(aiTotal)}</span> ({aiContracts.length} contracts)</p>
                {topAiCompanies.length > 0 && (
                  <p className="text-[#B0B0B0] text-sm mt-2">
                    Top Recipients: {topAiCompanies.map(c => `${c.company} (${c.percentage}%)`).join(', ')}
                  </p>
                )}
              </>
            ) : (
              <p className="text-[#B0B0B0]">No AI/ML contracts identified in current data</p>
            )
          }
          actions={
            <>
              <button
                onClick={handleFilterByCategory}
                className="text-xs px-3 py-1 border border-[#666666] rounded text-[#B0B0B0] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
              >
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
    <div className="border-l-2 border-[#00E5FF] pl-4 py-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-sm font-bold text-[#FFA500]">{title}</h3>
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
