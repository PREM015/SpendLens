import type { FormState, ToolEntry, ToolId } from '@/types/form';
import type { AuditResult, ToolAuditResult } from '@/types/audit';
import { PRICING, getPlanPrice, getToolDisplayName } from './pricing-data';

/**
 * Core audit engine. Uses hardcoded rules (NOT AI) to produce savings recommendations.
 * Checks performed per tool:
 *   1. Plan-fit check — is the team too small/large for the current plan?
 *   2. Same-vendor downgrade — could a cheaper plan from the same vendor work?
 *   3. Alternative tool check — is there a cheaper tool that covers the same use case?
 *   4. Credits check — flag total spend >$500/mo for Credex bulk negotiation.
 * Cross-tool analysis:
 *   - Duplicate detection for overlapping coding-assistant subscriptions.
 */
export function runAudit(form: FormState): AuditResult {
  const toolResults: ToolAuditResult[] = [];

  for (const entry of form.tools) {
    const result = auditSingleTool(entry, form);
    toolResults.push(result);
  }

  // Cross-tool: check for duplicate coding assistants
  const duplicateResults = checkDuplicates(form, toolResults);
  // Merge duplicate recommendations (overwrite where applicable)
  for (const dup of duplicateResults) {
    const idx = toolResults.findIndex((r) => r.tool === dup.tool);
    if (idx !== -1 && dup.monthlySavings > toolResults[idx].monthlySavings) {
      toolResults[idx] = dup;
    }
  }

  // Credits check: if total spend > $500/mo, flag everything for Credex
  const totalMonthlySpend = form.tools.reduce((sum, t) => sum + t.monthlySpend, 0);
  if (totalMonthlySpend > 500) {
    for (const result of toolResults) {
      if (result.flag !== 'savings') {
        result.flag = 'credits';
        result.reason += ` Your total AI spend of $${totalMonthlySpend.toLocaleString()}/mo exceeds $500 — Credex can negotiate volume discounts across all your subscriptions.`;
      }
    }
  }

  const totalMonthlySavings = toolResults.reduce((sum, r) => sum + r.monthlySavings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  let savingsFlag: AuditResult['savingsFlag'];
  if (totalMonthlySavings === 0) {
    savingsFlag = 'optimal';
  } else if (totalAnnualSavings >= 1000) {
    savingsFlag = 'high';
  } else {
    savingsFlag = 'low';
  }

  return {
    toolResults,
    totalMonthlySavings: round(totalMonthlySavings),
    totalAnnualSavings: round(totalAnnualSavings),
    savingsFlag,
    createdAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Internal: per-tool audit
// ---------------------------------------------------------------------------

function auditSingleTool(entry: ToolEntry, form: FormState): ToolAuditResult {
  const { tool, plan, seats, monthlySpend, useCase } = entry;
  const displayName = getToolDisplayName(tool);

  // 1. Plan-fit check
  const planFit = checkPlanFit(tool, plan, seats, monthlySpend, displayName);
  if (planFit) return planFit;

  // 2. Same-vendor downgrade
  const downgrade = checkSameVendorDowngrade(tool, plan, seats, monthlySpend, displayName);
  if (downgrade) return downgrade;

  // 3. Alternative tool check
  const alternative = checkAlternativeTool(tool, plan, seats, monthlySpend, useCase, displayName);
  if (alternative) return alternative;

  // No savings found — tool is optimal
  return {
    tool,
    currentSpend: monthlySpend,
    currentPlan: plan,
    recommendedAction: 'Keep current plan',
    monthlySavings: 0,
    annualSavings: 0,
    reason: `Your ${displayName} ${plan} subscription is well-matched to your team size of ${seats} and use case. No changes recommended.`,
    flag: 'optimal',
  };
}

// ---------------------------------------------------------------------------
// Check 1: Plan-fit — seat minimums and plan mismatches
// ---------------------------------------------------------------------------

function checkPlanFit(
  tool: ToolId,
  plan: string,
  seats: number,
  monthlySpend: number,
  displayName: string
): ToolAuditResult | null {
  // Claude Team requires minimum 5 seats
  if (tool === 'claude' && plan.toLowerCase() === 'team' && seats < 5) {
    const proPrice = getPlanPrice('claude', 'Pro') ?? 20;
    const recommendedSpend = proPrice * seats;
    const savings = monthlySpend - recommendedSpend;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Downgrade to individual Pro plans',
        recommendedPlan: 'Pro',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `Claude Team requires a minimum of 5 seats, but you only have ${seats}. You're paying for unused capacity. Switching each user to Claude Pro at $${proPrice}/mo saves $${round(savings)}/mo.`,
        flag: 'savings',
      };
    }
  }

  // ChatGPT Team requires minimum 2 seats
  if (tool === 'chatgpt' && plan.toLowerCase() === 'team' && seats < 2) {
    const plusPrice = getPlanPrice('chatgpt', 'Plus') ?? 20;
    const recommendedSpend = plusPrice * seats;
    const savings = monthlySpend - recommendedSpend;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Downgrade to Plus',
        recommendedPlan: 'Plus',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `ChatGPT Team requires at least 2 seats. With only ${seats} user, ChatGPT Plus at $${plusPrice}/mo provides equivalent individual features at lower cost.`,
        flag: 'savings',
      };
    }
  }

  // ChatGPT Enterprise without significant team — flag custom pricing waste
  if (tool === 'chatgpt' && plan.toLowerCase() === 'enterprise' && seats < 20 && monthlySpend > 0) {
    const teamPrice = getPlanPrice('chatgpt', 'Team') ?? 30;
    const recommendedSpend = teamPrice * seats;
    const savings = monthlySpend - recommendedSpend;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Evaluate downgrade to Team plan',
        recommendedPlan: 'Team',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `ChatGPT Enterprise with ${seats} seats may be over-provisioned. Unless you require SSO/SCIM and advanced compliance, the Team plan at $${teamPrice}/seat/mo offers strong value for smaller groups.`,
        flag: 'savings',
      };
    }
  }

  // Claude Max — check if Pro would suffice (Max is $100/seat)
  if (tool === 'claude' && plan.toLowerCase() === 'max') {
    const proPrice = getPlanPrice('claude', 'Pro') ?? 20;
    const recommendedSpend = proPrice * seats;
    const savings = monthlySpend - recommendedSpend;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Evaluate downgrade to Pro',
        recommendedPlan: 'Pro',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `Claude Max at $100/seat/mo is 5× the cost of Pro. Unless your team consistently hits Pro usage limits, downgrading saves $${round(savings)}/mo without losing access to the same models.`,
        flag: 'savings',
      };
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Check 2: Same-vendor downgrade
// ---------------------------------------------------------------------------

function checkSameVendorDowngrade(
  tool: ToolId,
  plan: string,
  seats: number,
  monthlySpend: number,
  displayName: string
): ToolAuditResult | null {
  // Cursor Business → Pro for small teams
  if (tool === 'cursor' && plan.toLowerCase() === 'business' && seats <= 3) {
    const proPrice = getPlanPrice('cursor', 'Pro') ?? 20;
    const recommendedSpend = proPrice * seats;
    const savings = monthlySpend - recommendedSpend;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Downgrade to Pro plan',
        recommendedPlan: 'Pro',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `Cursor Business ($40/seat) is designed for teams needing centralized billing and admin controls. With only ${seats} seats, the Pro plan at $20/seat delivers the same AI features and saves $${round(savings)}/mo.`,
        flag: 'savings',
      };
    }
  }

  // Copilot Enterprise → Business for teams not needing customization
  if (tool === 'copilot' && plan.toLowerCase() === 'enterprise' && seats <= 10) {
    const bizPrice = getPlanPrice('copilot', 'Business') ?? 19;
    const recommendedSpend = bizPrice * seats;
    const savings = monthlySpend - recommendedSpend;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Downgrade to Business plan',
        recommendedPlan: 'Business',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `GitHub Copilot Enterprise ($39/seat) includes fine-tuned models and knowledge bases that smaller teams rarely utilize. Business at $19/seat covers code completion, chat, and PR summaries — saving $${round(savings)}/mo.`,
        flag: 'savings',
      };
    }
  }

  // Copilot Business → Individual for solo developers
  if (tool === 'copilot' && plan.toLowerCase() === 'business' && seats === 1) {
    const indPrice = getPlanPrice('copilot', 'Individual') ?? 10;
    const savings = monthlySpend - indPrice;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Downgrade to Individual plan',
        recommendedPlan: 'Individual',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `You're paying for Copilot Business ($19/seat) with a single seat. The Individual plan at $10/mo provides the same core code completion and chat features for solo use.`,
        flag: 'savings',
      };
    }
  }

  // Windsurf Teams → Pro for small teams
  if (tool === 'windsurf' && plan.toLowerCase() === 'teams' && seats <= 2) {
    const proPrice = getPlanPrice('windsurf', 'Pro') ?? 15;
    const recommendedSpend = proPrice * seats;
    const savings = monthlySpend - recommendedSpend;
    if (savings > 0) {
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Downgrade to Pro plan',
        recommendedPlan: 'Pro',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `Windsurf Teams ($35/seat) includes team management features that ${seats <= 1 ? 'a solo developer doesn\'t' : 'a 2-person team rarely'} need. Pro at $15/seat covers all individual AI coding features and saves $${round(savings)}/mo.`,
        flag: 'savings',
      };
    }
  }

  // Gemini Advanced for non-research use cases may be unnecessary
  if (tool === 'gemini' && plan.toLowerCase() === 'advanced' && monthlySpend > 0) {
    // Only flag if use case is coding — Gemini Advanced shines for research/writing
    // We don't recommend downgrade for research/data/writing use cases
    // For coding, other tools are typically better
    return null;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Check 3: Alternative tool — cheaper tool for the same use case
// ---------------------------------------------------------------------------

function checkAlternativeTool(
  tool: ToolId,
  plan: string,
  seats: number,
  monthlySpend: number,
  useCase: string,
  displayName: string
): ToolAuditResult | null {
  // Copilot for coding when Cursor Pro is cheaper and more capable
  if (tool === 'copilot' && useCase === 'coding') {
    const copilotPrice = monthlySpend;
    const cursorProPrice = (getPlanPrice('cursor', 'Pro') ?? 20) * seats;
    if (copilotPrice > cursorProPrice) {
      const savings = copilotPrice - cursorProPrice;
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Switch to Cursor Pro',
        recommendedPlan: 'Pro',
        recommendedTool: 'cursor',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `For pure coding, Cursor Pro ($20/seat) provides equivalent AI code completion plus an integrated AI-native editor. Switching from ${displayName} ${plan} saves $${round(savings)}/mo.`,
        flag: 'savings',
      };
    }
  }

  // Claude Pro for coding — Cursor or Windsurf may be better
  if (tool === 'claude' && useCase === 'coding' && plan.toLowerCase() === 'pro') {
    const windPrice = (getPlanPrice('windsurf', 'Pro') ?? 15) * seats;
    if (monthlySpend > windPrice) {
      const savings = monthlySpend - windPrice;
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Consider Windsurf Pro for coding',
        recommendedPlan: 'Pro',
        recommendedTool: 'windsurf',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `For coding-focused work, Windsurf Pro ($15/seat) offers integrated IDE-level AI assistance at a lower price point than Claude Pro ($20/seat). You'd save $${round(savings)}/mo while gaining purpose-built coding features.`,
        flag: 'savings',
      };
    }
  }

  // ChatGPT Plus for coding — could switch to Cursor or Windsurf
  if (tool === 'chatgpt' && useCase === 'coding' && plan.toLowerCase() === 'plus') {
    const windPrice = (getPlanPrice('windsurf', 'Pro') ?? 15) * seats;
    if (monthlySpend > windPrice) {
      const savings = monthlySpend - windPrice;
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Consider Windsurf Pro for coding',
        recommendedPlan: 'Pro',
        recommendedTool: 'windsurf',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `ChatGPT Plus is a general-purpose AI assistant. For dedicated coding, Windsurf Pro ($15/seat) provides IDE-integrated AI with better code context — saving $${round(savings)}/mo.`,
        flag: 'savings',
      };
    }
  }

  // Gemini Advanced for coding — Windsurf Pro is cheaper and purpose-built
  if (tool === 'gemini' && useCase === 'coding' && plan.toLowerCase() === 'advanced') {
    const windPrice = (getPlanPrice('windsurf', 'Pro') ?? 15) * seats;
    if (monthlySpend > windPrice) {
      const savings = monthlySpend - windPrice;
      return {
        tool,
        currentSpend: monthlySpend,
        currentPlan: plan,
        recommendedAction: 'Consider Windsurf Pro for coding',
        recommendedPlan: 'Pro',
        recommendedTool: 'windsurf',
        monthlySavings: round(savings),
        annualSavings: round(savings * 12),
        reason: `Gemini Advanced ($19.99/seat) is powerful for research and writing, but for coding tasks, Windsurf Pro ($15/seat) provides a more integrated AI-coding experience at $${round(savings)}/mo less.`,
        flag: 'savings',
      };
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Cross-tool analysis: detect duplicate coding assistants
// ---------------------------------------------------------------------------

export function checkDuplicates(
  form: FormState,
  existingResults: ToolAuditResult[]
): ToolAuditResult[] {
  const codingTools: ToolId[] = ['cursor', 'copilot', 'windsurf'];
  const duplicates: ToolAuditResult[] = [];

  const activeCodingEntries = form.tools.filter(
    (t) => codingTools.includes(t.tool) && t.useCase === 'coding'
  );

  if (activeCodingEntries.length < 2) return duplicates;

  // Sort by spend descending — recommend dropping the most expensive duplicate
  const sorted = [...activeCodingEntries].sort((a, b) => {
    // Prefer to keep the one with lower per-seat cost
    const aCostPerSeat = a.monthlySpend / Math.max(a.seats, 1);
    const bCostPerSeat = b.monthlySpend / Math.max(b.seats, 1);
    return bCostPerSeat - aCostPerSeat;
  });

  // The most expensive per-seat tool is the candidate for removal
  const toRemove = sorted[0];
  const toKeep = sorted[sorted.length - 1];

  const keepName = getToolDisplayName(toKeep.tool);

  duplicates.push({
    tool: toRemove.tool,
    currentSpend: toRemove.monthlySpend,
    currentPlan: toRemove.plan,
    recommendedAction: `Consolidate — drop in favor of ${keepName}`,
    recommendedTool: toKeep.tool,
    monthlySavings: round(toRemove.monthlySpend),
    annualSavings: round(toRemove.monthlySpend * 12),
    reason: `You're paying for both ${getToolDisplayName(toRemove.tool)} and ${keepName} for coding. These tools have heavily overlapping capabilities (AI code completion, chat, inline edits). Consolidating to ${keepName} eliminates $${toRemove.monthlySpend.toLocaleString()}/mo in redundant spend.`,
    flag: 'savings',
  });

  return duplicates;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
