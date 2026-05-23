from fastapi import Request, HTTPException
from typing import Optional

def verify_csrf_token(request: Request, csrf_token: Optional[str]) -> bool:
    """
    Very basic CSRF protection check. 
    In a real-world scenario, you would use a robust library.
    """
    if request.method in ["GET", "HEAD", "OPTIONS", "TRACE"]:
        return True
        
    if not csrf_token:
        raise HTTPException(status_code=403, detail="CSRF token missing")
        
    expected_token = request.session.get("csrf_token") if hasattr(request, "session") else None
    if not expected_token or csrf_token != expected_token:
        raise HTTPException(status_code=403, detail="Invalid CSRF token")
        
    return True
