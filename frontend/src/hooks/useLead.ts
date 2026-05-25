import { useState } from 'react';

export function useLead() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (auditId: string, email: string, company?: string, role?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audit_id: auditId, email, company, role, consent_given: true }),
      });

      if (!res.ok) {
        throw new Error('Failed to capture lead');
      }

      return await res.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitLead, isLoading, error };
}
