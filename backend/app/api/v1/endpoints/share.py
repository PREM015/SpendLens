from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.api.v1.schemas.audit import AuditResult
from app.api.v1.schemas.share import ShareResponse
from app.api.v1.endpoints.audit import AUDITS_DB

router = APIRouter()

class GenericResponse(BaseModel):
    success: bool
    data: ShareResponse

@router.get("/{token}", response_model=GenericResponse)
async def get_audit(token: str):
    audit_result = AUDITS_DB.get(token)
    if not audit_result:
        raise HTTPException(status_code=404, detail="Audit not found")
        
    return GenericResponse(
        success=True,
        data=ShareResponse(
            audit=audit_result,
            token=token
        )
    )
