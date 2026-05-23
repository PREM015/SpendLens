import React from 'react';
import { Input } from '@/components/ui/Input';

interface SpendInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
}

export function SpendInput({ value, onChange }: SpendInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-slate-300 mb-1">Monthly Spend ($)</label>
      <Input
        type="number"
        min="0"
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : '')}
        placeholder="e.g. 500"
      />
    </div>
  );
}
