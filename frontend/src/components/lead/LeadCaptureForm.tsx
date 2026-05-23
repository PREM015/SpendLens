import React, { useState } from 'react';
import { useLead } from '@/hooks/useLead';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface LeadCaptureFormProps {
  auditId: string;
  onSuccess: () => void;
}

export function LeadCaptureForm({ auditId, onSuccess }: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const { submitLead, isLoading, error } = useLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const result = await submitLead(auditId, email, company, role);
    if (result) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input 
          type="email" 
          placeholder="Work Email *" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Input 
          type="text" 
          placeholder="Company Name (Optional)" 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>
      <div>
        <Input 
          type="text" 
          placeholder="Your Role (Optional)" 
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button 
        type="submit" 
        variant="primary" 
        className="w-full bg-violet-600 hover:bg-violet-700 text-white"
        disabled={isLoading || !email}
      >
        {isLoading ? 'Sending...' : 'Send my report'}
      </Button>

      <p className="text-xs text-zinc-500 text-center mt-4">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
}
