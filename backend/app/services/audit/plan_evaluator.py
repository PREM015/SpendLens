from typing import Optional
from app.api.v1.schemas.audit import ToolAuditResult
from app.services.pricing.pricing_loader import get_plan_price

def check_plan_fit(
    tool: str,
    plan: str,
    seats: int,
    monthly_spend: float,
    display_name: str
) -> Optional[ToolAuditResult]:
    
    plan_lower = plan.lower()
    
    # Claude Team requires minimum 5 seats
    if tool == 'claude' and plan_lower == 'team' and seats < 5:
        pro_price = get_plan_price('claude', 'Pro') or 20.0
        recommended_spend = pro_price * seats
        savings = monthly_spend - recommended_spend
        if savings > 0:
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Downgrade to individual Pro plans',
                recommended_plan='Pro',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"Claude Team requires a minimum of 5 seats, but you only have {seats}. You're paying for unused capacity. Switching each user to Claude Pro at ${pro_price}/mo saves ${round(savings, 2)}/mo.",
                flag='savings'
            )

    # ChatGPT Team requires minimum 2 seats
    if tool == 'chatgpt' and plan_lower == 'team' and seats < 2:
        plus_price = get_plan_price('chatgpt', 'Plus') or 20.0
        recommended_spend = plus_price * seats
        savings = monthly_spend - recommended_spend
        if savings > 0:
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Downgrade to Plus',
                recommended_plan='Plus',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"ChatGPT Team requires at least 2 seats. With only {seats} user, ChatGPT Plus at ${plus_price}/mo provides equivalent individual features at lower cost.",
                flag='savings'
            )

    # ChatGPT Enterprise without significant team
    if tool == 'chatgpt' and plan_lower == 'enterprise' and seats < 20 and monthly_spend > 0:
        team_price = get_plan_price('chatgpt', 'Team') or 30.0
        recommended_spend = team_price * seats
        savings = monthly_spend - recommended_spend
        if savings > 0:
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Evaluate downgrade to Team plan',
                recommended_plan='Team',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"ChatGPT Enterprise with {seats} seats may be over-provisioned. Unless you require SSO/SCIM and advanced compliance, the Team plan at ${team_price}/seat/mo offers strong value for smaller groups.",
                flag='savings'
            )

    # Claude Max — check if Pro would suffice
    if tool == 'claude' and plan_lower == 'max':
        pro_price = get_plan_price('claude', 'Pro') or 20.0
        recommended_spend = pro_price * seats
        savings = monthly_spend - recommended_spend
        if savings > 0:
            return ToolAuditResult(
                tool=tool,
                current_spend=monthly_spend,
                current_plan=plan,
                recommended_action='Evaluate downgrade to Pro',
                recommended_plan='Pro',
                monthly_savings=round(savings, 2),
                annual_savings=round(savings * 12, 2),
                reason=f"Claude Max at $100/seat/mo is 5× the cost of Pro. Unless your team consistently hits Pro usage limits, downgrading saves ${round(savings, 2)}/mo without losing access to the same models.",
                flag='savings'
            )

    return None
