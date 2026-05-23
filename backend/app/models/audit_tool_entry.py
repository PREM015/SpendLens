from sqlalchemy import Column, String, Integer, Float, ForeignKey
from app.models.base import Base
from app.models.mixins import TimestampMixin

class AuditToolEntry(Base, TimestampMixin):
    __tablename__ = "audit_tool_entries"

    id = Column(String, primary_key=True, index=True)
    audit_id = Column(String, ForeignKey("audits.id"), nullable=False, index=True)
    tool = Column(String, nullable=False)
    current_plan = Column(String, nullable=False)
    current_spend = Column(Float, nullable=False)
    seats = Column(Integer, nullable=False)
    use_case = Column(String, nullable=False)
    
    recommended_action = Column(String, nullable=False)
    recommended_plan = Column(String, nullable=True)
    recommended_tool = Column(String, nullable=True)
    monthly_savings = Column(Float, nullable=False, default=0.0)
    annual_savings = Column(Float, nullable=False, default=0.0)
    reason = Column(String, nullable=False)
    flag = Column(String, nullable=False)
