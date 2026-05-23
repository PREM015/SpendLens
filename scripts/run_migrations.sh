#!/bin/bash
set -e
echo "Running migrations..."
cd backend
alembic upgrade head
