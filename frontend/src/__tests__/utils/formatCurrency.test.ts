import { formatCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats numbers correctly', () => {
    expect(formatCurrency(1200)).toBe('$1,200');
    expect(formatCurrency(0)).toBe('$0');
  });
});
