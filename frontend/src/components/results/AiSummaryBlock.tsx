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
      className="bg-black border border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.1)] rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-[60px]" />

      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2.5">
          <div className="p-1.5 bg-violet-500/20 rounded-lg">
            <Sparkles size={16} className="text-violet-400" />
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
            className="text-zinc-300 leading-relaxed text-sm md:text-base"
          >
            {summary || 'Analyzing your spend...'}
          </motion.p>
        )}

        {/* Attribution */}
        <div className="mt-5 pt-4 border-t border-zinc-800/50">
          <p className="text-xs text-violet-400/60 flex items-center gap-1.5">
            <Sparkles size={10} />
            Powered by Claude
          </p>
        </div>
      </div>
    </motion.div>
  );
}
