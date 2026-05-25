'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SavingsHero } from './SavingsHero';
import { ToolAuditCard } from './ToolAuditCard';
import { AiSummaryBlock } from './AiSummaryBlock';
import { CredexCTABlock } from './CredexCTABlock';
import { ShareBlock } from './ShareBlock';
import { MetricsGrid } from './MetricsGrid';
import { SpendDistributionChart } from './SpendDistributionChart';
import { SavingsComparisonChart } from './SavingsComparisonChart';
import { ExportButton } from './ExportButton';
import { ProjectionChart } from './ProjectionChart';
import { useAuditStore } from '@/stores/auditStore';
import { useSavingsCalculation } from '@/hooks/useSavingsCalculation';
import { BarChart3, ChevronDown } from 'lucide-react';
import { Meteors } from '../ui/meteors';
import { useLanguage } from '@/contexts/LanguageProvider';

export function AuditResultsPage() {
  const { result: auditResult } = useAuditStore();
  const savings = useSavingsCalculation(auditResult?.tools);
  const { t } = useLanguage();

  if (!auditResult) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-200 dark:bg-slate-800/50 border border-zinc-300 dark:border-slate-700/50 mb-4">
            <BarChart3 size={28} className="text-zinc-500 dark:text-slate-500" />
          </div>
          <p className="text-zinc-500 dark:text-slate-400 text-lg">No audit results available.</p>
          <p className="text-zinc-600 dark:text-slate-500 text-sm mt-1">Please run an audit first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-6">
      <Meteors number={20} className="hidden md:block" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
          {t('dashboard.title')}
        </h2>
        <div className="self-end sm:self-auto">
          <ExportButton auditData={auditResult} />
        </div>
      </div>

      <div id="audit-dashboard-content" className="relative z-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="md:col-span-2 h-full flex flex-col">
            <SavingsHero monthlySavings={savings.totalMonthly} annualSavings={savings.totalAnnual} />
          </div>
          <div className="md:col-span-1 h-full flex flex-col">
            <AiSummaryBlock auditData={auditResult} />
          </div>

          {/* Metrics Grid */}
          <div className="md:col-span-3">
            <MetricsGrid 
              currentSpend={savings.totalCurrentSpend}
              optimizedSpend={savings.totalOptimizedSpend}
              totalSeats={savings.totalSeats}
              monthlySavings={savings.totalMonthly}
            />
          </div>

          {/* Charts Grid */}
          <div className="md:col-span-3">
            <ProjectionChart data={savings.trajectoryData} />
          </div>
          
          <div className="md:col-span-1">
            <SpendDistributionChart data={savings.chartData} />
          </div>
          <div className="md:col-span-2">
            <SavingsComparisonChart data={savings.chartData} />
          </div>
        </div>
      </div>

      {/* ── Tool Breakdown ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="pt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            Detailed Tool Breakdown
            <ChevronDown size={20} className="text-zinc-500 mt-1" />
          </h2>
          <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {auditResult.tools.length} tool{auditResult.tools.length !== 1 ? 's' : ''} analyzed
            </span>
          </div>
        </div>
        
        {/* Responsive grid for tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
