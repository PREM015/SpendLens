from typing import Optional
from app.api.v1.schemas.audit import ToolAuditResult
from app.services.pricing.pricing_loader import get_plan_price

def check_same_vendor_downgrade(
    tool: str,
    plan: str,
    seats: int,
    monthly_spend: float,
    display_name: str
) -> Optional[ToolAuditResult]:
    
    plan_lower = plan.lower()
    
    # Cursor Business -> Pro for small teams
    if tool == 'cursor' and plan_lower == 'business' and seats <= 3:
        pro_price = get_plan_price('cursor', 'Pro') or 20.0
        recommended_spend = pro_price * seats
        savings = monthly_spend - recommended_spend
        if savings > 0:
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Downgrade to Pro plan',
                recommended_plan='Pro',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"Cursor Business ($40/seat) is designed for teams needing centralized billing and admin controls. With only {seats} seats, the Pro plan at $20/seat delivers the same AI features and saves ${round(savings, 2)}/mo.",
                flag='savings'
            )

    # Copilot Enterprise -> Business for teams not needing customization
    if tool == 'copilot' and plan_lower == 'enterprise' and seats <= 10:
        biz_price = get_plan_price('copilot', 'Business') or 19.0
        recommended_spend = biz_price * seats
        savings = monthly_spend - recommended_spend
        if savings > 0:
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Downgrade to Business plan',
                recommended_plan='Business',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"GitHub Copilot Enterprise ($39/seat) includes fine-tuned models and knowledge bases that smaller teams rarely utilize. Business at $19/seat covers code completion, chat, and PR summaries — saving ${round(savings, 2)}/mo.",
                flag='savings'
            )

    # Copilot Business -> Individual for solo developers
    if tool == 'copilot' and plan_lower == 'business' and seats == 1:
        ind_price = get_plan_price('copilot', 'Individual') or 10.0
        savings = monthly_spend - ind_price
        if savings > 0:
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Downgrade to Individual plan',
                recommended_plan='Individual',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"You're paying for Copilot Business ($19/seat) with a single seat. The Individual plan at $10/mo provides the same core code completion and chat features for solo use.",
                flag='savings'
            )

    # Windsurf Teams -> Pro for small teams
    if tool == 'windsurf' and plan_lower == 'teams' and seats <= 2:
        pro_price = get_plan_price('windsurf', 'Pro') or 15.0
        recommended_spend = pro_price * seats
        savings = monthly_spend - recommended_spend
        if savings > 0:
            team_size_desc = "a solo developer doesn't" if seats <= 1 else "a 2-person team rarely"
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Downgrade to Pro plan',
                recommended_plan='Pro',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"Windsurf Teams ($35/seat) includes team management features that {team_size_desc} need. Pro at $15/seat covers all individual AI coding features and saves ${round(savings, 2)}/mo.",
                flag='savings'
            )

    return None
