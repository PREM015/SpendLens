'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ToolAuditResult } from '@/types';
import { RecommendationBadge } from './RecommendationBadge';
import { formatCurrency } from '@/utils/formatCurrency';
import { ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';
import { MovingBorder } from '../ui/moving-border';

function getBorderColor(tool: ToolAuditResult): string {
  if (tool.monthly_savings > 0) return 'border-emerald-500/50';
  if (tool.recommended_action === 'keep') return 'border-zinc-200 dark:border-zinc-800';
  return 'border-violet-500/50';
}

function getGlowColor(tool: ToolAuditResult): string {
  if (tool.monthly_savings > 0) return 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]';
  if (tool.recommended_action === 'keep') return 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.05)]';
  return 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]';
}

function getAccentColor(tool: ToolAuditResult): string {
  if (tool.monthly_savings > 0) return 'text-emerald-500 dark:text-emerald-400';
  if (tool.recommended_action === 'keep') return 'text-zinc-500';
  return 'text-violet-500 dark:text-violet-400';
}

export function ToolAuditCard({ tool, index }: { tool: ToolAuditResult; index?: number }) {
  const isHighSavings = tool.monthly_savings > 100;
  
  const content = (
    <div className={`group relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm ${getGlowColor(tool)}`}>
      {/* Subtle indicator line on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getBorderColor(tool).replace('border-', 'bg-').replace('/50', '')}`} />

      {/* Header section */}
      <div className="p-6 pl-8 pb-5">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white capitalize flex flex-wrap items-center gap-3">
              {tool.tool.replace(/_/g, ' ')}
              <RecommendationBadge action={tool.recommended_action} />
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 flex items-center gap-2 font-medium">
              <span>{tool.seats} {tool.seats === 1 ? 'seat' : 'seats'}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
              <span className="capitalize">{tool.current_plan} plan</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
              <span className="text-zinc-600 dark:text-zinc-300">{formatCurrency(tool.current_spend)}/mo</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-0 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-zinc-800/50 sm:border-0 flex-shrink-0 ml-4">
            {tool.monthly_savings > 0 ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (index ?? 0) * 0.1 + 0.2 }}
                className="text-right"
              >
                <div className="flex items-center gap-1.5 justify-end mb-1">
                  <TrendingDown size={16} className="text-emerald-500 dark:text-emerald-400" />
                  <span className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 tabular-nums drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    {formatCurrency(tool.monthly_savings, { decimals: 0, showSign: true })}
                  </span>
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-500/70">monthly savings</div>
              </motion.div>
            ) : (
              <div className="flex items-center gap-1.5 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-full px-3 py-1.5">
                <CheckCircle2 size={14} className="text-violet-600 dark:text-violet-400" />
                <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest">Optimal</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reason section */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800/50 px-6 pl-8 py-5">
        <div className="flex items-start gap-3">
          <ArrowRight size={18} className={`mt-0.5 flex-shrink-0 ${getAccentColor(tool)}`} />
          <div className="min-w-0">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">{tool.reason}</p>
            {(tool.recommended_tool || tool.recommended_plan) && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white dark:bg-black px-3 py-1.5 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Action: Switch to</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white capitalize">
                  {tool.recommended_tool || tool.tool} {tool.recommended_plan}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index ?? 0) * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className="h-full"
    >
      {isHighSavings ? (
        <MovingBorder className="h-full border-0">
          {content}
        </MovingBorder>
      ) : (
        content
      )}
    </motion.div>
  );
}
