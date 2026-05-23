'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, Clock, Zap } from 'lucide-react';

/* ─── Meteors background ─────────────────────────────────────────── */
function Meteors({ count = 12 }: { count?: number }) {
  const meteors = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
    size: `${60 + Math.random() * 80}px`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((m) => (
        <div
          key={m.id}
          className="meteor"
          style={{
            left: m.left,
            top: '-5%',
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Word-by-word text reveal (Aceternity style) ────────────────── */
function TextReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Moving border button (Aceternity style) ────────────────────── */
function MovingBorderButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="group relative inline-flex">
      <div className="animated-border rounded-2xl">
        {/* Inner glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
        <span className="relative z-10 inline-flex items-center gap-3 rounded-2xl border border-zinc-800 bg-black px-8 py-4 text-base sm:text-lg font-semibold text-white transition-all duration-300 group-hover:border-violet-500/40 group-hover:bg-zinc-950">
          {children}
          <ArrowRight className="h-5 w-5 text-violet-400 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* ─── Main Hero ──────────────────────────────────────────────────── */
const trustItems = [
  { icon: Zap, text: 'Free forever' },
  { icon: Shield, text: 'No login required' },
  { icon: Clock, text: 'Results in 90 seconds' },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: `${e.clientX - rect.left}px`,
        y: `${e.clientY - rect.top}px`,
      });
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouse);
    return () => el?.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ '--mouse-x': mousePos.x, '--mouse-y': mousePos.y } as React.CSSProperties}
    >
      {/* ── Background layers ──────────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        {/* Pure black base */}
        <div className="absolute inset-0 bg-black" />

        {/* Lamp cone from top */}
        <div className="lamp-cone absolute inset-0" />

        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 opacity-40" />

        {/* Spotlight follows cursor */}
        <div className="spotlight absolute inset-0" />

        {/* Ambient orbs */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-violet-600/8 blur-[160px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-600/6 blur-[120px]" />
      </div>

      {/* Meteors */}
      <Meteors count={14} />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-28 sm:py-36 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-sm text-violet-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          Free AI Spend Audit Tool
        </motion.div>

        {/* Headline with word-by-word reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-7">
          <TextReveal text="Find Out Exactly Where" className="text-white" />
          <br className="hidden sm:block" />
          <TextReveal text="Your AI Budget Is" className="text-white" />
          {' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-shimmer"
          >
            Leaking
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-zinc-400"
        >
          Audit your team&apos;s AI stack in 90 seconds. We find the waste, consolidate
          the seats, and show you exactly how much you can save.
        </motion.p>

        {/* CTA with animated border */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <MovingBorderButton href="/audit">
            Audit My Spend Now
          </MovingBorderButton>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <span key={item.text} className="flex items-center gap-2 text-sm text-zinc-500">
                <Icon className="h-4 w-4 text-violet-600" />
                {item.text}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
