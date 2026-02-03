'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="px-6 py-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contractors, recipients, contracts... (Cmd+K)"
            className="w-full px-6 py-4 bg-[#0f1433] border-2 border-[#1a2147] rounded-lg text-[#00ff00] placeholder-gray-500 focus:border-[#00d4ff] focus:outline-none text-lg font-mono transition-colors"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-[#00d4ff] text-[#0a0e27] rounded font-bold hover:bg-[#00ff00] transition-colors"
            >
              SEARCH
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-4 text-sm">
          <button
            type="button"
            className="px-3 py-1 border border-[#1a2147] rounded text-gray-400 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
          >
            Contractor
          </button>
          <button
            type="button"
            className="px-3 py-1 border border-[#1a2147] rounded text-gray-400 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
          >
            Recipient
          </button>
          <button
            type="button"
            className="px-3 py-1 border border-[#1a2147] rounded text-gray-400 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
          >
            Contract
          </button>
          <button
            type="button"
            className="px-3 py-1 border border-[#1a2147] rounded text-gray-400 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
          >
            More Filters ▼
          </button>
        </div>
      </form>
    </div>
  );
}
