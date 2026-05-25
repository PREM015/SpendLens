'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SpendInputForm } from '@/components/form/SpendInputForm';
import { useAudit } from '@/hooks/useAudit';
import { useFormStore } from '@/stores/formStore';
import { LeadCaptureModal } from '@/components/lead/LeadCaptureModal';
import { Layers, ChevronRight, Loader2 } from 'lucide-react';

export default function AuditPage() {
  const router = useRouter();
  const { toolRows, useCase } = useFormStore();
  const { submitAudit, isLoading } = useAudit();
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [auditId, setAuditId] = useState('');

  const handleSubmit = async () => {
    if (toolRows.length === 0) return;

    const requestTools = toolRows.map((t) => ({
      tool: t.toolName,
      current_plan: t.planName,
      current_spend: typeof t.monthlySpend === 'number' ? t.monthlySpend : 0,
      seats: typeof t.seats === 'number' ? t.seats : 1,
      use_case: useCase || 'mixed',
    }));

    const result = await submitAudit({ 
      tools: requestTools,
      teamSize: 1, // Store doesn't have team size yet, defaulting to 1
      primaryUseCase: useCase || 'mixed'
    });

    if (result) {
      setAuditId(result.id);
      setShowLeadModal(true);
    }
  };

  const handleLeadSuccess = () => {
    setShowLeadModal(false);
    router.push('/results');
  };

  const handleLeadSkip = () => {
    setShowLeadModal(false);
    router.push('/results');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-slate-500/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30">
                <span className="text-xs font-bold text-violet-400">1</span>
              </div>
              <span className="text-violet-400 font-medium">Enter Your Stack</span>
              <ChevronRight size={14} className="text-slate-600" />
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700/50 border border-slate-600/50">
                <span className="text-xs font-medium text-slate-500">2</span>
              </div>
              <span className="text-slate-500">View Results</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <Layers size={20} className="text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Enter Your AI Stack
              </h1>
              <p className="text-sm text-zinc-600 dark:text-slate-400 mt-0.5">
                Add the tools your team uses and we&apos;ll find savings opportunities
              </p>
            </div>
          </div>
        </motion.div>

        {/* Glassmorphism form container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white dark:bg-slate-900/50 border border-zinc-200 dark:border-slate-700/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20"
        >
          <SpendInputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </motion.div>
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-white dark:bg-black/80 dark:bg-slate-950/80 backdrop-blur-md" />

            {/* Loading card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white dark:bg-slate-900/90 border border-zinc-200 dark:border-slate-700/50 backdrop-blur-xl rounded-2xl p-10 text-center shadow-2xl"
            >
              {/* Glow behind spinner */}
              <div className="absolute inset-0 rounded-2xl bg-violet-500/5 blur-xl" />

              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 text-violet-400 animate-spin" />
                    <div className="absolute inset-0 h-12 w-12 rounded-full bg-violet-400/20 blur-lg animate-pulse" />
                  </div>
                </div>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-lg font-medium text-zinc-900 dark:text-white"
                >
                  Analyzing your spend...
                </motion.p>
                <p className="text-sm text-zinc-600 dark:text-slate-400 mt-2">
                  Our AI is finding the best optimization opportunities
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={handleLeadSkip}
        auditId={auditId}
        onSuccess={handleLeadSuccess}
      />
    </div>
  );
}
