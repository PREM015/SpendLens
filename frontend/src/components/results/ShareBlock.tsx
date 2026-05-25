'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyButton } from '@/components/ui/CopyButton';
import { buildShareUrl } from '@/utils/shareUrl';
import { Share2, Link2 } from 'lucide-react';

export function ShareBlock({ token }: { token: string }) {
  const shareUrl = buildShareUrl(token);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-zinc-50 dark:bg-slate-800/50 border border-zinc-200 dark:border-slate-700/50 backdrop-blur-xl rounded-xl p-6 mt-8"
    >
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2.5">
        <div className="p-1.5 bg-zinc-200 dark:bg-slate-700/50 rounded-lg">
          <Share2 size={14} className="text-zinc-600 dark:text-slate-300" />
        </div>
        Share this Audit
      </h3>

      <p className="text-sm text-zinc-500 dark:text-slate-400 mb-4">
        Send this anonymous link to your team. All PII and company information is hidden.
      </p>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-slate-500" />
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900/70 border border-zinc-200 dark:border-slate-700/50 rounded-xl text-sm text-zinc-700 dark:text-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
          />
        </div>
        <CopyButton
          text={shareUrl}
          variant="button"
          label="Copy link"
        />
      </div>
    </motion.div>
  );
}
