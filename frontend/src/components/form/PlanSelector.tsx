import React from 'react';
import { Select } from '@/components/ui/Select';
import { PRICING } from '@/lib/pricing-data';

interface PlanSelectorProps {
  toolId: string;
  value: string;
  onChange: (value: string) => void;
}

export function PlanSelector({ toolId, value, onChange }: PlanSelectorProps) {
  const pricing = PRICING[toolId as keyof typeof PRICING];

  const options = pricing ? pricing.plans.map((plan) => ({
    label: plan.name.charAt(0).toUpperCase() + plan.name.slice(1),
    value: plan.name,
  })) : [];

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-zinc-600 dark:text-slate-300 mb-1">Plan</label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        placeholder="Select plan..."
        disabled={!toolId}
      />
    </div>
  );
}
