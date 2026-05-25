'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NumberTicker } from '@/components/ui/NumberTicker';
import { useCurrency } from '@/contexts/CurrencyProvider';
import { Calculator } from 'lucide-react';

export function ROICalculatorSlider() {
  const [teamSize, setTeamSize] = useState(25);
  const { convertAmount, currency } = useCurrency();

  // Average savings per engineer per month is roughly $50-100 based on typical stacks
  const avgMonthlySavingsPerSeat = 85; 
  const projectedMonthly = teamSize * avgMonthlySavingsPerSeat;
  const projectedAnnual = projectedMonthly * 12;

  const prefix = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Animated Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-xl">
              <Calculator size={24} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">Interactive ROI Calculator</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">See how much your team could save before starting</p>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Engineering Team Size</label>
              <span className="text-3xl font-black text-violet-600 dark:text-violet-400 tabular-nums">{teamSize}</span>
            </div>
            
            <input 
              type="range" 
              min="1" 
              max="200" 
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-600 dark:accent-violet-500 focus:outline-none"
            />
            <div className="flex justify-between mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span>1</span>
              <span>200+</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800/50">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Projected Monthly Savings</p>
              <div className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tight">
                <NumberTicker value={convertAmount(projectedMonthly)} prefix={prefix} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-500/10 dark:to-indigo-500/10 rounded-2xl p-6 border border-violet-100 dark:border-violet-500/20">
              <p className="text-sm font-medium text-violet-600 dark:text-violet-400 mb-2">Projected Annual Savings</p>
              <div className="text-3xl sm:text-4xl font-black text-violet-700 dark:text-violet-300 tabular-nums tracking-tight drop-shadow-sm">
                <NumberTicker value={convertAmount(projectedAnnual)} prefix={prefix} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
