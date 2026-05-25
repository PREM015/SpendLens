'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useCurrency } from '@/contexts/CurrencyProvider';
import { InteractiveTooltip } from '@/components/ui/InteractiveTooltip';

interface ProjectionData {
  month: string;
  currentSpend: number;
  optimizedSpend: number;
}

export function ProjectionChart({ data }: { data: ProjectionData[] }) {
  const { formatCompactInCurrency, currency } = useCurrency();
  const prefix = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800/50 rounded-3xl p-6 md:p-8 w-full mt-6 sm:mt-8 md:mt-10"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">12-Month Spend Projection</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Cumulative current trajectory vs optimized trajectory</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-zinc-600 dark:text-zinc-300">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-zinc-600 dark:text-zinc-300">Optimized</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-[#27272a]" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#a1a1aa" 
              className="dark:stroke-[#71717a]"
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#a1a1aa" 
              className="dark:stroke-[#71717a]"
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => formatCompactInCurrency(value)} 
            />
            <Tooltip content={<InteractiveTooltip currencyPrefix={prefix} />} cursor={{ stroke: '#e4e4e7', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area 
              type="monotone" 
              dataKey="currentSpend" 
              name="Current Trajectory"
              stroke="#f43f5e" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCurrent)" 
            />
            <Area 
              type="monotone" 
              dataKey="optimizedSpend" 
              name="Optimized Trajectory"
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorOptimized)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
