from pydantic import BaseModel
from typing import List, Optional

class ToolPricingRecord(BaseModel):
    tool_id: str
    plan_name: str
    monthly_usd_per_seat: float
    min_seats: Optional[int] = None
    is_custom: bool = False
    source_url: str
    last_verified: str

class PricingSnapshot(BaseModel):
    tools: List[ToolPricingRecord]
