from fastapi import APIRouter
from app.api.v1.schemas.health import HealthResponse, ServiceStatus

router = APIRouter()

@router.get("/", response_model=HealthResponse)
async def get_health():
    # In a real app, you would check actual connections here
    return HealthResponse(
        status="ok",
        version="0.1.0",
        database=ServiceStatus(status="ok", message="Connected"),
        redis=ServiceStatus(status="ok", message="Connected"),
        anthropic=ServiceStatus(status="ok", message="Connected")
    )
