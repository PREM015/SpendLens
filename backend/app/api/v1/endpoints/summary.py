from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.v1.schemas.audit import AuditResult
from app.services.ai.summary_service import generate_summary
from app.db.session import get_db
from app.repositories.audit_repo import get_audit, update_audit_summary

router = APIRouter()

class SummaryRequest(BaseModel):
    audit_id: str = Field(alias='auditId')
    team_size: int = Field(alias='teamSize')
    use_case: str = Field(alias='useCase')

    class Config:
        populate_by_name = True

class SummaryResponseData(BaseModel):
    summary: str

class SummaryResponse(BaseModel):
    success: bool
    data: SummaryResponseData

@router.post("", response_model=SummaryResponse)
async def create_summary(req: SummaryRequest, db: AsyncSession = Depends(get_db)):
    audit_data = await get_audit(db, req.audit_id)
    if not audit_data:
        raise HTTPException(status_code=404, detail="Audit not found")
        
    audit_result = AuditResult(**audit_data)
        
    summary_text = await generate_summary(
        audit=audit_result,
        team_size=req.team_size,
        use_case=req.use_case
    )
    
    # Save the summary back to the audit
    await update_audit_summary(db, req.audit_id, summary_text)
    
    return SummaryResponse(
        success=True,
        data=SummaryResponseData(summary=summary_text)
    )
