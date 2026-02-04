'use client';

import { Contract } from '@/types';
import { formatCurrencyFull, formatDate } from '@/lib/formatting';

interface ContractModalProps {
  contract: Contract | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContractModal({ contract, isOpen, onClose }: ContractModalProps) {
  if (!isOpen || !contract) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-black border-2 border-[#00E5FF] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-black border-b border-[#666666] px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#FFD700]">CONTRACT DETAILS</h2>
          <button
            onClick={onClose}
            className="text-[#B0B0B0] hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Info */}
          <div className="space-y-3">
            <div>
              <label className="text-xs text-[#FFA500] uppercase">Company</label>
              <p className="text-[#00E5FF] text-lg font-semibold">{contract.company}</p>
            </div>

            <div>
              <label className="text-xs text-[#FFA500] uppercase">Contracting Agency</label>
              <p className="text-[#FFA500] text-lg">{contract.agency}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#FFA500] uppercase">Contract Value</label>
                <p className="text-white text-2xl font-bold font-mono">
                  {formatCurrencyFull(contract.contract_value)}
                </p>
              </div>
              <div>
                <label className="text-xs text-[#FFA500] uppercase">Contract Date</label>
                <p className="text-[#B0B0B0] text-lg font-mono">{formatDate(contract.contract_date)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {contract.description && (
            <div>
              <label className="text-xs text-[#FFA500] uppercase mb-2 block">Description</label>
              <div className="bg-[#1a1a1a] border border-[#666666] rounded p-4">
                <p className="text-[#B0B0B0] leading-relaxed">{contract.description}</p>
              </div>
            </div>
          )}

          {/* Keywords */}
          {contract.keywords && contract.keywords.length > 0 && (
            <div>
              <label className="text-xs text-[#FFA500] uppercase mb-2 block">Keywords</label>
              <div className="flex flex-wrap gap-2">
                {contract.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#1a1a1a] border border-[#666666] rounded-full text-xs text-[#00E5FF]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contract ID */}
          <div>
            <label className="text-xs text-[#FFA500] uppercase">Contract ID</label>
            <p className="text-[#B0B0B0] text-sm font-mono">{contract.contract_id}</p>
          </div>

          {/* Defense Related Badge */}
          {contract.is_defense_related && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D50000]/20 border border-[#D50000] rounded">
              <span className="text-[#D50000] text-sm font-semibold">🎯 Defense Related</span>
            </div>
          )}

          {/* External Link */}
          <div className="pt-4 border-t border-[#666666]">
            <a
              href={`https://www.usaspending.gov/award/${contract.contract_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#666666] hover:text-[#00E5FF] transition-colors"
            >
              View on USAspending.gov (requires login) →
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-black border-t border-[#666666] px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-[#00E5FF] text-black rounded font-bold hover:bg-[#26C6DA] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
