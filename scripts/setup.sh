#!/bin/bash
set -e

echo "Setting up Credex AI Spend Audit project..."

# Copy env files if not exist
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements-dev.txt
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Setup complete! Run ./scripts/start_dev.sh to start."
