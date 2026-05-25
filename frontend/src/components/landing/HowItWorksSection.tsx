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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            How It Works
          </h2>
        </motion.div>

        {/* Equal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const flexDir = 'flex-col';
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className={`group relative rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/90 p-8 sm:p-10 backdrop-blur-md transition-all duration-500 hover:border-violet-500/50 dark:hover:bg-zinc-900/80 hover:bg-zinc-100 h-full flex ${flexDir} gap-6 overflow-hidden`}>
                    
                    {/* Glowing background blob on hover */}
                    <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 blur-2xl" />
                    
                    {/* Animated corner border beam */}
                    <div className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />

                    <div className="relative z-10 shrink-0">
                      <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-2xl overflow-hidden`}>
                        <div className="absolute inset-0 bg-white dark:bg-black/20" />
                        <Icon className="relative z-10 h-8 w-8 text-zinc-900 dark:text-white drop-shadow-md" />
                      </div>
                      <span className="absolute -bottom-3 -right-3 text-6xl font-black text-zinc-900 dark:text-white/5 select-none pointer-events-none">
                        {step.number}
                      </span>
                    </div>

                    <div className="relative z-10 flex-1">
                      <h3 className="mb-3 text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
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
