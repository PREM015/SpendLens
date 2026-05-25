'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency';

interface ChartData {
  name: string;
  currentSpend: number;
  optimizedSpend: number;
}

interface SavingsComparisonChartProps {
  data: ChartData[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-black/90 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[200px]">
        <p className="text-sm font-bold text-zinc-900 dark:text-white capitalize mb-3 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-zinc-600 dark:text-zinc-400 capitalize flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name === 'currentSpend' ? 'Current Spend' : 'Optimized Spend'}
              </span>
              <span className="font-bold text-zinc-900 dark:text-white tabular-nums pl-4">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
        {/* Calculate difference */}
        {payload.length === 2 && payload[0].value > payload[1].value && (
          <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex justify-between items-center text-sm">
            <span className="text-emerald-600 dark:text-emerald-500/70 uppercase text-xs font-bold tracking-wider">Savings</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">
              {formatCurrency(payload[0].value - payload[1].value)}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function SavingsComparisonChart({ data }: SavingsComparisonChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 relative z-10 gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Cost Optimization Analysis</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-md bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-md bg-emerald-500" />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Optimized</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barSize={32}
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-[#27272a]" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
              dy={10}
              tickFormatter={(val) => val.split(' ')[0]} // Shorten names for mobile
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
            
            {/* The Bars */}
            <Bar 
              dataKey="currentSpend" 
              name="Current Spend" 
              fill="#d4d4d8" 
              radius={[4, 4, 0, 0]}
              animationBegin={400}
              animationDuration={1000}
            />
            <Bar 
              dataKey="optimizedSpend" 
              name="Optimized Spend" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              animationBegin={800}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
