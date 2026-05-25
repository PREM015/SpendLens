import os
import logging
import resend
from app.api.v1.schemas.audit import AuditResult
from app.services.pricing.pricing_loader import get_tool_display_name

logger = logging.getLogger(__name__)

FROM_EMAIL = os.getenv("RESEND_FROM_EMAIL", "SpendLens <audits@spendlens.dev>")
APP_URL = os.getenv("NEXT_PUBLIC_APP_URL", "https://spendlens.dev")

def build_email_html(audit: AuditResult, audit_id: str, share_url: str) -> str:
    tool_rows = []
    for r in audit.tools:
        name = get_tool_display_name(r.tool)
        if r.flag == 'optimal':
            flag_color = '#22c55e'
            flag_label = '✓ Optimal'
        elif r.flag == 'savings':
            flag_color = '#f59e0b'
            flag_label = '⚡ Savings'
        else:
            flag_color = '#6366f1'
            flag_label = '🏷️ Credits'
            
        savings_str = f"-${r.monthly_savings:,.2f}/mo" if r.monthly_savings > 0 else "—"
        savings_color = '#16a34a' if r.monthly_savings > 0 else '#6b7280'
        
        row = f"""
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 8px; font-weight: 500;">{name}</td>
          <td style="padding: 12px 8px;">{r.current_plan}</td>
          <td style="padding: 12px 8px;">${r.current_spend:,.2f}/mo</td>
          <td style="padding: 12px 8px;">{r.recommended_action}</td>
          <td style="padding: 12px 8px; font-weight: 600; color: {savings_color};">
            {savings_str}
          </td>
          <td style="padding: 12px 8px;">
            <span style="background: {flag_color}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
              {flag_label}
            </span>
          </td>
        </tr>"""
        tool_rows.append(row)
        
    tool_rows_html = "".join(tool_rows)
    
    credex_cta = ""
    if audit.savings_flag == 'high':
        credex_cta = f"""
      <div style="margin: 32px 0; padding: 24px; background: #eef2ff; border-radius: 12px; border-left: 4px solid #6366f1;">
        <h3 style="margin: 0 0 8px; color: #4338ca; font-size: 18px;">💰 Unlock Even More Savings with Credex</h3>
        <p style="margin: 0 0 16px; color: #4338ca; font-size: 14px;">
          Your AI spend qualifies for Credex's volume negotiation program. Teams with your spend profile
          typically save an additional 15–30% through vendor-negotiated discounts.
        </p>
        <a href="https://credex.co?ref=spendlens&audit={audit_id}"
           style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
          Talk to Credex →
        </a>
      </div>"""
      
    ai_summary_html = ""
    if audit.ai_summary:
        ai_summary_html = f"""
    <!-- AI Summary -->
    <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px;">
      <h2 style="margin: 0 0 12px; font-size: 16px; color: #111827;">Executive Summary</h2>
      <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">{audit.ai_summary}</p>
    </div>"""

    savings_color = '#16a34a' if audit.annual_savings > 0 else '#6b7280'

    html = f"""
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
      <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">Audit ID: {audit_id}</p>
    </div>

    <!-- Savings Summary -->
    <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 24px;">
      <div style="text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Potential Annual Savings</p>
        <p style="margin: 8px 0 0; font-size: 36px; font-weight: 700; color: {savings_color};">
          ${audit.annual_savings:,.2f}
        </p>
        <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">
          (${audit.monthly_savings:,.2f}/month)
        </p>
      </div>
    </div>

    {ai_summary_html}

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
          {tool_rows_html}
        </tbody>
      </table>
    </div>

    {credex_cta}

    <!-- Share Link -->
    <div style="text-align: center; margin: 32px 0;">
      <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px;">Share this audit with your team:</p>
      <a href="{share_url}" style="color: #4f46e5; font-size: 14px; word-break: break-all;">{share_url}</a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        Generated by <a href="{APP_URL}" style="color: #6366f1; text-decoration: none;">SpendLens</a> — The AI Spend Audit Tool
      </p>
      <p style="color: #9ca3af; font-size: 12px; margin: 4px 0 0;">
        Powered by <a href="https://credex.co" style="color: #6366f1; text-decoration: none;">Credex</a>
      </p>
    </div>
  </div>
</body>
</html>"""
    return html

async def send_audit_email(to_email: str, audit: AuditResult, audit_id: str) -> bool:
    try:
        resend.api_key = os.getenv("RESEND_API_KEY")
        if not resend.api_key:
            logger.error("RESEND_API_KEY is not set.")
            return False
            
        share_url = f"{APP_URL}/audit/{audit_id}"
        html_content = build_email_html(audit, audit_id, share_url)
        
        response = resend.Emails.send({
            "from": FROM_EMAIL,
            "to": to_email,
            "subject": f"Your SpendLens Audit: ${audit.annual_savings:,.2f} in potential annual savings",
            "html": html_content
        })
        
        return True
    except Exception as e:
        logger.error(f"[sendAuditEmail] Failed to send email: {e}")
        return False
