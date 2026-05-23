import uuid
import hmac
import hashlib
import os

SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-for-dev-only")

def generate_share_token(audit_id: str) -> str:
    # A simple way to create an unguessable token
    unique_id = uuid.uuid4().hex
    msg = f"{audit_id}:{unique_id}".encode()
    sig = hmac.new(SECRET_KEY.encode(), msg, hashlib.sha256).hexdigest()[:16]
    return f"{unique_id}{sig}"
