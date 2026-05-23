'use client';

import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface CardProps {
  children: ReactNode;
  className?: string;
  /** Optional accent border color */
  accent?: 'emerald' | 'red' | 'violet' | 'amber' | 'blue' | 'none';
  /** Hoverable card */
  hoverable?: boolean;
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const accentStyles = {
  emerald: 'border-emerald-500/30',
  red: 'border-red-500/30',
  violet: 'border-violet-500/30',
  amber: 'border-amber-500/30',
  blue: 'border-blue-500/30',
  none: 'border-slate-700/50',
};

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

// ─── Component ──────────────────────────────────────────────────────────────

export function Card({
  children,
  className,
  accent = 'none',
  hoverable = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-slate-800/50 backdrop-blur-sm',
        accentStyles[accent],
        paddingStyles[padding],
        hoverable &&
          'transition-all duration-300 hover:bg-slate-800/70 hover:border-slate-600 hover:shadow-xl hover:shadow-slate-900/50',
        className
      )}
    >
      {children}
    </div>
  );
}
