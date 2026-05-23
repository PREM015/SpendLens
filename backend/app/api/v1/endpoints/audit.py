import uuid
from typing import Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.api.v1.schemas.audit import FormState, AuditResult
from app.services.audit.audit_engine import run_audit

router = APIRouter()

# In-memory storage for audits since DB is not specified in requirements
AUDITS_DB: Dict[str, AuditResult] = {}

class AuditResponseData(BaseModel):
    auditId: str
    result: AuditResult
    
    class Config:
        populate_by_name = True

class AuditResponse(BaseModel):
    success: bool
    data: AuditResponseData

@router.post("", response_model=AuditResponse)
async def create_audit(form_state: FormState):
    try:
        audit_result = run_audit(form_state)
        audit_id = f"aud_{uuid.uuid4().hex[:12]}"
        
        # Save to DB
        AUDITS_DB[audit_id] = audit_result
        
        return AuditResponse(
            success=True,
            data=AuditResponseData(
                auditId=audit_id,
                result=audit_result
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
