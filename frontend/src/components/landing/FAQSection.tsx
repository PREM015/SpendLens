'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Is SpendLens really free?',
    a: 'Yes, 100% free — forever. SpendLens is a free tool built by Credex. There are no paywalls, no trials, and no credit card required. We built it to help startups identify AI waste quickly.',
  },
  {
    q: 'How accurate is the audit?',
    a: 'Our engine uses real-time pricing data from every major AI tool vendor. Savings estimates are based on actual plan costs, your seat count, and usage patterns. Most users find the estimates within 5-10% of actual savings.',
  },
  {
    q: 'What data do you collect?',
    a: 'We only collect the tool names, plan tiers, seat counts, and monthly costs you enter into the form. We never access your AI tool accounts, conversations, or usage data. Your audit data is never shared or sold.',
  },
  {
    q: 'How does Credex make money?',
    a: 'Credex is a SaaS spend management platform. SpendLens helps startups discover waste — and if savings are significant, we offer optional managed optimization through Credex. You\'re never pressured to convert.',
  },
  {
    q: 'Can I share my audit results?',
    a: 'Absolutely! Every audit generates a unique shareable link. Send it to your CTO, finance team, or investors to show exactly where AI budget is being wasted and how much you could save.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" ref={ref} className="relative py-28 sm:py-36">
      {/* Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 opacity-20" />
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Questions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/40 backdrop-blur-md shadow-2xl divide-y divide-zinc-200 dark:divide-zinc-800/60">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                className="group"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-6 px-6 sm:px-8 text-left transition-colors duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
                >
                  <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-violet-400' : 'text-zinc-600 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-900 dark:text-white'}`}>
                    {faq.q}
                  </span>
                  <div
                    className={`ml-6 shrink-0 rounded-full border p-1.5 transition-all duration-300 ${
                      isOpen
                        ? 'border-violet-500/50 bg-violet-500/10 text-violet-400'
                        : 'border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-600 dark:text-zinc-500 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300'
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 px-6 sm:px-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
