'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormStore } from '@/stores/formStore';
import type { ToolRow as ToolRowType } from '@/types';
import { ToolSelector } from './ToolSelector';
import { PlanSelector } from './PlanSelector';
import { SpendInput } from './SpendInput';
import { SeatsInput } from './SeatsInput';
import { Trash2 } from 'lucide-react';

export function ToolRow({ toolIndex, data }: { toolIndex: number; data: ToolRowType }) {
  const { updateToolRow, removeToolRow } = useFormStore();

  const handleUpdate = (field: keyof ToolRowType, value: string | number | boolean | null) => {
    updateToolRow(data.id, { [field]: value });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(4px)' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="group relative bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl rounded-xl p-5 transition-all duration-300 hover:border-slate-600/70 hover:bg-slate-800/70"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />

      {/* Row number badge */}
      <div className="absolute -top-2.5 left-4 bg-slate-700 text-slate-400 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-slate-600/50">
        Tool {toolIndex + 1}
      </div>

      <div className="flex flex-col md:flex-row md:items-end gap-4 pt-2">
        <div className="flex-1 md:min-w-[180px]">
          <ToolSelector value={data.toolName} onChange={(v) => handleUpdate('toolName', v)} />
        </div>
        <div className="flex-1 md:min-w-[160px]">
          <PlanSelector toolId={data.toolName} value={data.planName} onChange={(v) => handleUpdate('planName', v)} />
        </div>
        <div className="flex gap-4 w-full md:w-auto items-end">
          <div className="flex-1 md:w-[130px]">
            <SpendInput value={data.monthlySpend} onChange={(v) => handleUpdate('monthlySpend', v)} />
          </div>
          <div className="flex-1 md:w-[100px]">
            <SeatsInput value={data.seats} onChange={(v) => handleUpdate('seats', v)} />
          </div>
          <div className="pb-1 ml-auto md:ml-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeToolRow(data.id)}
              className="p-2.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200 cursor-pointer group/btn"
              title="Remove Tool"
            >
              <Trash2 size={18} className="transition-transform duration-200 group-hover/btn:rotate-[-8deg]" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
