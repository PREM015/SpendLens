'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuditStore } from '@/stores/auditStore';
import { mockAuditData } from '@/utils/mockData';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Zap } from 'lucide-react';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { useLanguage } from '@/contexts/LanguageProvider';

/* ─── Meteors background ─────────────────────────────────────────── */
function Meteors({ count = 12 }: { count?: number }) {
  const [meteorsList, setMeteorsList] = useState<Array<{id: number; left: string; delay: string; duration: string; size: string}>>([]);

  useEffect(() => {
    const generatedMeteors = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      size: `${60 + Math.random() * 80}px`,
    }));
    setMeteorsList(generatedMeteors);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteorsList.map((m) => (
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

// Removed TextReveal since we're using TextGenerateEffect from UI components

/* ─── Moving border button (Aceternity style) ────────────────────── */
function MovingBorderButton({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) {
  const content = (
    <div className="animated-border rounded-2xl bg-white dark:bg-black">
      {/* Inner glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
      <span className="relative z-10 inline-flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-8 py-4 text-base sm:text-lg font-semibold text-zinc-900 dark:text-white transition-all duration-300 group-hover:border-violet-500/40 dark:group-hover:bg-white dark:bg-zinc-950">
        {children}
        <ArrowRight className="h-5 w-5 text-violet-600 dark:text-violet-400 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group relative inline-flex">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="group relative inline-flex cursor-pointer">
      {content}
    </button>
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
  const router = useRouter();
  const { setResult } = useAuditStore();
  const { t } = useLanguage();

  const handleDemoClick = () => {
    setResult(mockAuditData);
    router.push('/results');
  };

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
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black" />
        
        <FloatingParticles />
        
        {/* Animated Aurora Gradients */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            backgroundPosition: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" },
            opacity: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.1) 0%, rgba(0, 0, 0, 0) 40%)",
            backgroundSize: "200% 200%",
          }}
        />

        {/* Lamp cone from top */}
        <div className="lamp-cone absolute inset-0 mix-blend-screen" />

        {/* Dot grid overlay */}
        <div className="dot-grid absolute inset-0 opacity-20" />

        {/* Cursor interactive spotlight */}
        <div className="spotlight absolute inset-0 opacity-80" />
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
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-50 dark:bg-violet-500/5 px-4 py-1.5 text-sm text-violet-700 dark:text-violet-300 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          {t('hero.badge')}
        </motion.div>

        {/* Headline with word-by-word reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-7 text-zinc-900 dark:text-white flex flex-wrap justify-center gap-x-[0.3em]">
          <TextGenerateEffect words={t('hero.title1')} className="inline-block" />
          <TextGenerateEffect words={t('hero.title2')} className="inline-block" />
          {' '}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-shimmer bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 dark:from-[#e2e8f0] dark:via-[#c084fc] dark:to-[#e2e8f0] inline-block"
          >
            {t('hero.title3')}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA with animated border */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MovingBorderButton href="/audit">
            {t('hero.cta')}
          </MovingBorderButton>
          
          <button 
            onClick={handleDemoClick}
            className="group relative inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base sm:text-lg font-semibold text-zinc-600 dark:text-zinc-400 transition-all duration-300 hover:text-zinc-900 dark:hover:text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/50 cursor-pointer"
          >
            {t('hero.demo')}
            <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </button>
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
