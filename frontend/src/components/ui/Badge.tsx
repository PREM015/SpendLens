'use client';

import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant = 'savings' | 'optimal' | 'switch' | 'credits' | 'danger' | 'neutral';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  /** Dot indicator */
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  savings: {
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  optimal: {
    bg: 'bg-blue-500/10 border-blue-500/20',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  switch: {
    bg: 'bg-amber-500/10 border-amber-500/20',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  credits: {
    bg: 'bg-violet-500/10 border-violet-500/20',
    text: 'text-violet-400',
    dot: 'bg-violet-400',
  },
  danger: {
    bg: 'bg-red-500/10 border-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-400',
  },
  neutral: {
    bg: 'bg-slate-500/10 border-slate-500/20',
    text: 'text-slate-400',
    dot: 'bg-slate-400',
  },
};

export function Badge({
  variant = 'neutral',
  children,
  className,
  dot = false,
}: BadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles.bg,
        styles.text,
        className
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', styles.dot)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
