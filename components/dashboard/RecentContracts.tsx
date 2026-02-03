'use client';

import { formatCurrencyFull, formatDate, getAmountColor } from '@/lib/formatting';
import { Contract } from '@/types';

interface RecentContractsProps {
  contracts: Contract[];
}

export function RecentContracts({ contracts }: RecentContractsProps) {
  return (
    <div className="bg-[#0f1433] border border-[#1a2147] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#00ff00]">RECENT CONTRACTS</h2>
        <div className="flex gap-2 text-xs">
          <button className="px-3 py-1 bg-[#1a2147] rounded hover:bg-[#00d4ff] hover:text-[#0a0e27] transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1a2147]">
              <th className="text-left py-2 px-2 text-gray-400 font-normal">Company</th>
              <th className="text-left py-2 px-2 text-gray-400 font-normal">Agency</th>
              <th className="text-right py-2 px-2 text-gray-400 font-normal">Amount</th>
              <th className="text-left py-2 px-2 text-gray-400 font-normal">Date</th>
              <th className="text-center py-2 px-2 text-gray-400 font-normal">Source</th>
            </tr>
          </thead>
          <tbody>
            {contracts.slice(0, 20).map((contract, index) => (
              <tr
                key={index}
                className="border-b border-[#1a2147]/50 hover:bg-[#1a2147]/30 cursor-pointer transition-colors"
              >
                <td className="py-3 px-2 text-[#00d4ff]">
                  {contract.company}
                </td>
                <td className="py-3 px-2 text-gray-300">
                  {contract.agency}
                </td>
                <td className={`py-3 px-2 text-right font-mono ${getAmountColor(contract.contract_value)}`}>
                  {formatCurrencyFull(contract.contract_value)}
                </td>
                <td className="py-3 px-2 text-gray-400 font-mono">
                  {formatDate(contract.contract_date)}
                </td>
                <td className="py-3 px-2 text-center">
                  <a
                    href="#"
                    className="text-green-500 hover:text-green-400 text-xs"
                    title="View source on USAspending.gov"
                  >
                    ✓ USA 🔗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>Showing 1-20 of {contracts.length.toLocaleString()} contracts</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
