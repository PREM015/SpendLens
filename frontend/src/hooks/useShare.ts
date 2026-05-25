import { useState, useEffect } from 'react';
import { AuditResponse } from '@/types';

export function useShare(token: string) {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShare() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/share/${token}`);
        if (!res.ok) {
          throw new Error('Share not found');
        }
        const result = await res.json();
        setData(result.data?.audit || result.audit || result);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (token) {
      fetchShare();
    }
  }, [token]);

  return { data, isLoading, error };
}
