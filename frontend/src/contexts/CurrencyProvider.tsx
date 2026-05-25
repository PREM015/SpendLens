'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { formatCurrency as formatCurrencyUtils, formatCompactCurrency as formatCompactCurrencyUtils } from '@/utils/formatCurrency';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  convertAmount: (usdAmount: number) => number;
  formatInCurrency: (usdAmount: number, options?: { decimals?: number; suffix?: string; showSign?: boolean }) => string;
  formatCompactInCurrency: (usdAmount: number) => string;
}

const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('spendlens-currency') as CurrencyCode;
    if (saved && RATES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem('spendlens-currency', c);
  };

  const convertAmount = (usdAmount: number) => {
    if (!mounted) return usdAmount; // Prevent hydration mismatch
    return usdAmount * RATES[currency];
  };

  const formatInCurrency = (usdAmount: number, options?: { decimals?: number; suffix?: string; showSign?: boolean }) => {
    const amount = convertAmount(usdAmount);
    return formatCurrencyUtils(amount, { ...options, currency: mounted ? currency : 'USD' });
  };

  const formatCompactInCurrency = (usdAmount: number) => {
    const amount = convertAmount(usdAmount);
    return formatCompactCurrencyUtils(amount, mounted ? currency : 'USD');
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertAmount, formatInCurrency, formatCompactInCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
