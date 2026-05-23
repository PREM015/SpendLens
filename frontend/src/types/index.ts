import type { ToolName, PlanName, UseCase, RecommendationAction } from '@/utils/constants';

// ─── Form Types ─────────────────────────────────────────────────────────────

/** A single tool row in the audit form */
export interface ToolRow {
  id: string;
  toolName: ToolName | '';
  planName: PlanName | '';
  seats: number | '';
  monthlySpend: number | '';
}

/** Full audit submission payload */
export interface AuditSubmission {
  tools: Array<{
    toolName: ToolName;
    planName: PlanName;
    seats: number;
    monthlySpend: number;
  }>;
  teamSize: number;
  useCase: UseCase;
}

// ─── Result Types ───────────────────────────────────────────────────────────

/** Recommendation for a single tool */
export interface ToolAuditResult {
  tool: ToolName;
  current_plan: PlanName;
  current_spend: number;
  seats: number;
  use_case?: UseCase;
  recommended_action: string;
  recommended_plan?: PlanName;
  recommended_tool?: ToolName;
  monthly_savings: number;
  annual_savings: number;
  reason: string;
}

/** Complete audit result */
export interface AuditResult {
  id: string;
  share_token?: string;
  created_at?: string;
  teamSize?: number;
  useCase?: UseCase;
  totalCurrentSpend?: number;
  totalOptimizedSpend?: number;
  monthly_savings: number;
  annual_savings: number;
  tools: ToolAuditResult[];
  credexEligible?: boolean;
}

export type AuditResponse = AuditResult;

export interface AuditRequest {
  tools: Array<{
    tool: string;
    current_plan: string;
    seats: number;
    current_spend: number;
    use_case: string;
  }>;
  teamSize: number;
  primaryUseCase: string;
}

/** AI-generated summary */
export interface AiSummary {
  summary: string;
  highlights: string[];
  generatedAt: string;
}

// ─── Lead Types ─────────────────────────────────────────────────────────────

export interface LeadSubmission {
  email: string;
  company?: string;
  role?: string;
  auditId: string;
  honeypot?: string;
}

export interface LeadResult {
  success: boolean;
  message: string;
}

// ─── Share Types ────────────────────────────────────────────────────────────

/** PII-stripped public audit view */
export interface PublicAudit {
  id: string;
  teamSize: number;
  useCase: UseCase;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  toolCount: number;
  toolResults: Array<{
    toolName: ToolName;
    action: RecommendationAction;
    monthlySavings: number;
  }>;
}

// ─── API Response Types ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
