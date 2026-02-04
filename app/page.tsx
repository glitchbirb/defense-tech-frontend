'use client';

import { useEffect, useState } from 'react';
import { HeaderStats } from '@/components/dashboard/HeaderStats';
import { SearchBar } from '@/components/search/SearchBar';
import { SimpleBarChart } from '@/components/dashboard/SimpleBarChart';
import { RecentContracts } from '@/components/dashboard/RecentContracts';
import { TrendingInsights } from '@/components/dashboard/TrendingInsights';
import { getSpendingSummary, searchContracts, getStats, getAgenciesSpending } from '@/lib/api';
import type { Company, Contract, Stats } from '@/types';
import type { AgencySpending } from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [agencies, setAgencies] = useState<AgencySpending[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [statsRes, summaryRes, agenciesRes, contractsRes] = await Promise.all([
          getStats(),
          getSpendingSummary({ limit: 10, sort: 'total_value' }),
          getAgenciesSpending({ limit: 10 }),
          searchContracts({ limit: 50, defense_only: true })
        ]);

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }

        if (summaryRes.success && summaryRes.data) {
          setCompanies(summaryRes.data);
        }

        if (agenciesRes.success && agenciesRes.data) {
          setAgencies(agenciesRes.data);
        }

        if (contractsRes.success && contractsRes.data) {
          setContracts(contractsRes.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#00ff00] text-xl">LOADING DEFENSE-TECH DATA...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#00d4ff] text-[#0a0e27] rounded font-bold hover:bg-[#00ff00] transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Header Stats Bar */}
      <HeaderStats stats={stats} lastUpdated={new Date().toISOString()} />

      {/* Search Bar */}
      <SearchBar />

      {/* Main Dashboard Grid */}
      <div className="px-6 pb-6">
        {/* Top Row: Agencies and Contractors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SimpleBarChart
            data={agencies.slice(0, 10).map(a => ({
              name: a.agency.length > 25 ? a.agency.substring(0, 25) + '...' : a.agency,
              value: a.total_value,
              fullName: a.agency
            }))}
            color="#8b5cf6"
            title="TOP SPENDING AGENCIES"
          />
          <SimpleBarChart
            data={companies.slice(0, 10).map(c => ({
              name: c.name.length > 20 ? c.name.substring(0, 20) + '...' : c.name,
              value: c.total_contract_value,
              fullName: c.name
            }))}
            color="#00d4ff"
            title="TOP CONTRACTORS"
          />
        </div>

        {/* Bottom Row: Recent Contracts and Trending Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentContracts contracts={contracts} />
          </div>
          <div>
            <TrendingInsights contracts={contracts} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1a2147] px-6 py-4 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            Data Sources: USAspending.gov | SAM.gov | Last Updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#00d4ff] transition-colors">Methodology</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
