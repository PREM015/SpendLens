'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Zap, Layers, BarChart3, TrendingDown, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const features = [
  {
    title: 'Real-time Vendor Pricing',
    description: 'We constantly monitor pricing changes across 8+ major AI platforms so you never pay for outdated tiers.',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Duplicate Tool Detection',
    description: 'Automatically flags overlapping capabilities (like Copilot and Cursor) to consolidate your software stack.',
    icon: Layers,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Actionable Downgrades',
    description: 'Stop guessing if you need Enterprise. We calculate your exact usage and recommend precise downgrade paths.',
    icon: TrendingDown,
    color: 'from-rose-500 to-pink-500',
  },
  {
    title: 'Zero Data Retention',
    description: 'We don\'t connect to your billing accounts or store any sensitive company data. 100% privacy-first.',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'AI-Powered Insights',
    description: 'Claude analyzes your specific team size and use case to generate a custom executive summary of your spend.',
    icon: Zap,
    color: 'from-violet-500 to-purple-500',
  },
  {
    title: 'Instant ROI Dashboards',
    description: 'Share beautiful, data-rich dashboards with your finance team to justify your AI budget instantly.',
    icon: BarChart3,
    color: 'from-blue-600 to-indigo-600',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="features" ref={ref} className="relative py-28 sm:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="dot-grid absolute inset-0 opacity-20" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
            The Complete AI Spend Audit
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            Everything you need to identify waste, consolidate seats, and optimize your team's AI budget.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 relative">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="h-full"
              >
                <SpotlightCard className="h-full p-8 transition-transform duration-300 hover:-translate-y-1">
                  <div className={`inline-flex p-3 rounded-2xl mb-6 bg-gradient-to-br ${feature.color} bg-opacity-10 dark:bg-opacity-20 shadow-lg`}>
                    <Icon className="h-6 w-6 text-zinc-900 dark:text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
