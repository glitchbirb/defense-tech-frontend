'use client';

import { formatCurrency, formatRelativeTime } from '@/lib/formatting';
import { Stats } from '@/types';

interface HeaderStatsProps {
  stats: Stats;
  lastUpdated?: string;
}

export function HeaderStats({ stats, lastUpdated }: HeaderStatsProps) {
  return (
    <div className="bg-[#0a0e27] border-b border-[#1a2147] px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">DEFENSE-TECH SPENDING TRACKER</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <StatItem
            label="Total"
            value={formatCurrency(stats.total_spending_usd)}
            highlight
          />
          <StatItem
            label="Companies"
            value={stats.num_companies.toString()}
          />
          <StatItem
            label="Agencies"
            value={stats.num_agencies.toString()}
          />
          <StatItem
            label="Contracts"
            value={stats.total_defense_contracts.toLocaleString()}
          />
          <StatItem
            label="Avg"
            value={formatCurrency(stats.avg_contract_value_usd)}
          />
          {lastUpdated && (
            <StatItem
              label="Updated"
              value={formatRelativeTime(lastUpdated)}
              subdued
            />
          )}
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-500 text-xs">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  highlight,
  subdued
}: {
  label: string;
  value: string;
  highlight?: boolean;
  subdued?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={subdued ? "text-gray-500" : "text-gray-400"}>
        {label}:
      </span>
      <span className={
        highlight
          ? "text-[#00d4ff] font-bold"
          : subdued
          ? "text-gray-400"
          : "text-[#00d4ff] font-mono"
      }>
        {value}
      </span>
    </div>
  );
}
