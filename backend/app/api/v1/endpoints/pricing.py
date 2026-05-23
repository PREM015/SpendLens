from fastapi import APIRouter
from app.api.v1.schemas.pricing import PricingSnapshot, ToolPricingRecord
from app.services.pricing.pricing_loader import PRICING

router = APIRouter()

@router.get("/", response_model=PricingSnapshot)
async def get_pricing():
    records = []
    for tool_id, pricing in PRICING.items():
        for plan in pricing.plans:
            records.append(
                ToolPricingRecord(
                    tool_id=tool_id,
                    plan_name=plan.name,
                    monthly_usd_per_seat=plan.monthly_usd_per_seat,
                    min_seats=plan.min_seats,
                    is_custom=plan.is_custom or False,
                    source_url=plan.source_url,
                    last_verified="2026-05-22"
                )
            )
    return PricingSnapshot(tools=records)
