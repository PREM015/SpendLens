import React from 'react';
import { Select } from '@/components/ui/Select';
import { TOOL_NAMES } from '@/utils/constants';

interface ToolSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ToolSelector({ value, onChange }: ToolSelectorProps) {
  const options = Object.values(TOOL_NAMES).map((tool) => ({
    label: tool.charAt(0).toUpperCase() + tool.slice(1).replace('_', ' '),
    value: tool,
  }));

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-slate-300 mb-1">Tool</label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={options}
        placeholder="Select tool..."
      />
    </div>
  );
}
