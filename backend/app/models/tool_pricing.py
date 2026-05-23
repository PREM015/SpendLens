from typing import Optional
from sqlalchemy import String, Float, Boolean, Text
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base, TimestampMixin, UUIDMixin

class ToolPricing(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "tool_pricing"

    tool_name: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    base_price_monthly: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    price_per_user_monthly: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    has_free_tier: Mapped[bool] = mapped_column(Boolean, default=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
