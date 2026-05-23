'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormStore } from '@/stores/formStore';
import { ToolRow } from './ToolRow';
import { Button } from '@/components/ui/Button';
import { Plus, Zap, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';

export function SpendInputForm({ onSubmit, isLoading }: { onSubmit: () => void; isLoading?: boolean }) {
  const { toolRows, addToolRow } = useFormStore();

  const runningTotal = useMemo(() => {
    return toolRows.reduce((sum, row) => {
      const spend = typeof row.monthlySpend === 'number' ? row.monthlySpend : 0;
      return sum + spend;
    }, 0);
  }, [toolRows]);

  const filledRows = toolRows.filter((r) => r.toolName && r.planName).length;
  const hasValidTools = filledRows > 0;

  return (
    <div className="space-y-6">
      {/* Running total pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl rounded-full px-4 py-2">
            <DollarSign size={14} className="text-violet-400" />
            <span className="text-sm text-slate-400">Monthly total:</span>
            <span className="text-sm font-semibold text-white tabular-nums">
              {formatCurrency(runningTotal, { decimals: 0 })}
            </span>
            <span className="text-xs text-slate-500">/mo</span>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          {filledRows} of {toolRows.length} tool{toolRows.length !== 1 ? 's' : ''} configured
        </div>
      </motion.div>

      {/* Tool rows with animations */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {toolRows.map((tool, index) => (
            <ToolRow key={tool.id} toolIndex={index} data={tool} />
          ))}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <motion.div
        layout
        className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800/50"
      >
        <Button
          variant="secondary"
          onClick={addToolRow}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add another tool
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={onSubmit}
          loading={isLoading}
          disabled={!hasValidTools || isLoading}
          className="min-w-[200px]"
        >
          <Zap size={18} className="mr-1 text-violet-500" />
          {isLoading ? 'Analyzing...' : 'Run Audit'}
        </Button>
      </motion.div>
    </div>
  );
}
