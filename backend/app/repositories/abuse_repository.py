from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.abuse_log import AbuseLog
import uuid

class AbuseRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, ip_address: str, action: str, description: Optional[str] = None, fingerprint: Optional[str] = None) -> AbuseLog:
        log = AbuseLog(
            id=f"abuse_{uuid.uuid4().hex[:12]}",
            ip_address=ip_address,
            fingerprint=fingerprint,
            action=action,
            description=description
        )
        self.session.add(log)
        await self.session.commit()
        await self.session.refresh(log)
        return log

    async def get_by_ip(self, ip_address: str, limit: int = 10) -> List[AbuseLog]:
        stmt = select(AbuseLog).where(AbuseLog.ip_address == ip_address).order_by(AbuseLog.created_at.desc()).limit(limit)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
