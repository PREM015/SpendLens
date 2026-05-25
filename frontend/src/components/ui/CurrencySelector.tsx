'use client';

import * as React from 'react';
import { useCurrency, CurrencyCode } from '@/contexts/CurrencyProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CURRENCIES: { code: CurrencyCode; symbol: string }[] = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'INR', symbol: '₹' },
];

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-9 rounded-md" />; // Placeholder
  }

  const selected = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 h-9 rounded-md text-sm font-medium transition-colors hover:bg-zinc-800/50 dark:hover:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-900 dark:text-white"
      >
        <span className="font-semibold">{selected.symbol}</span>
        <span className="hidden sm:inline">{selected.code}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-32 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden z-50 backdrop-blur-xl"
          >
            <div className="p-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    currency === c.code
                      ? 'bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-900 dark:text-white'
                  }`}
                >
                  <span className="font-semibold">{c.symbol}</span>
                  <span>{c.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
