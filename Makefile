.PHONY: dev build start test lint check db

# Development commands
dev:
	cd frontend && npm run dev

build:
	cd frontend && npm run build

start:
	cd frontend && npm start

test:
	cd frontend && npm test

lint:
	cd frontend && npm run lint

# Helper to check if everything is ready for push
check: lint test build
	@echo "All checks passed! Ready for push."

# Run the database schema against Supabase locally using CLI (if installed)
db:
	@echo "Copy contents of database/schema.sql into your Supabase SQL Editor."
