#!/bin/bash
set -e

echo "Starting dev environment..."
docker-compose -f docker-compose.dev.yml up -d
