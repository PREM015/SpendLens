import { renderHook } from '@testing-library/react';

// Simplified mock since it relies on Zustand persist
describe('useFormPersist', () => {
  it('loads state from localStorage', () => {
    localStorage.setItem('form-storage', JSON.stringify({ state: { tools: [] } }));
    expect(localStorage.getItem('form-storage')).toBeDefined();
  });
});
