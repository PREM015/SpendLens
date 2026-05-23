from sqlalchemy import Column, String
from app.models.base import Base
from app.models.mixins import TimestampMixin

class AbuseLog(Base, TimestampMixin):
    __tablename__ = "abuse_logs"

    id = Column(String, primary_key=True, index=True)
    ip_address = Column(String, nullable=False, index=True)
    fingerprint = Column(String, nullable=True)
    action = Column(String, nullable=False)
    description = Column(String, nullable=True)
