from fastapi import HTTPException
from pydantic import BaseModel

def check_honeypot(data: dict, field_name: str = "hp_field") -> bool:
    """
    Check if a honeypot field is filled. 
    If filled, it's likely a bot, so we reject or silently ignore.
    """
    if data.get(field_name):
        raise HTTPException(status_code=400, detail="Invalid request")
    return True
