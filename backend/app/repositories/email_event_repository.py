from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.email_event import EmailEvent
import uuid

class EmailEventRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, lead_id: str, event_type: str, status: str, provider_id: Optional[str] = None) -> EmailEvent:
        event = EmailEvent(
            id=f"evt_{uuid.uuid4().hex[:12]}",
            lead_id=lead_id,
            event_type=event_type,
            status=status,
            provider_id=provider_id
        )
        self.session.add(event)
        await self.session.commit()
        await self.session.refresh(event)
        return event

    async def get_by_lead_id(self, lead_id: str) -> List[EmailEvent]:
        stmt = select(EmailEvent).where(EmailEvent.lead_id == lead_id).order_by(EmailEvent.created_at.desc())
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
