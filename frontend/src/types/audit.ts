import type { ToolId } from './form';

export interface ToolAuditResult {
  tool: ToolId;
  currentSpend: number;
  currentPlan: string;
  recommendedAction: string;
  recommendedPlan?: string;
  recommendedTool?: ToolId;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
  flag: 'optimal' | 'savings' | 'credits';
}

export interface AuditResult {
  toolResults: ToolAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsFlag: 'high' | 'low' | 'optimal';
  aiSummary?: string;
  createdAt: string;
}
