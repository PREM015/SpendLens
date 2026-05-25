'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/formatCurrency';
import { Wallet, PiggyBank, Users, TrendingUp } from 'lucide-react';

interface MetricsGridProps {
  currentSpend: number;
  optimizedSpend: number;
  totalSeats: number;
  monthlySavings: number;
}

export function MetricsGrid({
  currentSpend,
  optimizedSpend,
  totalSeats,
  monthlySavings,
}: MetricsGridProps) {
  const savingsPercent = currentSpend > 0 ? (monthlySavings / currentSpend) * 100 : 0;

  const metrics = [
    {
      title: 'Total Current Spend',
      value: formatCurrency(currentSpend, { decimals: 0 }),
      subValue: 'per month',
      icon: Wallet,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      delay: 0.1,
    },
    {
      title: 'Total Optimized Spend',
      value: formatCurrency(optimizedSpend, { decimals: 0 }),
      subValue: 'per month',
      icon: PiggyBank,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      delay: 0.2,
    },
    {
      title: 'Total Seats Analyzed',
      value: totalSeats.toString(),
      subValue: 'across all tools',
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      delay: 0.3,
    },
    {
      title: 'Potential Savings',
      value: `${savingsPercent.toFixed(1)}%`,
      subValue: 'of current budget',
      icon: TrendingUp,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: m.delay, duration: 0.4, ease: 'easeOut' }}
            className={`relative overflow-hidden rounded-2xl bg-white dark:bg-black border ${m.border} p-5 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-300 shadow-sm`}
          >
            {/* Subtle background glow */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] ${m.bg} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${m.bg} ${m.border} border`}>
                  <Icon size={18} className={m.color} />
                </div>
                <h3 className="text-sm font-medium text-zinc-400">{m.title}</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  {m.value}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">{m.subValue}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
