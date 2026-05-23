/**
 * Format a number as USD currency string.
 * @example formatCurrency(1234.5) → "$1,234.50"
 * @example formatCurrency(1234.5, { decimals: 0 }) → "$1,235"
 * @example formatCurrency(1234.5, { suffix: '/mo' }) → "$1,234.50/mo"
 */
export function formatCurrency(
  amount: number,
  options?: {
    decimals?: number;
    suffix?: string;
    showSign?: boolean;
  }
): string {
  const { decimals = 2, suffix = '', showSign = false } = options ?? {};

  const sign = showSign && amount > 0 ? '+' : '';
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.abs(amount));

  const prefix = amount < 0 ? '-' : sign;
  return `${prefix}${formatted}${suffix}`;
}

/**
 * Format a number as a compact currency string.
 * @example formatCompactCurrency(15000) → "$15K"
 * @example formatCompactCurrency(1500000) → "$1.5M"
 */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return formatCurrency(amount, { decimals: 0 });
}
