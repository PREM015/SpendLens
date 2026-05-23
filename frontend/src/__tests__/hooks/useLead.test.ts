import { renderHook, act } from '@testing-library/react';
import { useLead } from '@/hooks/useLead';

describe('useLead', () => {
  it('submits lead successfully', async () => {
    const { result } = renderHook(() => useLead());
    await act(async () => {
      const res = await result.current.submitLead('audit_1', 'test@test.com', 'Acme', 'CEO');
      expect(res).toBeDefined();
      expect(res.status).toBe('success');
    });
  });
});
