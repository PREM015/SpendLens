from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional

async def create_lead(
    db: AsyncSession, 
    audit_id: str, 
    email: str, 
    company: Optional[str] = None, 
    role: Optional[str] = None, 
    team_size: Optional[int] = None
):
    query = text("""
        INSERT INTO leads (audit_id, email, company, role, team_size)
        VALUES (:audit_id, :email, :company, :role, :team_size)
        ON CONFLICT (email, audit_id) DO NOTHING
    """)
    await db.execute(
        query,
        {
            "audit_id": audit_id,
            "email": email,
            "company": company,
            "role": role,
            "team_size": team_size
        }
    )
    await db.commit()
