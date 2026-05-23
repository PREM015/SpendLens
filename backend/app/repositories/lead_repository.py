import uuid
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.lead import Lead

class LeadRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_lead(self, email: str, **kwargs) -> Lead:
        lead = Lead(email=email, **kwargs)
        self.session.add(lead)
        await self.session.flush()
        return lead

    async def get_lead_by_email(self, email: str) -> Optional[Lead]:
        stmt = select(Lead).where(Lead.email == email)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_lead(self, lead_id: uuid.UUID) -> Optional[Lead]:
        stmt = select(Lead).where(Lead.id == lead_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
