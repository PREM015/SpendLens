from sqlalchemy.ext.asyncio import create_async_engine

# A basic configuration for connection pooling
# This will be used in db/session.py or db/postgres.py

def create_pool_engine(database_url: str):
    return create_async_engine(
        database_url,
        pool_size=10,
        max_overflow=20,
        pool_timeout=30,
        pool_recycle=1800,
        echo=False
    )
