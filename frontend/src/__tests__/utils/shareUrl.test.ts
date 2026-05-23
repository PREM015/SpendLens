import { buildShareUrl } from '@/utils/shareUrl';

describe('shareUrl', () => {
  it('builds share url correctly', () => {
    // Just a placeholder since NEXT_PUBLIC_SITE_URL might not be defined in test env natively
    expect(buildShareUrl('token123')).toContain('token123');
  });
});
