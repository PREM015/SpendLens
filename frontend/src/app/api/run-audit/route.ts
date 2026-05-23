import { NextRequest, NextResponse } from 'next/server';
import { FormStateSchema } from '@/lib/form-schema';
import { runAudit } from '@/lib/audit-engine';
import { generateAuditId } from '@/lib/generate-id';
import { supabase } from '@/lib/supabase';
import type { APIResponse, AuditAPIResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const parseResult = FormStateSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0];
      const response: APIResponse<never> = {
        success: false,
        error: {
          message: firstError.message,
          code: 'VALIDATION_ERROR',
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const formState = parseResult.data;

    // Run the audit engine (hardcoded rules, no AI)
    const auditResult = runAudit(formState);
    const auditId = generateAuditId();

    // Save to Supabase
    const { error: dbError } = await supabase.from('audits').insert({
      id: auditId,
      form_data: formState,
      result: auditResult,
      total_monthly_savings: auditResult.totalMonthlySavings,
      total_annual_savings: auditResult.totalAnnualSavings,
      savings_flag: auditResult.savingsFlag,
      team_size: formState.teamSize,
      primary_use_case: formState.primaryUseCase,
      tool_count: formState.tools.length,
      created_at: auditResult.createdAt,
    });

    if (dbError) {
      console.error('[run-audit] Supabase insert error:', dbError);
      // Still return the result even if DB save fails —
      // the audit itself is computed client-side-ready data
      const response: APIResponse<AuditAPIResponse> = {
        success: true,
        data: { auditId, result: auditResult },
      };
      return NextResponse.json(response, { status: 200 });
    }

    const response: APIResponse<AuditAPIResponse> = {
      success: true,
      data: { auditId, result: auditResult },
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('[run-audit] Unexpected error:', error);
    const response: APIResponse<never> = {
      success: false,
      error: {
        message: 'An unexpected error occurred while processing your audit.',
        code: 'INTERNAL_ERROR',
      },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
