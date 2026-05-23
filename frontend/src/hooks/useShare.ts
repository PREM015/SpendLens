import { useState, useEffect } from 'react';

export function useShare(token: string) {
  const [data, setData] = useState<any>(null);
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
      } catch (err: any) {
        setError(err.message);
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
