from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime

ToolId = Literal[
    'cursor', 'copilot', 'claude', 'chatgpt', 
    'anthropic_api', 'openai_api', 'gemini', 'windsurf'
]
UseCase = Literal['coding', 'writing', 'data', 'research', 'mixed']

class ToolEntry(BaseModel):
    id: str
    tool: ToolId
    plan: str
    seats: int = Field(ge=1)
    monthly_spend: float = Field(alias='monthly_spend')
    use_case: UseCase = Field(alias='use_case')
    
    class Config:
        populate_by_name = True

class FormState(BaseModel):
    tools: List[ToolEntry]
    team_size: int = Field(alias='teamSize', ge=1)
    primary_use_case: UseCase = Field(alias='primaryUseCase')
    
    class Config:
        populate_by_name = True

class ToolAuditResult(BaseModel):
    tool: ToolId
    current_spend: float
    current_plan: str
    recommended_action: str
    recommended_plan: Optional[str] = None
    recommended_tool: Optional[ToolId] = None
    monthly_savings: float
    annual_savings: float
    reason: str
    flag: Literal['optimal', 'savings', 'credits']
    
    class Config:
        populate_by_name = True

class AuditResult(BaseModel):
    tools: List[ToolAuditResult]
    monthly_savings: float
    annual_savings: float
    savings_flag: Literal['high', 'low', 'optimal']
    ai_summary: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat(), alias='createdAt')
    
    class Config:
        populate_by_name = True
