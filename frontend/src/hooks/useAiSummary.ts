import { useState } from 'react';

export function useAiSummary() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (auditData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditId: auditData.id,
          teamSize: auditData.teamSize || 1,
          useCase: auditData.useCase || 'mixed'
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate summary');
      }

      const result = await res.json();
      const summaryText = result.data?.summary || result.summary;
      setSummary(summaryText);
      return summaryText;
    } catch (err: any) {
      setError(err.message || 'Error fetching summary');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchSummary, summary, isLoading, error };
}
