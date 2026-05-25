'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useToastStore } from '@/stores/toastStore';

// ─── Toast Item ─────────────────────────────────────────────────────────────

const variantConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    iconColor: 'text-emerald-400',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-500/10 border-red-500/30',
    iconColor: 'text-red-400',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-500/10 border-blue-500/30',
    iconColor: 'text-blue-400',
  },
};

function ToastItem({
  id,
  message,
  variant,
}: {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'info';
}) {
  const removeToast = useToastStore((s) => s.removeToast);
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={cn(
        'flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md',
        config.bg
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', config.iconColor)} />
      <p className="text-sm text-zinc-900 dark:text-white flex-1">{message}</p>
      <button
        onClick={() => removeToast(id)}
        className="rounded-lg p-1 text-zinc-600 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-zinc-900 dark:text-white transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// ─── Toast Container ────────────────────────────────────────────────────────

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
