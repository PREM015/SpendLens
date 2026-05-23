'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Is SpendLens really free?',
    answer:
      'Yes, 100% free — forever. SpendLens is a free tool built by Credex. There are no paywalls, no trials, and no credit card required. We built it to help startups identify AI waste quickly.',
  },
  {
    question: 'How accurate is the audit?',
    answer:
      'Our engine uses real-time pricing data from every major AI tool vendor. Savings estimates are based on actual plan costs, your seat count, and usage patterns. Most users find the estimates within 5-10% of actual savings.',
  },
  {
    question: 'What data do you collect?',
    answer:
      'We only collect the tool names, plan tiers, seat counts, and monthly costs you enter into the form. We never access your AI tool accounts, conversations, or usage data. Your audit data is never shared or sold.',
  },
  {
    question: 'How does Credex make money?',
    answer:
      'Credex is a SaaS spend management platform. SpendLens helps startups discover waste — and if savings are significant, we offer optional managed optimization through Credex. You\'re never pressured to convert.',
  },
  {
    question: 'Can I share my audit results?',
    answer:
      'Absolutely! Every audit generates a unique shareable link. Send it to your CTO, finance team, or investors to show exactly where AI budget is being wasted and how much you could save.',
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-colors duration-200 hover:bg-zinc-900/50 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-zinc-200 sm:text-lg">
          {faq.question}
        </span>
        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'border-violet-500/40 bg-violet-500/10' : 'border-zinc-800 bg-zinc-900'}`}>
          {isOpen ? (
            <Minus className="h-3 w-3 text-violet-400" />
          ) : (
            <Plus className="h-3 w-3 text-zinc-500" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-500 sm:text-base">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="rounded-2xl border border-zinc-800 bg-zinc-950/50 divide-y divide-zinc-800/50 backdrop-blur-sm overflow-hidden"
        >
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              faq={faq}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
