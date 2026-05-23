import { useState } from 'react';
import { useAuditStore } from '@/stores/auditStore';
import { AuditRequest, AuditResponse } from '@/types';

export function useAudit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setResult } = useAuditStore();

  const submitAudit = async (data: AuditRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch audit results');
      }

      const json = await res.json();
      const result: AuditResponse = json.data?.result || json;
      setResult(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitAudit, isLoading, error };
}
