from typing import Optional
from pydantic import BaseModel, Field
from app.api.v1.schemas.audit import AuditResult

class ShareResponse(BaseModel):
    audit: AuditResult
    token: str
    
class ShareCreate(BaseModel):
    audit: AuditResult
