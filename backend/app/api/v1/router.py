from fastapi import APIRouter
from app.api.v1.endpoints import audit, lead, share, summary

api_router = APIRouter()

api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(lead.router, prefix="/lead", tags=["lead"])
api_router.include_router(share.router, prefix="/share", tags=["share"])
api_router.include_router(summary.router, prefix="/summary", tags=["summary"])
