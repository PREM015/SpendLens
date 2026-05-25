import React from 'react';
import { Select } from '@/components/ui/Select';
import { USE_CASES } from '@/utils/constants';

interface UseCaseSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function UseCaseSelector({ value, onChange }: UseCaseSelectorProps) {
  const options = Object.values(USE_CASES).map((useCase) => ({
    label: useCase.charAt(0).toUpperCase() + useCase.slice(1),
    value: useCase,
  }));

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-zinc-600 dark:text-slate-300 mb-1">Primary Use Case</label>
      <Select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        options={options}
        placeholder="Select use case..."
      />
    </div>
  );
}
