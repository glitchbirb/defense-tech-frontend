'use client';

import { formatCurrencyFull, formatDate, getAmountColor } from '@/lib/formatting';
import { Contract } from '@/types';
import { useState } from 'react';

interface RecentContractsProps {
  contracts: Contract[];
}

export function RecentContracts({ contracts }: RecentContractsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(contracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContracts = contracts.slice(startIndex, endIndex);

  const handleExportCSV = () => {
    alert('CSV export functionality coming soon!');
  };

  const handleCompanyClick = (companyName: string) => {
    alert(`Company profile for "${companyName}" coming soon!`);
  };

  return (
    <div className="bg-[#0f1433] border border-[#1a2147] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">RECENT CONTRACTS</h2>
        <div className="flex gap-2 text-xs">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1 bg-[#1a2147] rounded hover:bg-[#00d4ff] hover:text-[#0a0e27] transition-colors"
          >
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
            {currentContracts.map((contract, index) => (
              <tr
                key={index}
                className="border-b border-[#1a2147]/50 hover:bg-[#1a2147]/30 transition-colors"
              >
                <td className="py-3 px-2">
                  <button
                    onClick={() => handleCompanyClick(contract.company)}
                    className="text-[#00d4ff] hover:text-[#00ff00] transition-colors underline decoration-dotted"
                  >
                    {contract.company}
                  </button>
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
                    href={`https://www.usaspending.gov/award/${contract.contract_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
        <div>
          Showing {startIndex + 1}-{Math.min(endIndex, contracts.length)} of {contracts.length.toLocaleString()} contracts
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-[#1a2147] rounded hover:border-[#00d4ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
