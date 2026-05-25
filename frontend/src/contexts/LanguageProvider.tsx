'use client';

import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { LanguageCode, translations } from '@/utils/translations';

type TranslationKey = string; // Using string path like 'nav.howItWorks'

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('spendlens-language') as LanguageCode;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('spendlens-language', lang);
  };

  const t = (keyRecord<string, unknown> = translations[language];
    for (const k of keys) {
      if (!result || typeof result !== 'object' || !(k in result)) {
        // Fallback to english if not found
        let fallback: Record<string, unknown> = translations['en'];
        for (const fb of keys) {
          if (!fallback || typeof fallback !== 'object' || !(fb in fallback)) return key;
          fallback = fallback[fb] as Record<string, unknown>;
        }
        return String(fallback);
      }
      result = result[k] as Record<string, unknown>;
    }
    return String(result);
  };

  // Pre-render pass with default english if not mounted to match server
  const serverT = (key: TranslationKey): string => {
    const keys = key.split('.');
    let result: Record<string, unknown> = translations['en'];
    for (const k of keys) {
      if (!result || typeof result !== 'object' || !(k in result)) return key;
      result = result[k] as Record<string, unknown>;
    }
    return String(result)efined) return key;
      result = result[k];
    }
    return result as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: mounted ? t : serverT }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
