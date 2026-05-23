import { renderHook, act } from '@testing-library/react';
import { useAudit } from '@/hooks/useAudit';

jest.mock('@/stores/auditStore', () => ({
  useAuditStore: () => ({ setAuditResult: jest.fn() })
}));

describe('useAudit', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useAudit());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should submit audit and return result', async () => {
    const { result } = renderHook(() => useAudit());
    await act(async () => {
      const res = await result.current.submitAudit({ tools: [] });
      expect(res).toBeDefined();
      expect(res.id).toBe('test_audit_1');
    });
  });
});
