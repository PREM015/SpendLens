'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { ToolRow } from '@/types';
import type { UseCase } from '@/utils/constants';

// ─── State Shape ────────────────────────────────────────────────────────────

interface FormState {
  /** Dynamic tool rows */
  toolRows: ToolRow[];
  /** Team size input */
  teamSize: number | '';
  /** Selected use case */
  useCase: UseCase | '';
  /** Whether form was restored from persistence */
  wasRestored: boolean;

  // ─── Actions ────────────────────────────────────────────────────────────
  addToolRow: () => void;
  removeToolRow: (id: string) => void;
  updateToolRow: (id: string, updates: Partial<ToolRow>) => void;
  setTeamSize: (size: number | '') => void;
  setUseCase: (useCase: UseCase | '') => void;
  resetForm: () => void;
  dismissRestore: () => void;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function createEmptyRow(): ToolRow {
  return {
    id: nanoid(8),
    toolName: '',
    planName: '',
    seats: '',
    monthlySpend: '',
  };
}

const initialState = {
  toolRows: [createEmptyRow()],
  teamSize: '' as number | '',
  useCase: '' as UseCase | '',
  wasRestored: false,
};

// ─── Store ──────────────────────────────────────────────────────────────────

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      ...initialState,

      addToolRow: () =>
        set((state) => ({
          toolRows: [...state.toolRows, createEmptyRow()],
        })),

      removeToolRow: (id) =>
        set((state) => ({
          toolRows:
            state.toolRows.length > 1
              ? state.toolRows.filter((row) => row.id !== id)
              : state.toolRows,
        })),

      updateToolRow: (id, updates) =>
        set((state) => ({
          toolRows: state.toolRows.map((row) =>
            row.id === id ? { ...row, ...updates } : row
          ),
        })),

      setTeamSize: (size) => set({ teamSize: size }),

      setUseCase: (useCase) => set({ useCase }),

      resetForm: () => set({ ...initialState, toolRows: [createEmptyRow()] }),

      dismissRestore: () => set({ wasRestored: false }),
    }),
    {
      name: 'spendlens-form',
      onRehydrateStorage: () => (state) => {
        if (state && state.toolRows.length > 0 && state.toolRows.some((r) => r.toolName)) {
          state.wasRestored = true;
        }
      },
    }
  )
);
