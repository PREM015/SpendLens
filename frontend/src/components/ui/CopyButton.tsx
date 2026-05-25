'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  variant?: 'icon' | 'button';
}

export function CopyButton({
  text,
  className,
  label = 'Copy',
  variant = 'icon',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleCopy}
        className={cn(
          'rounded-lg p-2 text-slate-400 hover:text-zinc-900 dark:text-white hover:bg-slate-700/50 transition-all duration-200 cursor-pointer',
          className
        )}
        aria-label={copied ? 'Copied!' : label}
        title={copied ? 'Copied!' : label}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            >
              <Check className="h-4 w-4 text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            >
              <Copy className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
        copied
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
          : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:text-zinc-900 dark:text-white hover:border-slate-600',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4 text-emerald-400" />
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
