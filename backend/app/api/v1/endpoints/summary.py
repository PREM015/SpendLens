from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.api.v1.schemas.audit import AuditResult
from app.services.ai.summary_service import generate_summary
from app.api.v1.endpoints.audit import AUDITS_DB

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
async def create_summary(req: SummaryRequest):
    audit_result = AUDITS_DB.get(req.audit_id)
    if not audit_result:
        raise HTTPException(status_code=404, detail="Audit not found")
        
    summary_text = await generate_summary(
        audit=audit_result,
        team_size=req.team_size,
        use_case=req.use_case
    )
    
    # Save the summary back to the audit
    audit_result.ai_summary = summary_text
    AUDITS_DB[req.audit_id] = audit_result
    
    return SummaryResponse(
        success=True,
        data=SummaryResponseData(summary=summary_text)
    )
