/**
 * TypeScript type definitions for Defense-Tech Tracker
 */

export interface Contract {
  contract_id: string;
  company: string;
  agency: string;
  contract_value: number;
  contract_date: string;
  description: string;
  keywords: string[];
  is_defense_related: boolean;
}

export interface Company {
  name: string;
  total_contracts: number;
  total_contract_value: number;
  avg_contract_value: number;
  latest_contract_date: string;
  num_agencies: number;
  federal_percentage: number;
}

export interface CompanyDetails extends Company {
  contracts: Contract[];
}

export interface Stats {
  total_spending_usd: number;
  total_defense_contracts: number;
  num_companies: number;
  num_agencies: number;
  avg_contract_value_usd: number;
  quarterly_trend: QuarterlyData[];
}

export interface QuarterlyData {
  quarter: string;
  spending: number;
  contracts: number;
}

export interface SearchFilters {
  company?: string;
  agency?: string;
  min_value?: number;
  max_value?: number;
  start_date?: string;
  end_date?: string;
  defense_only?: boolean;
  limit?: number;
}
