'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const testimonials = [
  {
    quote: "SpendLens caught that 40% of our engineering team had both Copilot and Cursor Pro active. We consolidated and instantly saved $800/mo.",
    name: "Sarah Jenkins",
    title: "VP of Engineering at DataFlow",
    avatar: "SJ",
    color: "bg-blue-500",
  },
  {
    quote: "We were paying for Claude Enterprise for a team of 4. SpendLens recommended Pro, which gave us the same models for $2k less per year.",
    name: "Marcus Thorne",
    title: "CTO at Nexus AI",
    avatar: "MT",
    color: "bg-emerald-500",
  },
  {
    quote: "I didn't realize how quickly AI subscriptions were eating our burn rate. The SpendLens dashboard is now required reading for our finance syncs.",
    name: "Elena Rodriguez",
    title: "Founder & CEO at Orbit",
    avatar: "ER",
    color: "bg-violet-500",
  },
  {
    quote: "The easiest ROI we've ever had. 90 seconds to fill out the form, and we found $12k in annual savings across our 50-person org.",
    name: "David Chen",
    title: "Head of Operations at StackSync",
    avatar: "DC",
    color: "bg-fuchsia-500",
  },
  {
    quote: "Finally, someone brought transparency to AI pricing. The breakdown of overlapping tools is brilliant and saved us from a costly renewal.",
    name: "Amanda Clark",
    title: "Director of Engineering at Vertex",
    avatar: "AC",
    color: "bg-rose-500",
  },
  {
    quote: "We had multiple ChatGPT Plus accounts being expensed individually. SpendLens showed us exactly how to move to a Team plan and save money.",
    name: "James Wilson",
    title: "Finance Lead at Quantum",
    avatar: "JW",
    color: "bg-amber-500",
  },
];

// We don't need row1 and row2 anymore, just use the component

export function TestimonialsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Trusted by Leaders
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Don&apos;t just take our word for it
          </h2>
          <p className="text-zinc-600 dark:text-zinc-500 max-w-2xl mx-auto">
            Engineering and finance leaders are using SpendLens to stop AI budget leakage.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-6 mt-16">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
        />
        <InfiniteMovingCards
          items={testimonials.slice().reverse()}
          direction="right"
          speed="slow"
        />
      </div>
    </section>
  );
}
