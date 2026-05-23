from typing import List, Optional
import uuid
from sqlalchemy import String, ForeignKey, Float, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, TimestampMixin, UUIDMixin

class Audit(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "audits"

    user_id: Mapped[uuid.UUID] = mapped_column(index=True)
    status: Mapped[str] = mapped_column(String(50), default="pending")
    total_spend: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    report_data: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)

    tool_entries: Mapped[List["AuditToolEntry"]] = relationship(
        "AuditToolEntry", back_populates="audit", cascade="all, delete-orphan"
    )

class AuditToolEntry(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "audit_tool_entries"

    audit_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("audits.id", ondelete="CASCADE"))
    tool_name: Mapped[str] = mapped_column(String(255))
    category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    monthly_cost: Mapped[float] = mapped_column(Float, default=0.0)
    user_count: Mapped[int] = mapped_column(Integer, default=1)
    detected_via: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)

    audit: Mapped["Audit"] = relationship("Audit", back_populates="tool_entries")
