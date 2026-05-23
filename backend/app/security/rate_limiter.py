from fastapi import Request, HTTPException
import time
from typing import Dict

# Simple in-memory rate limiter for MVP purposes
# In production, use Redis
RATE_LIMITS: Dict[str, list] = {}

def check_rate_limit(request: Request, limit: int = 10, window: int = 3600):
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    
    if client_ip not in RATE_LIMITS:
        RATE_LIMITS[client_ip] = []
        
    requests = RATE_LIMITS[client_ip]
    requests = [req_time for req_time in requests if now - req_time < window]
    
    if len(requests) >= limit:
        raise HTTPException(status_code=429, detail="Too many requests")
        
    requests.append(now)
    RATE_LIMITS[client_ip] = requests
