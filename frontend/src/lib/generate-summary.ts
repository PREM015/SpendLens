import Anthropic from '@anthropic-ai/sdk';
import type { AuditResult } from '@/types/audit';
import { getToolDisplayName } from './pricing-data';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? '',
});

/**
 * Generate an AI-powered executive summary for the audit using Claude claude-sonnet-4-20250514.
 * Falls back to a template-based summary if the API call fails.
 */
export async function generateSummary(
  audit: AuditResult,
  teamSize: number,
  useCase: string
): Promise<string> {
  try {
    const toolBreakdown = audit.toolResults
      .map((r) => {
        const name = getToolDisplayName(r.tool);
        const action = r.recommendedAction;
        const savings = r.monthlySavings;
        return `- ${name} (${r.currentPlan}): ${action}. Monthly savings: $${savings}`;
      })
      .join('\n');

    const userMessage = `
Audit Summary Data:
- Team size: ${teamSize}
- Primary use case: ${useCase}
- Total monthly savings identified: $${audit.totalMonthlySavings}
- Total annual savings identified: $${audit.totalAnnualSavings}
- Savings level: ${audit.savingsFlag}
- Number of tools audited: ${audit.toolResults.length}

Per-tool breakdown:
${toolBreakdown}
`.trim();

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: `You are a senior engineering manager writing a concise AI spend audit summary. Write in the second person ("you", "your"). Be direct, specific, and finance-literate. Reference exact dollar amounts. The summary must be 90–110 words. Do not use bullet points — write in flowing prose. Do not include a greeting or sign-off. Focus on the biggest savings opportunity first, then mention secondary findings. End with a forward-looking recommendation.`,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    if (textBlock && textBlock.type === 'text') {
      return textBlock.text.trim();
    }

    return buildTemplateSummary(audit);
  } catch (error) {
    console.error('[generateSummary] Claude API call failed, using fallback:', error);
    return buildTemplateSummary(audit);
  }
}

/**
 * Template-based fallback summary when Claude API is unavailable.
 */
export function buildTemplateSummary(audit: AuditResult): string {
  const { totalMonthlySavings, totalAnnualSavings, toolResults, savingsFlag } = audit;

  const savingsTools = toolResults.filter((r) => r.monthlySavings > 0);
  const optimalTools = toolResults.filter((r) => r.flag === 'optimal');

  if (savingsTools.length === 0) {
    return `Your current AI tool stack is well-optimized. All ${toolResults.length} tools are appropriately matched to your team size and use case. No immediate changes are recommended. Consider revisiting this audit quarterly as your team grows or as vendors update their pricing tiers.`;
  }

  const topSaving = savingsTools.sort((a, b) => b.monthlySavings - a.monthlySavings)[0];
  const topToolName = getToolDisplayName(topSaving.tool);

  let summary = `Your audit identified $${totalMonthlySavings.toLocaleString()} in potential monthly savings ($${totalAnnualSavings.toLocaleString()} annually) across ${savingsTools.length} of your ${toolResults.length} AI tool subscriptions.`;

  summary += ` The largest opportunity is ${topToolName}: ${topSaving.recommendedAction.toLowerCase()}, which alone saves $${topSaving.monthlySavings}/mo.`;

  if (optimalTools.length > 0) {
    summary += ` ${optimalTools.length} tool${optimalTools.length > 1 ? 's are' : ' is'} already optimally configured.`;
  }

  if (savingsFlag === 'high') {
    summary += ` With savings of this magnitude, we recommend implementing these changes within the current billing cycle to maximize recovery.`;
  } else {
    summary += ` We recommend reviewing these recommendations with your team lead before the next renewal date.`;
  }

  return summary;
}
