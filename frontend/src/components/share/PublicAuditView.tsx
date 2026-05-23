import React from 'react';
import { useShare } from '@/hooks/useShare';
import { SavingsHero } from '@/components/results/SavingsHero';
import { ToolAuditCard } from '@/components/results/ToolAuditCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

export function PublicAuditView({ token }: { token: string }) {
  const { data, isLoading, error } = useShare(token);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-8">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Audit Not Found</h2>
        <p className="text-gray-600 mb-8">This audit link may have expired or is invalid.</p>
        <Button onClick={() => window.location.href = '/'}>Start a New Audit</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Spend Audit Results</h1>
        <p className="text-gray-600 mt-2">Anonymous sharing link</p>
      </div>

      <SavingsHero 
        monthlySavings={data.monthly_savings} 
        annualSavings={data.annual_savings} 
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Tool Breakdown</h2>
        {data.tools.map((tool: any, index: number) => (
          <ToolAuditCard key={index} tool={tool} />
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-8 text-center mt-12">
        <h3 className="text-xl font-bold text-blue-900 mb-3">Want to audit your own stack?</h3>
        <p className="text-blue-800 mb-6">Takes 2 minutes. See exactly where you're overpaying for AI tools.</p>
        <Button onClick={() => window.location.href = '/'}>Start Free Audit</Button>
      </div>
    </div>
  );
}
