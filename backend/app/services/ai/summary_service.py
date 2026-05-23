import os
import logging
from anthropic import Anthropic
from app.api.v1.schemas.audit import AuditResult
from app.services.pricing.pricing_loader import get_tool_display_name

logger = logging.getLogger(__name__)

def build_template_summary(audit: AuditResult) -> str:
    savings_tools = [r for r in audit.tool_results if r.monthly_savings > 0]
    optimal_tools = [r for r in audit.tool_results if r.flag == 'optimal']
    
    if not savings_tools:
        return f"Your current AI tool stack is well-optimized. All {len(audit.tool_results)} tools are appropriately matched to your team size and use case. No immediate changes are recommended. Consider revisiting this audit quarterly as your team grows or as vendors update their pricing tiers."
        
    top_saving = sorted(savings_tools, key=lambda x: x.monthly_savings, reverse=True)[0]
    top_tool_name = get_tool_display_name(top_saving.tool)
    
    summary = f"Your audit identified ${audit.total_monthly_savings:,.2f} in potential monthly savings (${audit.total_annual_savings:,.2f} annually) across {len(savings_tools)} of your {len(audit.tool_results)} AI tool subscriptions."
    summary += f" The largest opportunity is {top_tool_name}: {top_saving.recommended_action.lower()}, which alone saves ${top_saving.monthly_savings}/mo."
    
    if optimal_tools:
        plural = "s are" if len(optimal_tools) > 1 else " is"
        summary += f" {len(optimal_tools)} tool{plural} already optimally configured."
        
    if audit.savings_flag == 'high':
        summary += " With savings of this magnitude, we recommend implementing these changes within the current billing cycle to maximize recovery."
    else:
        summary += " We recommend reviewing these recommendations with your team lead before the next renewal date."
        
    return summary

async def generate_summary(audit: AuditResult, team_size: int, use_case: str) -> str:
    try:
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            return build_template_summary(audit)
            
        client = Anthropic(api_key=api_key)
        
        tool_breakdown = "\n".join([
            f"- {get_tool_display_name(r.tool)} ({r.current_plan}): {r.recommended_action}. Monthly savings: ${r.monthly_savings}"
            for r in audit.tool_results
        ])
        
        user_message = f"""
Audit Summary Data:
- Team size: {team_size}
- Primary use case: {use_case}
- Total monthly savings identified: ${audit.total_monthly_savings}
- Total annual savings identified: ${audit.total_annual_savings}
- Savings level: {audit.savings_flag}
- Number of tools audited: {len(audit.tool_results)}

Per-tool breakdown:
{tool_breakdown}
""".strip()

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=300,
            system="You are a senior engineering manager writing a concise AI spend audit summary. Write in the second person (\"you\", \"your\"). Be direct, specific, and finance-literate. Reference exact dollar amounts. The summary must be 90–110 words. Do not use bullet points — write in flowing prose. Do not include a greeting or sign-off. Focus on the biggest savings opportunity first, then mention secondary findings. End with a forward-looking recommendation.",
            messages=[
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )
        
        for block in response.content:
            if block.type == "text":
                return block.text.strip()
                
        return build_template_summary(audit)
        
    except Exception as e:
        logger.error(f"[generateSummary] Claude API call failed, using fallback: {e}")
        return build_template_summary(audit)
