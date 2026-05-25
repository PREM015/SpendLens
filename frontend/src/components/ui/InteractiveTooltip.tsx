'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveTooltipProps {
  active?: boolean;
  payload?: Array<{name: string; value: number; color: string}>;
  label?: string;
  currencyPrefix?: string;
}

export function InteractiveTooltip({ active, payload, label, currencyPrefix = '$' }: InteractiveTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-4 shadow-2xl z-50 min-w-[220px]"
        style={{
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(139,92,246,0.1) inset'
        }}
      >
        <p className="text-zinc-500 text-xs font-bold mb-3 uppercase tracking-widest">{label}</p>
        
        <div className="space-y-3">
          {payload.map((entry, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full shadow-sm"
                    style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}` }}
                  />
                  <span className="text-sm font-medium text-zinc-300">{entry.name}</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white tracking-tight">
                  {currencyPrefix}{Number(entry.value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return null;
}
