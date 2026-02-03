/**
 * API Client for Defense-Tech Tracker Backend
 * Base URL: https://boomberg.xyz
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://boomberg.xyz';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

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

export interface CompanyDetails {
  name: string;
  total_contracts: number;
  total_contract_value: number;
  avg_contract_value: number;
  latest_contract_date: string;
  num_agencies: number;
  federal_percentage: number;
  contracts: Contract[];
}

export interface SpendingSummary {
  name: string;
  total_contracts: number;
  total_contract_value: number;
  avg_contract_value: number;
  latest_contract_date: string;
  num_agencies: number;
  federal_percentage: number;
}

export interface Stats {
  total_spending_usd: number;
  total_defense_contracts: number;
  num_companies: number;
  num_agencies: number;
  avg_contract_value_usd: number;
  quarterly_trend: Array<{
    quarter: string;
    spending: number;
    contracts: number;
  }>;
}

/**
 * Get spending summary for all companies
 */
export async function getSpendingSummary(params?: {
  limit?: number;
  sort?: 'total_value' | 'total_contracts';
}): Promise<ApiResponse<SpendingSummary[]>> {
  try {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.sort) query.set('sort', params.sort);

    const url = `${API_BASE_URL}/api/spending/summary${query.toString() ? `?${query}` : ''}`;

    const response = await fetch(url);
    const json = await response.json();

    // Transform backend format {count, data} to {success, data}
    // Map 'company' field to 'name' and parse numeric values
    const transformedData = (json.data || []).map((item: any) => ({
      name: item.company || item.name,
      total_contracts: item.total_contracts,
      total_contract_value: parseFloat(item.total_value || item.total_contract_value || 0),
      avg_contract_value: parseFloat(item.avg_value || item.avg_contract_value || 0),
      latest_contract_date: item.latest_date || item.latest_contract_date,
      num_agencies: item.num_agencies,
      federal_percentage: item.federal_percentage
    }));

    return {
      success: true,
      data: transformedData,
      count: json.count
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch spending summary'
    };
  }
}

/**
 * Get details for a specific company
 */
export async function getCompanyDetails(companyName: string): Promise<ApiResponse<CompanyDetails>> {
  const url = `${API_BASE_URL}/api/company/${encodeURIComponent(companyName)}`;

  const response = await fetch(url);
  return response.json();
}

/**
 * Search contracts with filters
 */
export async function searchContracts(params?: {
  company?: string;
  agency?: string;
  min_value?: number;
  max_value?: number;
  start_date?: string;
  end_date?: string;
  defense_only?: boolean;
  limit?: number;
}): Promise<ApiResponse<Contract[]>> {
  try {
    const query = new URLSearchParams();

    if (params?.company) query.set('company', params.company);
    if (params?.agency) query.set('agency', params.agency);
    if (params?.min_value) query.set('min_value', params.min_value.toString());
    if (params?.max_value) query.set('max_value', params.max_value.toString());
    if (params?.start_date) query.set('start_date', params.start_date);
    if (params?.end_date) query.set('end_date', params.end_date);
    if (params?.defense_only !== undefined) query.set('defense_only', params.defense_only.toString());
    if (params?.limit) query.set('limit', params.limit.toString());

    const url = `${API_BASE_URL}/api/contracts/search${query.toString() ? `?${query}` : ''}`;

    const response = await fetch(url);
    const json = await response.json();

    // Transform backend format {count, data} to {success, data}
    return {
      success: true,
      data: json.data || [],
      count: json.count
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search contracts'
    };
  }
}

/**
 * Get overall statistics
 */
export async function getStats(): Promise<ApiResponse<Stats>> {
  try {
    const url = `${API_BASE_URL}/api/stats`;

    const response = await fetch(url);
    const json = await response.json();

    // Backend already returns {success, data} format for this endpoint
    if (json.success && json.data) {
      return json;
    }

    // Fallback if format is different
    return {
      success: true,
      data: json
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch stats'
    };
  }
}

/**
 * Health check
 */
export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  const url = `${API_BASE_URL}/health`;

  const response = await fetch(url);
  return response.json();
}
