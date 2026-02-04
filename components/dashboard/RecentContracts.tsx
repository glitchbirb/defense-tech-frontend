'use client';

import { formatCurrencyFull, formatDate, getAmountColor } from '@/lib/formatting';
import { Contract } from '@/types';
import { useState } from 'react';
import { ContractModal } from '@/components/contracts/ContractModal';

interface RecentContractsProps {
  contracts: Contract[];
}

export function RecentContracts({ contracts }: RecentContractsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleContractClick = (contract: Contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContract(null);
  };

  return (
    <div className="bg-black border border-[#666666] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#FFD700]">RECENT CONTRACTS</h2>
        <div className="flex gap-2 text-xs">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1 bg-[#1a1a1a] border border-[#666666] rounded hover:bg-[#00E5FF] hover:text-black transition-colors text-[#B0B0B0] hover:border-[#00E5FF]"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#666666]">
              <th className="text-left py-2 px-2 text-[#FFD700] font-normal">Company</th>
              <th className="text-left py-2 px-2 text-[#FFD700] font-normal">Agency</th>
              <th className="text-right py-2 px-2 text-[#FFD700] font-normal">Amount</th>
              <th className="text-left py-2 px-2 text-[#FFD700] font-normal">Date</th>
              <th className="text-center py-2 px-2 text-[#FFD700] font-normal">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentContracts.map((contract, index) => (
              <tr
                key={index}
                className="border-b border-[#666666]/50 hover:bg-[#1a1a1a] transition-colors"
              >
                <td className="py-3 px-2">
                  <button
                    onClick={() => handleCompanyClick(contract.company)}
                    className="text-[#00E5FF] hover:text-[#26C6DA] transition-colors underline decoration-dotted"
                  >
                    {contract.company}
                  </button>
                </td>
                <td className="py-3 px-2 text-[#FFA500]">
                  {contract.agency}
                </td>
                <td className={`py-3 px-2 text-right font-mono ${getAmountColor(contract.contract_value)}`}>
                  {formatCurrencyFull(contract.contract_value)}
                </td>
                <td className="py-3 px-2 text-[#B0B0B0] font-mono">
                  {formatDate(contract.contract_date)}
                </td>
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => handleContractClick(contract)}
                    className="text-[#00E5FF] hover:text-[#26C6DA] text-xs font-semibold transition-colors"
                    title="View contract details"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[#666666]">
        <div>
          Showing {startIndex + 1}-{Math.min(endIndex, contracts.length)} of {contracts.length.toLocaleString()} contracts
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#FFA500]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-[#666666] rounded hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#B0B0B0]"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-[#666666] rounded hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#B0B0B0]"
          >
            Next
          </button>
        </div>
      </div>

      {/* Contract Details Modal */}
      <ContractModal
        contract={selectedContract}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
