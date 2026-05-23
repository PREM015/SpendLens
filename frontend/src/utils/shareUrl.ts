/**
 * Build a canonical share URL for a given audit ID.
 * Uses the current window location origin in browser, falls back to env var.
 */
export function buildShareUrl(auditId: string): string {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL ?? 'https://spendlens.credex.co';

  return `${base}/share/${auditId}`;
}

/**
 * Build share text for social/clipboard sharing.
 */
export function buildShareText(monthlySavings: number): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(monthlySavings);

  return `Our team could save ${formatted}/mo on AI tools! Free audit by SpendLens → `;
}
