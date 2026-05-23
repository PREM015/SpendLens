import { isValidEmail } from '@/utils/validators';

describe('validators', () => {
  it('validates emails correctly', () => {
    expect(isValidEmail('test@test.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
  });
});
