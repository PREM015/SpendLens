'use client';

import { useMotionValue, useTransform, animate, useInView, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function NumberTicker({ value, prefix = '', suffix = '', decimals = 0 }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return prefix + latest.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  });
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: 'easeOut' });
    }
  }, [value, isInView, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
