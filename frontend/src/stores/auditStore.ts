'use client';

import { create } from 'zustand';
import type { AuditResult, AiSummary } from '@/types';

interface AuditState {
  /** Current audit result */
  result: AuditResult | null;
  /** AI-generated summary */
  aiSummary: AiSummary | null;
  /** Loading states */
  isSubmitting: boolean;
  isSummaryLoading: boolean;
  /** Error states */
  submitError: string | null;
  summaryError: string | null;

  // Actions
  setResult: (result: AuditResult) => void;
  setAiSummary: (summary: AiSummary) => void;
  setSubmitting: (loading: boolean) => void;
  setSummaryLoading: (loading: boolean) => void;
  setSubmitError: (error: string | null) => void;
  setSummaryError: (error: string | null) => void;
  clearResult: () => void;
}

export const useAuditStore = create<AuditState>()((set) => ({
  result: null,
  aiSummary: null,
  isSubmitting: false,
  isSummaryLoading: false,
  submitError: null,
  summaryError: null,

  setResult: (result) => set({ result, submitError: null }),
  setAiSummary: (summary) => set({ aiSummary: summary, summaryError: null }),
  setSubmitting: (loading) => set({ isSubmitting: loading }),
  setSummaryLoading: (loading) => set({ isSummaryLoading: loading }),
  setSubmitError: (error) => set({ submitError: error, isSubmitting: false }),
  setSummaryError: (error) => set({ summaryError: error, isSummaryLoading: false }),
  clearResult: () =>
    set({
      result: null,
      aiSummary: null,
      submitError: null,
      summaryError: null,
    }),
}));
