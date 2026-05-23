import type { AuditResult } from './audit';

export interface ErrorDetail {
  message: string;
  code: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorDetail;
}

export interface AuditAPIResponse {
  auditId: string;
  result: AuditResult;
}

export interface SummaryAPIResponse {
  summary: string;
}
