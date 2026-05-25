import json
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, Optional

async def create_audit(
    db: AsyncSession, 
    audit_id: str, 
    team_size: int, 
    use_case: str, 
    result_json: Dict[str, Any], 
    ai_summary: Optional[str] = None
):
    query = text("""
        INSERT INTO audits (id, team_size, use_case, result, ai_summary)
        VALUES (:id, :team_size, :use_case, :result, :ai_summary)
    """)
    await db.execute(
        query,
        {
            "id": audit_id,
            "team_size": team_size,
            "use_case": use_case,
            "result": json.dumps(result_json),
            "ai_summary": ai_summary
        }
    )
    await db.commit()

async def get_audit(db: AsyncSession, audit_id: str) -> Optional[Dict[str, Any]]:
    query = text("SELECT result, ai_summary FROM audits WHERE id = :id")
    result = await db.execute(query, {"id": audit_id})
    row = result.fetchone()
    if row:
        audit_result = row.result
        if isinstance(audit_result, str):
            audit_result = json.loads(audit_result)
        audit_result["ai_summary"] = row.ai_summary
        return audit_result
    return None

async def update_audit_summary(db: AsyncSession, audit_id: str, summary: str):
    query = text("UPDATE audits SET ai_summary = :summary WHERE id = :id")
    await db.execute(query, {"summary": summary, "id": audit_id})
    await db.commit()
