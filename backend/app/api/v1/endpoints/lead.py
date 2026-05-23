from fastapi import APIRouter, HTTPException
from app.api.v1.schemas.lead import LeadFormData, LeadResponse
from app.api.v1.endpoints.audit import AUDITS_DB
from app.services.email.email_service import send_audit_email

router = APIRouter()

@router.post("", response_model=LeadResponse)
async def capture_lead(lead_data: LeadFormData):
    audit_result = AUDITS_DB.get(lead_data.audit_id)
    if not audit_result:
        raise HTTPException(status_code=404, detail="Audit not found")
        
    # In a real app, save lead info to DB
    
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
