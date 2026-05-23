import uuid
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.audit import Audit, AuditToolEntry
from app.core.exceptions import NotFoundException

class AuditRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create_audit(self, user_id: uuid.UUID) -> Audit:
        audit = Audit(user_id=user_id)
        self.session.add(audit)
        await self.session.flush()
        return audit

    async def get_audit(self, audit_id: uuid.UUID) -> Optional[Audit]:
        stmt = select(Audit).where(Audit.id == audit_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def update_audit(self, audit: Audit) -> Audit:
        self.session.add(audit)
        await self.session.flush()
        return audit

    async def add_tool_entry(self, audit_id: uuid.UUID, tool_name: str, monthly_cost: float, user_count: int = 1, category: Optional[str] = None) -> AuditToolEntry:
        entry = AuditToolEntry(
            audit_id=audit_id,
            tool_name=tool_name,
            monthly_cost=monthly_cost,
            user_count=user_count,
            category=category
        )
        self.session.add(entry)
        await self.session.flush()
        return entry
        
    async def get_tool_entries(self, audit_id: uuid.UUID) -> List[AuditToolEntry]:
        stmt = select(AuditToolEntry).where(AuditToolEntry.audit_id == audit_id)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
