#!/bin/bash
set -e
echo "Rolling back last migration..."
cd backend
alembic downgrade -1
