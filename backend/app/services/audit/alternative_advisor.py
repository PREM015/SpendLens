from typing import Optional, List
from app.api.v1.schemas.audit import ToolAuditResult, FormState
from app.services.pricing.pricing_loader import get_plan_price, get_tool_display_name

def check_alternative_tool(
    tool: str,
    plan: str,
    seats: int,
    monthly_spend: float,
    use_case: str,
    display_name: str
) -> Optional[ToolAuditResult]:
    
    plan_lower = plan.lower()
    
    # Copilot for coding when Cursor Pro is cheaper and more capable
    if tool == 'copilot' and use_case == 'coding':
        cursor_pro_price = (get_plan_price('cursor', 'Pro') or 20.0) * seats
        if monthly_spend > cursor_pro_price:
            savings = monthly_spend - cursor_pro_price
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Switch to Cursor Pro',
                recommended_plan='Pro',
                recommended_tool='cursor',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"For pure coding, Cursor Pro ($20/seat) provides equivalent AI code completion plus an integrated AI-native editor. Switching from {display_name} {plan} saves ${round(savings, 2)}/mo.",
                flag='savings'
            )

    # Claude Pro for coding
    if tool == 'claude' and use_case == 'coding' and plan_lower == 'pro':
        wind_price = (get_plan_price('windsurf', 'Pro') or 15.0) * seats
        if monthly_spend > wind_price:
            savings = monthly_spend - wind_price
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Consider Windsurf Pro for coding',
                recommended_plan='Pro',
                recommended_tool='windsurf',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"For coding-focused work, Windsurf Pro ($15/seat) offers integrated IDE-level AI assistance at a lower price point than Claude Pro ($20/seat). You'd save ${round(savings, 2)}/mo while gaining purpose-built coding features.",
                flag='savings'
            )

    # ChatGPT Plus for coding
    if tool == 'chatgpt' and use_case == 'coding' and plan_lower == 'plus':
        wind_price = (get_plan_price('windsurf', 'Pro') or 15.0) * seats
        if monthly_spend > wind_price:
            savings = monthly_spend - wind_price
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Consider Windsurf Pro for coding',
                recommended_plan='Pro',
                recommended_tool='windsurf',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"ChatGPT Plus is a general-purpose AI assistant. For dedicated coding, Windsurf Pro ($15/seat) provides IDE-integrated AI with better code context — saving ${round(savings, 2)}/mo.",
                flag='savings'
            )

    # Gemini Advanced for coding
    if tool == 'gemini' and use_case == 'coding' and plan_lower == 'advanced':
        wind_price = (get_plan_price('windsurf', 'Pro') or 15.0) * seats
        if monthly_spend > wind_price:
            savings = monthly_spend - wind_price
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Consider Windsurf Pro for coding',
                recommended_plan='Pro',
                recommended_tool='windsurf',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"Gemini Advanced ($19.99/seat) is powerful for research and writing, but for coding tasks, Windsurf Pro ($15/seat) provides a more integrated AI-coding experience at ${round(savings, 2)}/mo less.",
                flag='savings'
            )

    return None

def check_duplicates(form: FormState, existing_results: List[ToolAuditResult]) -> List[ToolAuditResult]:
    coding_tools = ['cursor', 'copilot', 'windsurf']
    duplicates = []
    
    active_coding_entries = [t for t in form.tools if t.tool in coding_tools and t.use_case == 'coding']
    
    if len(active_coding_entries) < 2:
        return duplicates
        
    sorted_entries = sorted(
        active_coding_entries, 
        key=lambda x: x.monthly_spend / max(x.seats, 1), 
        reverse=True
    )
    
    to_remove = sorted_entries[0]
    to_keep = sorted_entries[-1]
    
    keep_name = get_tool_display_name(to_keep.tool)
    remove_name = get_tool_display_name(to_remove.tool)
    
    duplicates.append(ToolAuditResult(
        tool=to_remove.tool,
        current_spend=to_remove.monthly_spend,
        current_plan=to_remove.plan,
        recommended_action=f'Consolidate — drop in favor of {keep_name}',
        recommended_tool=to_keep.tool,
        monthly_savings=round(to_remove.monthly_spend, 2),
        annual_savings=round(to_remove.monthly_spend * 12, 2),
        reason=f"You're paying for both {remove_name} and {keep_name} for coding. These tools have heavily overlapping capabilities (AI code completion, chat, inline edits). Consolidating to {keep_name} eliminates ${to_remove.monthly_spend}/mo in redundant spend.",
        flag='savings'
    ))
    
    return duplicates
