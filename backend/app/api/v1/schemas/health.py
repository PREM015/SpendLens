from pydantic import BaseModel

class ServiceStatus(BaseModel):
    status: str
    message: str

class HealthResponse(BaseModel):
    status: str
    version: str
    database: ServiceStatus
    redis: ServiceStatus
    anthropic: ServiceStatus
