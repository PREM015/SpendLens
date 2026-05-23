#!/bin/bash
set -e

# Basic healthcheck for the container
curl -f http://localhost:8000/api/v1/health || exit 1
