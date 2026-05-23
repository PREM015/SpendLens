import React from 'react';
import { Input } from '@/components/ui/Input';

interface SeatsInputProps {
  value: number | '';
  onChange: (value: number | '') => void;
}

export function SeatsInput({ value, onChange }: SeatsInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-slate-300 mb-1">Seats/Users</label>
      <Input
        type="number"
        min="1"
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
        placeholder="e.g. 10"
      />
    </div>
  );
}
