'use client';

import Link from 'next/link';
import { CREDEX_URL, APP_NAME } from '@/utils/constants';
import { Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-800/50">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-indigo-600">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">{APP_NAME}</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-sm">
              Free AI spend audit tool. Find out where your AI budget is leaking and save
              thousands per year.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Product</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/audit" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">
                Start Audit
              </Link>
              <Link href="/#how-it-works" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">
                How It Works
              </Link>
              <Link href="/#faq" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Credex */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Credex</h4>
            <nav className="flex flex-col gap-3">
              <a href={CREDEX_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-violet-400 transition-colors duration-200">
                About
              </a>
              <a href={`${CREDEX_URL}/pricing`} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-violet-400 transition-colors duration-200">
                Pricing
              </a>
              <a href={`${CREDEX_URL}/contact`} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-violet-400 transition-colors duration-200">
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Powered by{' '}
            <a href={CREDEX_URL} target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:text-violet-400 transition-colors">
              Credex
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
