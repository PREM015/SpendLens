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
          monthlySpend: 110,
          useCase: 'coding',
        },
      ],
    };

    const result = runAudit(form);

    const copilotResult = result.toolResults.find(t => t.tool === 'copilot');
    expect(copilotResult?.recommendedAction).toContain('drop in favor of Cursor');
    expect(copilotResult?.monthlySavings).toBe(110);
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
          seats: 3,
          monthlySpend: 120,
          useCase: 'coding',
        },
      ],
    };

    const result = runAudit(form);
    
    // Business ($40) -> Pro ($20) for 3 seats = $60/mo savings
    expect(result.totalMonthlySavings).toBe(60);
    expect(result.totalAnnualSavings).toBe(720);
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

    expect(result.savingsFlag).toBe('optimal');
    expect(result.toolResults[0].flag).toBe('credits');
    expect(result.toolResults[0].reason).toContain('Credex can negotiate');
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
