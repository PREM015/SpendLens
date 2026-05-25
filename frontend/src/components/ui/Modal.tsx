'use client';

import { type ReactNode, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  /** Max width class */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether clicking overlay closes the modal */
  closeOnOverlay?: boolean;
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

// ─── Component ──────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  maxWidth = 'md',
  closeOnOverlay = true,
}: ModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white dark:bg-black/70 backdrop-blur-sm"
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative w-full rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl',
              maxWidthStyles[maxWidth],
              className
            )}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Header */}
            {(title || true) && (
              <div className="flex items-center justify-between mb-4">
                {title && (
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h2>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto rounded-lg p-1.5 text-slate-400 hover:text-zinc-900 dark:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Body */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
