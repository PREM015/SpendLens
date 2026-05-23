'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SavingsHero } from './SavingsHero';
import { ToolAuditCard } from './ToolAuditCard';
import { AiSummaryBlock } from './AiSummaryBlock';
import { CredexCTABlock } from './CredexCTABlock';
import { ShareBlock } from './ShareBlock';
import { useAuditStore } from '@/stores/auditStore';
import { useSavingsCalculation } from '@/hooks/useSavingsCalculation';
import { BarChart3 } from 'lucide-react';

export function AuditResultsPage() {
  const { result: auditResult } = useAuditStore();
  const savings = useSavingsCalculation(auditResult?.tools);

  if (!auditResult) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700/50 mb-4">
            <BarChart3 size={28} className="text-slate-500" />
          </div>
          <p className="text-slate-400 text-lg">No audit results available.</p>
          <p className="text-slate-500 text-sm mt-1">Please run an audit first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-8">
      {/* Hero section */}
      <SavingsHero
        monthlySavings={savings.totalMonthly}
        annualSavings={savings.totalAnnual}
      />

      {/* AI Summary */}
      <AiSummaryBlock auditData={auditResult} />

      {/* Tool breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Tool Breakdown</h2>
          <span className="text-sm text-slate-500">
            {auditResult.tools.length} tool{auditResult.tools.length !== 1 ? 's' : ''} analyzed
          </span>
        </div>
        <div className="space-y-3">
          {auditResult.tools.map((tool, index) => (
            <ToolAuditCard key={index} tool={tool} index={index} />
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      {savings.totalMonthly > 500 && (
        <CredexCTABlock savings={savings.totalMonthly} />
      )}

      {/* Share */}
      {auditResult.share_token && (
        <ShareBlock token={auditResult.share_token} />
      )}
    </div>
  );
}
