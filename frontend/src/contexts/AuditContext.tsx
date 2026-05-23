import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuditResponse } from '@/types';

interface AuditContextType {
  auditResult: AuditResponse | null;
  setAuditResult: (result: AuditResponse | null) => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: ReactNode }) {
  const [auditResult, setAuditResult] = useState<AuditResponse | null>(null);

  return (
    <AuditContext.Provider value={{ auditResult, setAuditResult }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAuditContext() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error('useAuditContext must be used within an AuditProvider');
  }
  return context;
}
