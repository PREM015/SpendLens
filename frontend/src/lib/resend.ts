import { Resend } from 'resend';
import type { AuditResult } from '@/types/audit';
import { getToolDisplayName } from './pricing-data';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'SpendLens <audits@spendlens.dev>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://spendlens.dev';

/**
 * Send an audit results email via Resend.
 * Includes savings summary, per-tool breakdown, share link, and Credex CTA for high-savings audits.
 */
export async function sendAuditEmail(
  to: string,
  audit: AuditResult,
  auditId: string
): Promise<boolean> {
  try {
    const shareUrl = `${APP_URL}/audit/${auditId}`;
    const html = buildEmailHtml(audit, auditId, shareUrl);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Your SpendLens Audit: $${audit.totalAnnualSavings.toLocaleString()} in potential annual savings`,
      html,
    });

    if (error) {
      console.error('[sendAuditEmail] Resend API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[sendAuditEmail] Failed to send email:', error);
    return false;
  }
}

function buildEmailHtml(audit: AuditResult, auditId: string, shareUrl: string): string {
  const toolRows = audit.toolResults
    .map((r) => {
      const name = getToolDisplayName(r.tool);
      const flagColor =
        r.flag === 'optimal' ? '#22c55e' : r.flag === 'savings' ? '#f59e0b' : '#6366f1';
      const flagLabel =
        r.flag === 'optimal' ? '✓ Optimal' : r.flag === 'savings' ? '⚡ Savings' : '🏷️ Credits';

      return `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 8px; font-weight: 500;">${name}</td>
          <td style="padding: 12px 8px;">${r.currentPlan}</td>
          <td style="padding: 12px 8px;">$${r.currentSpend.toLocaleString()}/mo</td>
          <td style="padding: 12px 8px;">${r.recommendedAction}</td>
          <td style="padding: 12px 8px; font-weight: 600; color: ${r.monthlySavings > 0 ? '#16a34a' : '#6b7280'};">
            ${r.monthlySavings > 0 ? `-$${r.monthlySavings.toLocaleString()}/mo` : '—'}
          </td>
          <td style="padding: 12px 8px;">
            <span style="background: ${flagColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
              ${flagLabel}
            </span>
          </td>
        </tr>`;
    })
    .join('');

  const credexCta =
    audit.savingsFlag === 'high'
      ? `
      <div style="margin: 32px 0; padding: 24px; background: #eef2ff; border-radius: 12px; border-left: 4px solid #6366f1;">
        <h3 style="margin: 0 0 8px; color: #4338ca; font-size: 18px;">💰 Unlock Even More Savings with Credex</h3>
        <p style="margin: 0 0 16px; color: #4338ca; font-size: 14px;">
          Your AI spend qualifies for Credex's volume negotiation program. Teams with your spend profile
          typically save an additional 15–30% through vendor-negotiated discounts.
        </p>
        <a href="https://credex.co?ref=spendlens&audit=${auditId}"
           style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
          Talk to Credex →
        </a>
      </div>`
      : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb;">
  <div style="max-width: 640px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; font-size: 24px; color: #111827;">SpendLens Audit Results</h1>
      <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">Audit ID: ${auditId}</p>
    </div>

    <!-- Savings Summary -->
    <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px;">
      <div style="text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Potential Annual Savings</p>
        <p style="margin: 8px 0 0; font-size: 36px; font-weight: 700; color: ${audit.totalAnnualSavings > 0 ? '#16a34a' : '#6b7280'};">
          $${audit.totalAnnualSavings.toLocaleString()}
        </p>
        <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">
          ($${audit.totalMonthlySavings.toLocaleString()}/month)
        </p>
      </div>
    </div>

    ${audit.aiSummary ? `
    <!-- AI Summary -->
    <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px;">
      <h2 style="margin: 0 0 12px; font-size: 16px; color: #111827;">Executive Summary</h2>
      <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${audit.aiSummary}</p>
    </div>` : ''}

    <!-- Tool Breakdown -->
    <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px; overflow-x: auto;">
      <h2 style="margin: 0 0 16px; font-size: 16px; color: #111827;">Per-Tool Breakdown</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 2px solid #e5e7eb;">
            <th style="padding: 8px; text-align: left; color: #6b7280; font-weight: 600;">Tool</th>
            <th style="padding: 8px; text-align: left; color: #6b7280; font-weight: 600;">Plan</th>
            <th style="padding: 8px; text-align: left; color: #6b7280; font-weight: 600;">Spend</th>
            <th style="padding: 8px; text-align: left; color: #6b7280; font-weight: 600;">Action</th>
            <th style="padding: 8px; text-align: left; color: #6b7280; font-weight: 600;">Savings</th>
            <th style="padding: 8px; text-align: left; color: #6b7280; font-weight: 600;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${toolRows}
        </tbody>
      </table>
    </div>

    ${credexCta}

    <!-- Share Link -->
    <div style="text-align: center; margin: 32px 0;">
      <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px;">Share this audit with your team:</p>
      <a href="${shareUrl}" style="color: #4f46e5; font-size: 14px; word-break: break-all;">${shareUrl}</a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Generated by <a href="${APP_URL}" style="color: #6366f1; text-decoration: none;">SpendLens</a> — The AI Spend Audit Tool
      </p>
      <p style="color: #9ca3af; font-size: 12px; margin: 4px 0 0;">
        Powered by <a href="https://credex.co" style="color: #6366f1; text-decoration: none;">Credex</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}
