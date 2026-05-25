from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.v1.schemas.lead import LeadFormData, LeadResponse
from app.api.v1.schemas.audit import AuditResult
from app.services.email.email_service import send_audit_email
from app.db.session import get_db
from app.repositories.audit_repo import get_audit
from app.repositories.lead_repo import create_lead

router = APIRouter()

@router.post("", response_model=LeadResponse)
async def capture_lead(lead_data: LeadFormData, db: AsyncSession = Depends(get_db)):
    audit_data = await get_audit(db, lead_data.audit_id)
    if not audit_data:
        raise HTTPException(status_code=404, detail="Audit not found")
        
    audit_result = AuditResult(**audit_data)
        
    # Save lead info to DB
    await create_lead(
        db=db,
        audit_id=lead_data.audit_id,
        email=lead_data.email,
        company=lead_data.company,
        role=lead_data.role,
        team_size=lead_data.team_size
    )
    
    # Send email
    success = await send_audit_email(
        to_email=lead_data.email,
        audit=audit_result,
        audit_id=lead_data.audit_id
    )
    
    if not success:
        return LeadResponse(
            success=False,
            message="Lead captured but failed to send email."
        )
        
    return LeadResponse(
        success=True,
        message="Email sent successfully."
    )
