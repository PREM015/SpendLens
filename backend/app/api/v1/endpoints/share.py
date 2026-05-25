from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.v1.schemas.audit import AuditResult
from app.api.v1.schemas.share import ShareResponse
from app.db.session import get_db
from app.repositories.audit_repo import get_audit

router = APIRouter()

class GenericResponse(BaseModel):
    success: bool
    data: ShareResponse

@router.get("/{token}", response_model=GenericResponse)
async def get_audit_endpoint(token: str, db: AsyncSession = Depends(get_db)):
    audit_data = await get_audit(db, token)
    if not audit_data:
        raise HTTPException(status_code=404, detail="Audit not found")
        
    audit_result = AuditResult(**audit_data)
        
    return GenericResponse(
        success=True,
        data=ShareResponse(
            audit=audit_result,
            token=token
        )
    )
