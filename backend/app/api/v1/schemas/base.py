from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BaseSchema(BaseModel):
    class Config:
        from_attributes = True
        populate_by_name = True

class TimestampSchema(BaseSchema):
    created_at: datetime
    updated_at: Optional[datetime] = None
