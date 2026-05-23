from sqlalchemy import Column, String, ForeignKey
from app.models.base import Base
from app.models.mixins import TimestampMixin

class EmailEvent(Base, TimestampMixin):
    __tablename__ = "email_events"

    id = Column(String, primary_key=True, index=True)
    lead_id = Column(String, ForeignKey("leads.id"), nullable=False, index=True)
    event_type = Column(String, nullable=False)
    provider_id = Column(String, nullable=True)
    status = Column(String, nullable=False)
