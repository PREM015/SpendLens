from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.tool_pricing import ToolPricing

class PricingRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_pricing_by_tool_name(self, tool_name: str) -> Optional[ToolPricing]:
        stmt = select(ToolPricing).where(ToolPricing.tool_name == tool_name)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def create_pricing(self, tool_name: str, **kwargs) -> ToolPricing:
        pricing = ToolPricing(tool_name=tool_name, **kwargs)
        self.session.add(pricing)
        await self.session.flush()
        return pricing
        
    async def list_pricings(self) -> List[ToolPricing]:
        stmt = select(ToolPricing)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
