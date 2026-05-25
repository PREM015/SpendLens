'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAiSummary } from '@/hooks/useAiSummary';
import { AuditResponse } from '@/types';
import { Sparkles } from 'lucide-react';

export function AiSummaryBlock({ auditData }: { auditData: AuditResponse }) {
  const { fetchSummary, summary, isLoading, error } = useAiSummary();

  useEffect(() => {
    if (auditData) {
      fetchSummary(auditData);
    }
  }, [auditData]); // eslint-disable-line

  if (error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white dark:bg-black border border-violet-200 dark:border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.1)] rounded-3xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden h-full flex flex-col"
    >
      {/* Subtle glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-[60px]" />

      <div className="relative">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2.5">
          <div className="p-1.5 bg-violet-100 dark:bg-violet-500/20 rounded-lg">
            <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
          </div>
          AI Spend Analysis
        </h3>

        {isLoading ? (
          <div className="space-y-3">
            {[100, 85, 65].map((width, i) => (
              <div
                key={i}
                className="h-4 rounded-lg skeleton-shimmer"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base"
          >
            {summary || 'Analyzing your spend...'}
          </motion.p>
        )}

        {/* Attribution */}
        <div className="mt-auto pt-5 border-t border-zinc-200 dark:border-zinc-800/50">
          <p className="text-xs text-violet-500 dark:text-violet-400/60 flex items-center gap-1.5">
            <Sparkles size={10} />
            Powered by Claude
          </p>
        </div>
      </div>
    </motion.div>
  );
}
