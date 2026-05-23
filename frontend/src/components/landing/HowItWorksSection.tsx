'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, Cpu, TrendingDown } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Input Your Stack',
    description: 'Tell us which AI tools you use, how many seats, and what you pay. Takes under 2 minutes.',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'We Analyze Everything',
    description: 'Our engine benchmarks your stack against current pricing, usage patterns, and smarter alternatives.',
    gradient: 'from-fuchsia-600 to-violet-600',
  },
  {
    number: '03',
    icon: TrendingDown,
    title: 'See Your Savings',
    description: 'Get a detailed breakdown of waste, actionable steps to cut costs, or let Credex handle it for you.',
    gradient: 'from-indigo-600 to-blue-600',
  },
];

/* ─── 3D Tilt Card (Aceternity-style) ────────────────────────────── */
function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
  };

  const handleLeave = () => setTransform('');

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ transform, transition: 'transform 0.2s ease-out' }}
      className={className}
    >
      {children}
    </div>
  );
}

export function HowItWorksSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-28 sm:py-36 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-violet-400">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            How It Works
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <TiltCard>
                  <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-zinc-700 h-full">
                    {/* Spotlight on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-600/5 to-transparent" />

                    <div className="relative">
                      {/* Number */}
                      <span className={`mb-6 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${step.gradient} text-sm font-bold text-white shadow-lg`}>
                        {step.number}
                      </span>

                      {/* Icon */}
                      <div className="mb-5">
                        <Icon className="h-6 w-6 text-zinc-500 transition-colors duration-300 group-hover:text-violet-400" />
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-semibold text-white">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-zinc-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
