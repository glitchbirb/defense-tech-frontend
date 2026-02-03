/**
 * Formatting utilities for numbers, currency, and dates
 */

/**
 * Format large numbers with K, M, B suffixes
 * Examples: 5000 → "5K", 5000000 → "5M", 1300000000 → "1.3B"
 */
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * Format currency with $ and K/M/B suffixes
 * Examples: 5000 → "$5K", 5000000 → "$5M", 1300000000 → "$1.3B"
 */
export function formatCurrency(value: number): string {
  return `$${formatNumber(value)}`;
}

/**
 * Format currency with full precision
 * Examples: 5000 → "$5,000", 5000000 → "$5,000,000"
 */
export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format date as YYYY-MM-DD
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Format date as "Jan 15, 2024"
 */
export function formatDateLong(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

/**
 * Format percentage
 * Examples: 0.123 → "12.3%", 0.5 → "50%"
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Get color for spending amount (for visual indicators)
 */
export function getAmountColor(amount: number): string {
  if (amount >= 1_000_000_000) return 'text-green-500'; // > $1B
  if (amount >= 500_000_000) return 'text-green-400'; // $500M-$1B
  if (amount >= 100_000_000) return 'text-amber-400'; // $100M-$500M
  return 'text-gray-400'; // < $100M
}

/**
 * Get trend arrow and color
 */
export function getTrendIndicator(change: number): {
  arrow: string;
  color: string;
  label: string;
} {
  if (change > 0) {
    return {
      arrow: '↑',
      color: 'text-green-500',
      label: `+${formatPercentage(change)}`,
    };
  }
  if (change < 0) {
    return {
      arrow: '↓',
      color: 'text-red-500',
      label: formatPercentage(Math.abs(change)),
    };
  }
  return {
    arrow: '→',
    color: 'text-gray-500',
    label: '0%',
  };
}
