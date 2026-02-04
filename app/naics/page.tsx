'use client';

import { useEffect, useState } from 'react';
import { NAICSList } from '@/components/naics/NAICSList';
import { getNAICSSummary, type NAICSCode } from '@/lib/api';

export default function NAICSPage() {
  const [naicsCodes, setNAICSCodes] = useState<NAICSCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNAICS() {
      try {
        setLoading(true);
        setError(null);

        const result = await getNAICSSummary();

        if (result.success && result.data) {
          setNAICSCodes(result.data);
        } else {
          setError(result.error || 'Failed to load NAICS data');
        }
      } catch (err) {
        console.error('Error fetching NAICS data:', err);
        setError('Failed to load NAICS data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchNAICS();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#FFD700] text-xl">LOADING NAICS DATA...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-[#D50000] text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#00E5FF] text-black rounded font-bold hover:bg-[#26C6DA] transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <div className="border-b border-[#666666] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <a href="/" className="text-[#B0B0B0] hover:text-[#00E5FF] transition-colors">
              DASHBOARD
            </a>
            <a href="/naics" className="text-[#FFD700] font-bold hover:text-[#00E5FF] transition-colors">
              NAICS INDUSTRIES
            </a>
          </div>
          <div className="text-[#666666] text-sm">
            boomberg.xyz
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#666666] px-6 py-6 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#FFD700] mb-2">
            NAICS INDUSTRY TRACKING
          </h1>
          <p className="text-[#B0B0B0]">
            Track defense spending by North American Industry Classification System (NAICS) codes.
            Discover which companies are winning contracts in specific technology and defense sectors.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <NAICSList data={naicsCodes} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#666666] px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#666666]">
            <div>
              Data Sources: USAspending.gov | Last Updated: {new Date().toLocaleDateString()}
            </div>
            <div className="flex gap-4">
              <a href="/" className="hover:text-[#00E5FF] transition-colors">Dashboard</a>
              <a href="#" className="hover:text-[#00E5FF] transition-colors">Methodology</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
