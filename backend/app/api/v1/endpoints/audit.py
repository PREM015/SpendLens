import uuid
from typing import Dict, Any
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.v1.schemas.audit import FormState, AuditResult
from app.services.audit.audit_engine import run_audit
from app.db.session import get_db
from app.repositories.audit_repo import create_audit

router = APIRouter()

class AuditResponseData(BaseModel):
    auditId: str
    result: AuditResult
    
    class Config:
        populate_by_name = True

class AuditResponse(BaseModel):
    success: bool
    data: AuditResponseData

@router.post("", response_model=AuditResponse)
async def create_audit_endpoint(form_state: FormState, db: AsyncSession = Depends(get_db)):
    try:
        audit_result = run_audit(form_state)
        # Use simple string for UUID since frontend expects it
        import uuid
        audit_id_str = str(uuid.uuid4())
        
        # Save to DB
        await create_audit(
            db=db,
            audit_id=audit_id_str,
            team_size=form_state.team_size,
            use_case=form_state.primary_use_case,
            result_json=audit_result.model_dump()
        )
        
        return AuditResponse(
            success=True,
            data=AuditResponseData(
                auditId=audit_id_str,
                result=audit_result
            )
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
