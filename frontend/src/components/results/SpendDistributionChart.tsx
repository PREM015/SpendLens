'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency';

interface ChartData {
  name: string;
  currentSpend: number;
}

interface SpendDistributionChartProps {
  data: ChartData[];
}

const COLORS = ['#8b5cf6', '#10b981', '#3b82f6', '#f43f5e', '#f59e0b', '#06b6d4', '#d946ef', '#14b8a6'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white/90 dark:bg-black/90 border border-zinc-200 dark:border-zinc-800 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-sm font-semibold text-zinc-900 dark:text-white capitalize mb-1">{data.name}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Spend: <span className="text-violet-600 dark:text-violet-400 font-bold tabular-nums">{formatCurrency(data.value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function SpendDistributionChart({ data }: SpendDistributionChartProps) {
  // Filter out $0 spend if any, and sort by highest spend
  const chartData = data
    .filter(d => d.currentSpend > 0)
    .sort((a, b) => b.currentSpend - a.currentSpend);

  if (chartData.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800/80 rounded-3xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px]" />
      
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 relative z-10">Spend Distribution</h3>
      
      <div className="h-[280px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="currentSpend"
              stroke="none"
              animationBegin={600}
              animationDuration={1200}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-200 focus:outline-none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-zinc-600 dark:text-zinc-400 text-xs capitalize ml-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
