'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { ArrowRight, Zap } from 'lucide-react';

export function CredexCTABlock({ savings }: { savings: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl mt-8"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900" />

      {/* Animated shimmer border effect */}
      <div className="absolute inset-0 rounded-2xl">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative p-8 sm:p-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', damping: 15 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-5"
        >
          <Zap size={24} className="text-white" />
        </motion.div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Claim your{' '}
          <span className="text-violet-200 tabular-nums">
            {formatCurrency(savings, { decimals: 0 })}
          </span>
          /mo savings
        </h3>

        <p className="text-violet-200/70 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Credex can automatically negotiate and procure these tools for you at the optimal pricing tier, saving you time and money.
        </p>

        <Button
          size="lg"
          className="bg-white text-violet-900 hover:bg-violet-50 border-none font-bold px-10 py-4 rounded-full shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 text-base"
          onClick={() => window.open('https://credex.co', '_blank')}
        >
          Get Started with Credex
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
