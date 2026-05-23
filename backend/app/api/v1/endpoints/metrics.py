from fastapi import APIRouter
from app.monitoring.prometheus import get_metrics

router = APIRouter()

@router.get("/")
async def metrics():
    return get_metrics()
