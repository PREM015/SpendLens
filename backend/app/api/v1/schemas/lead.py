from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class LeadFormData(BaseModel):
    audit_id: str = Field(alias='auditId')
    email: EmailStr
    company: Optional[str] = None
    role: Optional[str] = None
    team_size: Optional[int] = Field(None, alias='teamSize')
    website: Optional[str] = None

    class Config:
        populate_by_name = True

class LeadResponse(BaseModel):
    success: bool
    message: str
