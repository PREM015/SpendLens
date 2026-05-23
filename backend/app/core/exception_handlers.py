from fastapi import Request, FastAPI
from fastapi.responses import JSONResponse
from .exceptions import NotFoundException, AlreadyExistsException, ValidationException


def add_exception_handlers(app: FastAPI):
    @app.exception_handler(NotFoundException)
    async def not_found_exception_handler(request: Request, exc: NotFoundException):
        return JSONResponse(
            status_code=404,
            content={"detail": str(exc)},
        )

    @app.exception_handler(AlreadyExistsException)
    async def already_exists_exception_handler(request: Request, exc: AlreadyExistsException):
        return JSONResponse(
            status_code=409,
            content={"detail": str(exc)},
        )

    @app.exception_handler(ValidationException)
    async def validation_exception_handler(request: Request, exc: ValidationException):
        return JSONResponse(
            status_code=422,
            content={"detail": str(exc)},
        )
