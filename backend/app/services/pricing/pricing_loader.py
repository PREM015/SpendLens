from typing import List, Dict, Optional
from pydantic import BaseModel

class PlanInfo(BaseModel):
    name: str
    monthly_usd_per_seat: float
    min_seats: Optional[int] = None
    is_custom: Optional[bool] = False
    is_pay_per_token: Optional[bool] = False
    source_url: str

class ToolPricing(BaseModel):
    display_name: str
    plans: List[PlanInfo]

PRICING: Dict[str, ToolPricing] = {
    "cursor": ToolPricing(
        display_name="Cursor",
        plans=[
            PlanInfo(name="Hobby", monthly_usd_per_seat=0, source_url="https://www.cursor.com/pricing"),
            PlanInfo(name="Pro", monthly_usd_per_seat=20, source_url="https://www.cursor.com/pricing"),
            PlanInfo(name="Business", monthly_usd_per_seat=40, source_url="https://www.cursor.com/pricing"),
        ]
    ),
    "copilot": ToolPricing(
        display_name="GitHub Copilot",
        plans=[
            PlanInfo(name="Individual", monthly_usd_per_seat=10, source_url="https://github.com/features/copilot#pricing"),
            PlanInfo(name="Business", monthly_usd_per_seat=19, source_url="https://github.com/features/copilot#pricing"),
            PlanInfo(name="Enterprise", monthly_usd_per_seat=39, source_url="https://github.com/features/copilot#pricing"),
        ]
    ),
    "claude": ToolPricing(
        display_name="Claude",
        plans=[
            PlanInfo(name="Free", monthly_usd_per_seat=0, source_url="https://www.anthropic.com/pricing"),
            PlanInfo(name="Pro", monthly_usd_per_seat=20, source_url="https://www.anthropic.com/pricing"),
            PlanInfo(name="Max", monthly_usd_per_seat=100, source_url="https://www.anthropic.com/pricing"),
            PlanInfo(name="Team", monthly_usd_per_seat=30, min_seats=5, source_url="https://www.anthropic.com/pricing"),
        ]
    ),
    "chatgpt": ToolPricing(
        display_name="ChatGPT",
        plans=[
            PlanInfo(name="Free", monthly_usd_per_seat=0, source_url="https://openai.com/chatgpt/pricing/"),
            PlanInfo(name="Plus", monthly_usd_per_seat=20, source_url="https://openai.com/chatgpt/pricing/"),
            PlanInfo(name="Team", monthly_usd_per_seat=30, min_seats=2, source_url="https://openai.com/chatgpt/pricing/"),
            PlanInfo(name="Enterprise", monthly_usd_per_seat=0, is_custom=True, source_url="https://openai.com/chatgpt/pricing/"),
        ]
    ),
    "anthropic_api": ToolPricing(
        display_name="Anthropic API",
        plans=[
            PlanInfo(name="Pay-per-token", monthly_usd_per_seat=0, is_pay_per_token=True, source_url="https://www.anthropic.com/pricing#702702"),
        ]
    ),
    "openai_api": ToolPricing(
        display_name="OpenAI API",
        plans=[
            PlanInfo(name="Pay-per-token", monthly_usd_per_seat=0, is_pay_per_token=True, source_url="https://openai.com/api/pricing/"),
        ]
    ),
    "gemini": ToolPricing(
        display_name="Google Gemini",
        plans=[
            PlanInfo(name="Free", monthly_usd_per_seat=0, source_url="https://gemini.google.com/"),
            PlanInfo(name="Advanced", monthly_usd_per_seat=19.99, source_url="https://one.google.com/about/ai-premium"),
        ]
    ),
    "windsurf": ToolPricing(
        display_name="Windsurf",
        plans=[
            PlanInfo(name="Free", monthly_usd_per_seat=0, source_url="https://windsurf.com/pricing"),
            PlanInfo(name="Pro", monthly_usd_per_seat=15, source_url="https://windsurf.com/pricing"),
            PlanInfo(name="Teams", monthly_usd_per_seat=35, source_url="https://windsurf.com/pricing"),
        ]
    ),
}

def get_tool_plans(tool_id: str) -> List[PlanInfo]:
    if tool_id not in PRICING:
        return []
    return PRICING[tool_id].plans

def get_plan_price(tool_id: str, plan_name: str) -> Optional[float]:
    plans = get_tool_plans(tool_id)
    for plan in plans:
        if plan.name.lower() == plan_name.lower():
            return plan.monthly_usd_per_seat
    return None

def get_tool_display_name(tool_id: str) -> str:
    if tool_id not in PRICING:
        return tool_id
    return PRICING[tool_id].display_name
