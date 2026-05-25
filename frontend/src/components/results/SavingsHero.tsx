'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/formatCurrency';
import { TrendingDown, CheckCircle2, Sparkles } from 'lucide-react';

interface SavingsHeroProps {
  monthlySavings: number;
  annualSavings: number;
}

function useCountUp(target: number, duration: number = 1500) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || target <= 0) return;
    startedRef.current = true;

    const startTime = performance.now();
    let rafId: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);

  return value;
}

export function SavingsHero({ monthlySavings, annualSavings }: SavingsHeroProps) {
  const isSaving = monthlySavings > 0;
  const animatedAnnual = useCountUp(annualSavings);
  const animatedMonthly = useCountUp(monthlySavings);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-black p-8 sm:p-12 shadow-2xl"
    >
      {isSaving ? (
        <>
          {/* Animated emerald gradient glow background */}
          <div className="absolute inset-0 bg-white dark:bg-black" />
          <div className="dot-grid absolute inset-0 opacity-20" />
          
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
              scale: [1.1, 1, 1.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-teal-400/10 rounded-full blur-[100px]"
          />

          <div className="relative text-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
            >
              <TrendingDown size={14} className="text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Savings Identified</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-medium text-zinc-400 mb-2">
              You could save
            </h1>

            <div className="mb-6 relative">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', damping: 15 }}
                className="inline-block text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-zinc-900 dark:text-white tabular-nums drop-shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              >
                {formatCurrency(animatedAnnual, { decimals: 0 })}
              </motion.span>
              <span className="text-xl sm:text-2xl font-medium text-emerald-600 dark:text-emerald-500/60 ml-2">/yr</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
            >
              <span className="text-zinc-600 dark:text-zinc-400">That&apos;s</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums text-xl">
                {formatCurrency(animatedMonthly, { decimals: 0 })}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">per month in immediate savings</span>
            </motion.div>
          </div>
        </>
      ) : (
        <>
          {/* Optimal state - blue/violet tinted */}
          <div className="absolute inset-0 bg-white dark:bg-black" />
          <div className="dot-grid absolute inset-0 opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-[120px]" />

          <div className="relative text-center z-10 py-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
            >
              <CheckCircle2 size={40} className="text-violet-400" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
              Your AI spend is optimal
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 flex items-center justify-center gap-2 max-w-lg mx-auto">
              <Sparkles size={18} className="text-violet-500 dark:text-violet-400" />
              Great job — you&apos;re already on the best plans for your usage.
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}
