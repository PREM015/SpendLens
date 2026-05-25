'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/BackgroundBeams';
import Link from 'next/link';

export function FinalCTASection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-32 sm:py-48 overflow-hidden">
      {/* Intense Background Beams Effect */}
      <div className="absolute inset-0 -z-10 bg-white dark:bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,rgba(0,0,0,0)_70%)]" />
        
        {/* Enhanced abstract shapes */}
        <BackgroundBeams />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
          <motion.div 
            animate={{ y: [0, 1000] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 h-[200%] w-full bg-gradient-to-b from-transparent via-violet-500/10 to-transparent"
          />
        </div>

        {/* Ambient deep glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-[0_0_40px_rgba(139,92,246,0.3)] mb-8"
        >
          <Sparkles size={36} className="text-violet-400" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
        >
          Stop burning cash on unused AI tools.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-zinc-600 dark:text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Get a complete breakdown of your stack&apos;s efficiency in 90 seconds. No credit card, no login required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/audit" className="group relative inline-flex">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 blur-xl opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <span className="relative z-10 inline-flex items-center gap-3 rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 px-10 py-5 text-lg font-bold text-zinc-900 dark:text-white transition-all duration-300 group-hover:bg-zinc-50 dark:group-hover:bg-zinc-900 group-hover:scale-[1.02]">
              Audit My Spend Now
              <ArrowRight className="h-6 w-6 text-violet-400 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
