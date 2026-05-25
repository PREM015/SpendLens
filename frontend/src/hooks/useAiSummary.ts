import { useState } from 'react';
import { AuditResponse } from '@/types';

export function useAiSummary() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (auditData: AuditResponse) => {
    setIsLoading(true);
    setError(null);

    // Bypass API if a mock/pre-generated summary is provided
    if (auditData.ai_summary) {
      setSummary(auditData.ai_summary);
      setIsLoading(false);
      return auditData.ai_summary;
    }

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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error fetching summary';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchSummary, summary, isLoading, error };
}
