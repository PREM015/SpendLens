'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Command as CommandIcon } from 'lucide-react';
import { APP_NAME } from '@/utils/constants';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { useLanguage } from '@/contexts/LanguageProvider';

const navLinksData = [
  { href: '/#how-it-works', key: 'nav.howItWorks' },
  { href: '/#tools', key: 'nav.tools' },
  { href: '/#faq', key: 'nav.faq' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-zinc-200 dark:border-zinc-800/60 bg-white/80 dark:bg-black/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/15">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinksData.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* CTA + Actions + Mobile */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Desktop Search Shortcut */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-1.5 mr-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <CommandIcon className="h-3 w-3" />
            <span>K</span>
          </div>

          <LanguageSelector />
          <CurrencySelector />
          <ThemeToggle />

          <Link
            href="/audit"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-white transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 ml-2 shadow-sm"
          >
            {t('nav.startAudit')}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-zinc-200 dark:border-zinc-800/40 bg-white/95 dark:bg-black/95 backdrop-blur-xl"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinksData.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-white transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <CommandPalette />
    </motion.header>
  );
}
