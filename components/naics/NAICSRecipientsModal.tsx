'use client';

import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/formatting';
import { getNAICSRecipients, type NAICSCode, type NAICSRecipient } from '@/lib/api';

interface NAICSRecipientsModalProps {
  naics: NAICSCode;
  onClose: () => void;
}

export function NAICSRecipientsModal({ naics, onClose }: NAICSRecipientsModalProps) {
  const [recipients, setRecipients] = useState<NAICSRecipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipients() {
      try {
        setLoading(true);
        setError(null);
        const result = await getNAICSRecipients(naics.code, 100);

        if (result.success && result.data) {
          setRecipients(result.data);
        } else {
          setError(result.error || 'Failed to load recipients');
        }
      } catch (err) {
        setError('Failed to load recipients');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipients();
  }, [naics.code]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0a0a] border-2 border-[#00E5FF] rounded-lg max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-[#666666] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#FFA500] font-mono font-bold text-2xl">{naics.code}</span>
                <span className="text-white text-xl">{naics.description}</span>
              </div>
              <div className="flex gap-6 text-sm text-[#B0B0B0]">
                <div>
                  <span className="text-[#666666]">Total Recipients:</span>{' '}
                  <span className="text-white font-mono">{naics.total_recipients}</span>
                </div>
                <div>
                  <span className="text-[#666666]">Total Spending:</span>{' '}
                  <span className="text-[#00E5FF] font-mono font-bold">
                    {formatCurrency(naics.total_spending)}
                  </span>
                </div>
                <div>
                  <span className="text-[#666666]">Period:</span>{' '}
                  <span className="text-white">{naics.earliest_data} to {naics.latest_data}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#666666] hover:text-white text-3xl leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[#FFD700] text-sm">LOADING RECIPIENTS...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-[#D50000] mb-4">{error}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#00E5FF] text-black rounded font-bold hover:bg-[#26C6DA] transition-colors"
              >
                CLOSE
              </button>
            </div>
          )}

          {!loading && !error && (
            <div>
              <div className="mb-4">
                <h3 className="text-[#FFD700] font-bold text-lg">
                  TOP {recipients.length} CONTRACTORS
                </h3>
                <p className="text-[#666666] text-sm">
                  Ranked by total contract value for NAICS {naics.code}
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#666666]">
                      <th className="text-left py-3 px-4 text-[#FFA500] text-sm font-bold">RANK</th>
                      <th className="text-left py-3 px-4 text-[#FFA500] text-sm font-bold">COMPANY</th>
                      <th className="text-left py-3 px-4 text-[#FFA500] text-sm font-bold">UEI</th>
                      <th className="text-right py-3 px-4 text-[#FFA500] text-sm font-bold">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipients.map((recipient, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#333333] hover:bg-[#1a1a1a] transition-colors"
                      >
                        <td className="py-3 px-4 text-[#00E5FF] font-mono font-bold">
                          #{recipient.rank}
                        </td>
                        <td className="py-3 px-4 text-white">
                          {recipient.recipient_name}
                        </td>
                        <td className="py-3 px-4 text-[#B0B0B0] font-mono text-sm">
                          {recipient.recipient_uei || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-right text-[#00E5FF] font-mono font-bold">
                          {formatCurrency(recipient.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#666666] p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#00E5FF] text-black rounded font-bold hover:bg-[#26C6DA] transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
