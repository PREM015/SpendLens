import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.base import Base
from app.db.postgres import engine

logger = logging.getLogger(__name__)

async def init_db() -> None:
    # Tables should ideally be created using Alembic migrations
    # This is a fallback or for simple setups
    try:
        async with engine.begin() as conn:
            # Uncomment if you want to auto-create
            # await conn.run_sync(Base.metadata.create_all)
            pass
        logger.info("Database initialized.")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise
