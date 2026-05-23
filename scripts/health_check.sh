#!/bin/bash
echo "Running health check..."
curl -f http://localhost:8000/api/v1/health || exit 1
echo "System healthy."
