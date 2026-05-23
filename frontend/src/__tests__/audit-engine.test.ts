import { runAudit } from '../lib/audit-engine';
import type { FormState, ToolId } from '../types/form';
import type { AuditResult } from '../types/audit';

describe('Audit Engine Core Logic', () => {
  it('identifies Cursor plan fit issues (downgrade to Pro)', () => {
    const form: FormState = {
      teamSize: 2,
      primaryUseCase: 'coding',
      tools: [
        {
          id: '1',
          tool: 'cursor',
          plan: 'Business',
          seats: 2,
          monthlySpend: 80,
          useCase: 'coding',
        },
      ],
    };

    const result = runAudit(form);

    expect(result.toolResults[0].recommendedAction).toContain('Downgrade to Pro');
    expect(result.toolResults[0].monthlySavings).toBe(40);
  });

  it('detects duplicate coding tools (Cursor + Copilot)', () => {
    const form: FormState = {
      teamSize: 5,
      primaryUseCase: 'coding',
      tools: [
        {
          id: '1',
          tool: 'cursor',
          plan: 'Pro',
          seats: 5,
          monthlySpend: 100,
          useCase: 'coding',
        },
        {
          id: '2',
          tool: 'copilot',
          plan: 'Business',
          seats: 5,
          monthlySpend: 95,
          useCase: 'coding',
        },
      ],
    };

    const result = runAudit(form);

    const copilotResult = result.toolResults.find(t => t.tool === 'copilot');
    expect(copilotResult?.recommendedAction).toContain('Drop Copilot');
    expect(copilotResult?.monthlySavings).toBe(95);
  });

  it('calculates total annual savings correctly', () => {
    const form: FormState = {
      teamSize: 5,
      primaryUseCase: 'coding',
      tools: [
        {
          id: '1',
          tool: 'cursor',
          plan: 'Business',
          seats: 5,
          monthlySpend: 200,
          useCase: 'coding',
        },
      ],
    };

    const result = runAudit(form);
    
    // Business ($40) -> Pro ($20) for 5 seats = $100/mo savings
    expect(result.totalMonthlySavings).toBe(100);
    expect(result.totalAnnualSavings).toBe(1200);
  });

  it('flags high spend for Credex', () => {
    const form: FormState = {
      teamSize: 50,
      primaryUseCase: 'coding',
      tools: [
        {
          id: '1',
          tool: 'openai_api',
          plan: 'paygo',
          seats: 1,
          monthlySpend: 2000,
          useCase: 'coding',
        },
      ],
    };

    const result = runAudit(form);

    expect(result.savingsFlag).toBe('high');
    expect(result.toolResults[0].flag).toBe('credits');
    expect(result.toolResults[0].recommendedAction).toContain('Negotiate enterprise rate');
  });

  it('returns optimal for well-configured setups', () => {
    const form: FormState = {
      teamSize: 5,
      primaryUseCase: 'coding',
      tools: [
        {
          id: '1',
          tool: 'cursor',
          plan: 'Pro',
          seats: 5,
          monthlySpend: 100,
          useCase: 'coding',
        },
      ],
    };

    const result = runAudit(form);

    expect(result.savingsFlag).toBe('optimal');
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.toolResults[0].flag).toBe('optimal');
  });
});
