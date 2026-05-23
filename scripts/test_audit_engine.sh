#!/bin/bash
set -e
echo "Running audit engine tests..."
cd backend
pytest tests/unit/test_audit_engine.py -v
