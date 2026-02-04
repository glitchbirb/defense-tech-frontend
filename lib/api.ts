/**
 * API Client for Defense-Tech Tracker Backend
 * Base URL: https://api.boomberg.xyz
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.boomberg.xyz';

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

export interface AgencySpending {
  agency: string;
  total_contracts: number;
  total_value: number;
  avg_value: number;
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
 * Get spending summary by agency
 */
export async function getAgenciesSpending(params?: {
  limit?: number;
}): Promise<ApiResponse<AgencySpending[]>> {
  try {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());

    const url = `${API_BASE_URL}/api/spending/agencies${query.toString() ? `?${query}` : ''}`;

    const response = await fetch(url);
    const json = await response.json();

    const transformedData = (json.data || []).map((item: Record<string, unknown>) => ({
      agency: String(item.agency || ''),
      total_contracts: Number(item.total_contracts || 0),
      total_value: Number(item.total_value || 0),
      avg_value: Number(item.avg_value || 0)
    }));

    return {
      success: true,
      data: transformedData,
      count: json.count
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch agencies spending'
    };
  }
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
    const transformedData = (json.data || []).map((item: Record<string, unknown>) => ({
      name: String(item.company || item.name || ''),
      total_contracts: Number(item.total_contracts || 0),
      total_contract_value: Number(item.total_value || item.total_contract_value || 0),
      avg_contract_value: Number(item.avg_value || item.avg_contract_value || 0),
      latest_contract_date: String(item.latest_date || item.latest_contract_date || ''),
      num_agencies: Number(item.num_agencies || 0),
      federal_percentage: Number(item.federal_percentage || 0)
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
      // Convert total_spending_usd from string to number if needed
      const data = {
        ...json.data,
        total_spending_usd: typeof json.data.total_spending_usd === 'string'
          ? parseFloat(json.data.total_spending_usd)
          : json.data.total_spending_usd
      };
      return {
        success: true,
        data
      };
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

/**
 * NAICS interfaces and functions
 */
export interface NAICSCode {
  code: string;
  description: string;
  total_recipients: number;
  total_spending: number;
  avg_spending_per_recipient: number;
  max_recipient_amount: number;
  earliest_data: string;
  latest_data: string;
}

export interface NAICSRecipient {
  naics_code: string;
  naics_description: string;
  recipient_name: string;
  recipient_uei: string;
  amount: number;
  rank: number;
  time_period_start: string;
  time_period_end: string;
}

/**
 * Get summary of all tracked NAICS codes
 */
export async function getNAICSSummary(): Promise<ApiResponse<NAICSCode[]>> {
  try {
    const url = `${API_BASE_URL}/api/naics/summary`;

    const response = await fetch(url);
    const json = await response.json();

    return {
      success: json.status === 'success',
      data: json.data || [],
      count: json.count
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch NAICS summary'
    };
  }
}

/**
 * Get recipients for a specific NAICS code
 */
export async function getNAICSRecipients(naicsCode: string, limit?: number): Promise<ApiResponse<NAICSRecipient[]>> {
  try {
    const query = new URLSearchParams();
    if (limit) query.set('limit', limit.toString());

    const url = `${API_BASE_URL}/api/naics/${naicsCode}/recipients${query.toString() ? `?${query}` : ''}`;

    const response = await fetch(url);
    const json = await response.json();

    return {
      success: json.status === 'success',
      data: json.data || [],
      count: json.count
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch NAICS recipients'
    };
  }
}
