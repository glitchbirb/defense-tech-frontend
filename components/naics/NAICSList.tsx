'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/formatting';
import type { NAICSCode } from '@/lib/api';
import { NAICSRecipientsModal } from './NAICSRecipientsModal';

interface NAICSListProps {
  data: NAICSCode[];
}

export function NAICSList({ data }: NAICSListProps) {
  const [selectedNAICS, setSelectedNAICS] = useState<NAICSCode | null>(null);

  return (
    <>
      <div className="bg-black border border-[#666666] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#FFD700]">NAICS INDUSTRY CODES</h2>
          <span className="text-xs text-[#666666]">{data.length} tracked industries</span>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {data.map((naics) => (
            <div
              key={naics.code}
              className="bg-[#1a1a1a] border border-[#333333] rounded-lg p-4 hover:border-[#00E5FF] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#FFA500] font-mono font-bold text-lg">
                      {naics.code}
                    </span>
                    <span className="text-white text-sm">
                      {naics.description}
                    </span>
                  </div>
                  <div className="flex gap-6 text-xs text-[#B0B0B0]">
                    <div>
                      <span className="text-[#666666]">Recipients:</span>{' '}
                      <span className="text-white font-mono">{naics.total_recipients}</span>
                    </div>
                    <div>
                      <span className="text-[#666666]">Total Spending:</span>{' '}
                      <span className="text-[#00E5FF] font-mono font-bold">
                        {formatCurrency(naics.total_spending)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#666666]">Avg per Recipient:</span>{' '}
                      <span className="text-white font-mono">
                        {formatCurrency(naics.avg_spending_per_recipient)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNAICS(naics)}
                  className="px-4 py-2 bg-[#00E5FF] text-black rounded font-bold hover:bg-[#26C6DA] transition-colors text-sm whitespace-nowrap"
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-[#666666]">
          Data from USAspending.gov | NAICS = North American Industry Classification System
        </div>
      </div>

      {selectedNAICS && (
        <NAICSRecipientsModal
          naics={selectedNAICS}
          onClose={() => setSelectedNAICS(null)}
        />
      )}
    </>
  );
}
