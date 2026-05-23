'use client';

import { cn } from '@/utils/cn';

export interface SkeletonProps {
  className?: string;
  /** Number of lines for text skeleton */
  lines?: number;
  /** Rounded variant */
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const roundedStyles = {
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

export function Skeleton({ className, lines, rounded = 'lg' }: SkeletonProps) {
  if (lines) {
    return (
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 bg-slate-700/50 animate-pulse',
              roundedStyles[rounded],
              // Make last line shorter for visual variety
              i === lines - 1 && 'w-3/4',
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-slate-700/50 animate-pulse',
        roundedStyles[rounded],
        className
      )}
    />
  );
}

/** Pre-built skeleton for a card */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-700/50 bg-slate-800/30 p-6 space-y-4',
        className
      )}
    >
      <Skeleton className="h-6 w-1/3" />
      <Skeleton lines={3} />
      <div className="flex gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
