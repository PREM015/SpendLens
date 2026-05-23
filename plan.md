## 📋 FILE IMPLEMENTATION CHECKLIST

---

# PHASE 0 — ROOT LEVEL & GITHUB CONFIGURATION (Priority: CRITICAL)

## Root Level Configuration Files

- [ ] `.editorconfig` — Editor configuration standards
- [ ] `.env` — Production environment variables
- [ ] `.env.development` — Development environment variables
- [ ] `.env.example` — Environment variables template (committed to repo)
- [ ] `.env.production` — Production secrets (never committed)
- [ ] `.env.staging` — Staging environment config
- [ ] `.gitattributes` — Git attributes configuration
- [ ] `.gitignore` — Git ignore rules (env files, node_modules, dist, .next)
- [ ] `.nvmrc` — Node version specification (20.x LTS)
- [ ] `.pre-commit-config.yaml` — Pre-commit hook configuration (lint, type-check)

## Root Level Documentation (Required by Credex)

- [ ] `README.md` — Project overview, screenshots/Loom, quick start, Decisions section, deployed URL
- [ ] `ARCHITECTURE.md` — Mermaid system diagram, data flow, stack rationale, 10k audit/day scaling plan
- [ ] `DEVLOG.md` — 7 dated daily entries (exact format required: Hours, What I did, Learned, Blockers, Plan)
- [ ] `REFLECTION.md` — 5 questions answered, 150–400 words each
- [ ] `TESTS.md` — List of all automated tests, filenames, coverage, how to run
- [ ] `PRICING_DATA.md` — Every pricing number with official vendor URL + verification date
- [ ] `PROMPTS.md` — Full LLM prompts used, rationale, what didn't work
- [ ] `GTM.md` — Go-to-market plan: target user, channels, first 100 users, unfair distribution
- [ ] `ECONOMICS.md` — Unit economics: lead value, CAC, conversion funnel, $1M ARR math
- [ ] `USER_INTERVIEWS.md` — 3 real user interview notes (name/initials, quotes, surprises, design changes)
- [ ] `LANDING_COPY.md` — Hero headline, subheadline, CTA, social proof, 5 FAQ Q&As
- [ ] `METRICS.md` — North Star metric, 3 input metrics, instrumentation plan, pivot trigger
- [ ] `CHANGELOG.md` — Version history and changes
- [ ] `CONTRIBUTING.md` — Contribution guidelines
- [ ] `LICENSE` — MIT License
- [ ] `Makefile` — Development command shortcuts (dev, build, test, lint, deploy)
- [ ] `SpendAI_Project_Report.md` — Final project report

## Docker Configuration

- [ ] `docker-compose.yml` — Production composition (app + postgres + redis)
- [ ] `docker-compose.dev.yml` — Development composition with hot reload
- [ ] `docker-compose.test.yml` — Testing composition with isolated DB

## GitHub Configuration

- [ ] `.github/ISSUE_TEMPLATE/bug_report.md` — Bug report template
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md` — Feature request template
- [ ] `.github/workflows/ci.yml` — CI pipeline: lint + typecheck + test on every push to main (REQUIRED — must show green)
- [ ] `.github/workflows/deploy-prod.yml` — Production deployment to Vercel/Netlify on merge to main
- [ ] `.github/workflows/deploy-staging.yml` — Staging deployment on PR open

## Husky Git Hooks

- [ ] `.husky/pre-commit` — Run ESLint + Prettier check before commit
- [ ] `.husky/pre-push` — Run full test suite before push

## VS Code Configuration

- [ ] `.vscode/extensions.json` — Recommended extensions (ESLint, Prettier, Tailwind IntelliSense)
- [ ] `.vscode/launch.json` — Debug configuration for Next.js

---

# PHASE 1 — BACKEND ROOT CONFIGURATION (Priority: CRITICAL)

## Backend Root Files

- [ ] `backend/pyproject.toml` — Python project configuration (FastAPI + SQLAlchemy + Pydantic v2)
- [ ] `backend/requirements.txt` — Production dependencies
- [ ] `backend/requirements-dev.txt` — Development dependencies (pytest, black, ruff, mypy)
- [ ] `backend/.env` — Backend environment variables (never committed)
- [ ] `backend/.env.example` — Backend env template (committed)
- [ ] `backend/alembic.ini` — Alembic migration configuration
- [ ] `backend/logging.yaml` — Structured JSON logging configuration
- [ ] `backend/Dockerfile` — Production container image (python:3.12-slim)
- [ ] `backend/Dockerfile.dev` — Development container image with reload

## Backend Main Application

- [ ] `backend/app/__init__.py` — App package initialization
- [ ] `backend/app/main.py` — FastAPI application entry point with lifespan, CORS, middleware
- [ ] `backend/app/config.py` — Application configuration (Pydantic BaseSettings)
- [ ] `backend/app/dependencies.py` — Dependency injection: DB session, rate limiter, auth

---

# PHASE 2 — BACKEND CORE INFRASTRUCTURE (Priority: CRITICAL)

## Core Module

- [ ] `backend/app/core/__init__.py` — Core package initialization
- [ ] `backend/app/core/constants.py` — Global constants (tool names, plan names, savings thresholds)
- [ ] `backend/app/core/cors_config.py` — CORS configuration (allow frontend origins)
- [ ] `backend/app/core/exceptions.py` — Custom exception classes (AuditNotFound, LeadAlreadyExists)
- [ ] `backend/app/core/exception_handlers.py` — FastAPI exception handlers returning JSON errors
- [ ] `backend/app/core/logging_config.py` — Structured logging setup (JSON format for prod)
- [ ] `backend/app/core/middleware.py` — Request ID, timing, and security headers middleware
- [ ] `backend/app/core/rate_limiter.py` — Rate limiting logic (SlowAPI or custom Redis-backed)
- [ ] `backend/app/core/request_id.py` — Request ID tracking via header injection
- [ ] `backend/app/core/sanitizer.py` — Input sanitization (strip XSS, validate emails)
- [ ] `backend/app/core/security.py` — HMAC audit token generation and verification
- [ ] `backend/app/core/settings.py` — Pydantic settings with env validation
- [ ] `backend/app/core/validators.py` — Custom validators (valid email, spend range checks)

## Lib Module

- [ ] `backend/app/lib/__init__.py` — Lib package initialization
- [ ] `backend/app/lib/api_client.py` — HTTP client wrapper (httpx async with retries)
- [ ] `backend/app/lib/logger.py` — Structured logger singleton
- [ ] `backend/app/lib/retry.py` — Exponential backoff retry decorator for Anthropic API calls
- [ ] `backend/app/lib/sanitizer.py` — Data sanitization (strip PII from public audit payloads)
- [ ] `backend/app/lib/validators.py` — Validation helpers (tool/plan combo validity check)

## Database Module

- [ ] `backend/app/db/__init__.py` — DB package initialization
- [ ] `backend/app/db/connection_pool.py` — Connection pooling configuration (pool_size=10)
- [ ] `backend/app/db/init_db.py` — Database initialization and table creation on startup
- [ ] `backend/app/db/postgres.py` — PostgreSQL engine setup (asyncpg + SQLAlchemy async)
- [ ] `backend/app/db/redis_client.py` — Redis client setup (rate limiting + audit caching)
- [ ] `backend/app/db/session.py` — SQLAlchemy async session factory
- [ ] `backend/app/db/transaction_manager.py` — Async transaction context manager

---

# PHASE 3 — DATABASE MODELS (Priority: CRITICAL)

## Models Module

- [ ] `backend/app/models/__init__.py` — Models package initialization
- [ ] `backend/app/models/base.py` — Base model class with id, created_at, updated_at
- [ ] `backend/app/models/mixins.py` — Common model mixins (TimestampMixin, SoftDeleteMixin)
- [ ] `backend/app/models/audit.py` — Audit entity: tool breakdown, savings, share token, public flag
- [ ] `backend/app/models/audit_tool_entry.py` — Per-tool audit result: tool, plan, spend, recommendation, savings
- [ ] `backend/app/models/lead.py` — Lead entity: email, company, role, team size, audit_id, consent
- [ ] `backend/app/models/tool_pricing.py` — Cached tool pricing snapshot: tool, plan, price, seats, last_verified
- [ ] `backend/app/models/abuse_log.py` — Abuse tracking: IP, fingerprint, action, timestamp
- [ ] `backend/app/models/email_event.py` — Transactional email event log: lead_id, type, provider_id, status

## Alembic Migrations

- [ ] `backend/migrations/env.py` — Migration environment (async-compatible)
- [ ] `backend/migrations/script.py.mako` — Migration script template
- [ ] `backend/migrations/versions/001_create_audits.py` — Create audits table
- [ ] `backend/migrations/versions/002_create_audit_tool_entries.py` — Create per-tool entries table
- [ ] `backend/migrations/versions/003_create_leads.py` — Create leads table
- [ ] `backend/migrations/versions/004_create_tool_pricing.py` — Create pricing snapshot table
- [ ] `backend/migrations/versions/005_create_abuse_log.py` — Create abuse log table
- [ ] `backend/migrations/versions/006_create_email_events.py` — Create email events table
- [ ] `backend/migrations/versions/007_add_share_token_index.py` — Index on share token for fast URL lookup
- [ ] `backend/migrations/versions/008_add_lead_email_index.py` — Index on lead email for dedup

---

# PHASE 4 — REPOSITORIES (Priority: CRITICAL)

## Repositories Module

- [ ] `backend/app/repositories/__init__.py` — Repositories package initialization
- [ ] `backend/app/repositories/audit_repository.py` — Audit CRUD: create, get by id, get by share token, list recent
- [ ] `backend/app/repositories/lead_repository.py` — Lead CRUD: create, get by email, upsert, mark contacted
- [ ] `backend/app/repositories/tool_pricing_repository.py` — Pricing CRUD: get by tool+plan, bulk upsert, get stale entries
- [ ] `backend/app/repositories/abuse_repository.py` — Abuse log CRUD: record event, count by IP, check honeypot flag
- [ ] `backend/app/repositories/email_event_repository.py` — Email event CRUD: log send, update delivery status

---

# PHASE 5 — SECURITY LAYER (Priority: HIGH)

## Security Module

- [ ] `backend/app/security/__init__.py` — Security package initialization
- [ ] `backend/app/security/csrf.py` — CSRF protection utilities for state-changing endpoints
- [ ] `backend/app/security/honeypot.py` — Honeypot field detection (hidden form field check)
- [ ] `backend/app/security/rate_limiter.py` — IP-based rate limit (10 audits/hour per IP)
- [ ] `backend/app/security/share_token.py` — Secure shareable token generation (UUID4 + HMAC)
- [ ] `backend/app/security/xss_protection.py` — XSS input stripping and sanitization

## Monitoring Module

- [ ] `backend/app/monitoring/__init__.py` — Monitoring package initialization
- [ ] `backend/app/monitoring/custom_metrics.py` — Custom metrics: audits_created, leads_captured, savings_total
- [ ] `backend/app/monitoring/prometheus.py` — Prometheus metrics setup (audit throughput, latency)

---

# PHASE 6 — PYDANTIC SCHEMAS (Priority: HIGH)

## Schemas Module

- [ ] `backend/app/api/v1/schemas/__init__.py` — Schemas package initialization
- [ ] `backend/app/api/v1/schemas/base.py` — Base response schemas (APIResponse, PaginatedResponse, ErrorDetail)
- [ ] `backend/app/api/v1/schemas/audit.py` — Audit request/response schemas (AuditRequest, AuditResponse, ToolInput)
- [ ] `backend/app/api/v1/schemas/lead.py` — Lead capture schemas (LeadCreateRequest, LeadResponse)
- [ ] `backend/app/api/v1/schemas/share.py` — Public share schemas (PublicAuditResponse — PII-stripped)
- [ ] `backend/app/api/v1/schemas/pricing.py` — Pricing data schemas (ToolPricingRecord, PricingSnapshot)
- [ ] `backend/app/api/v1/schemas/health.py` — Health check schemas (HealthResponse, ServiceStatus)

---

# PHASE 7 — API ENDPOINTS (Priority: HIGH)

## API Module

- [ ] `backend/app/api/__init__.py` — API package initialization
- [ ] `backend/app/api/v1/__init__.py` — v1 API package initialization
- [ ] `backend/app/api/v1/router.py` — Main API router (mounts all sub-routers)

## Endpoints Module

- [ ] `backend/app/api/v1/endpoints/__init__.py` — Endpoints package initialization
- [ ] `backend/app/api/v1/endpoints/audit.py` — POST /audit: accept spend input, run engine, return results + share token
- [ ] `backend/app/api/v1/endpoints/lead.py` — POST /lead: capture email post-value-shown, send transactional email
- [ ] `backend/app/api/v1/endpoints/share.py` — GET /audit/{share_token}: return PII-stripped public audit for sharing
- [ ] `backend/app/api/v1/endpoints/summary.py` — POST /summary: call Anthropic API for AI-generated paragraph (with fallback)
- [ ] `backend/app/api/v1/endpoints/pricing.py` — GET /pricing: return current pricing data used by engine (admin/transparency)
- [ ] `backend/app/api/v1/endpoints/health.py` — GET /health: liveness + readiness check (DB, Redis, Anthropic connectivity)
- [ ] `backend/app/api/v1/endpoints/metrics.py` — GET /metrics: Prometheus-compatible metrics scrape endpoint

---

# PHASE 8 — CACHE & EMAIL SERVICES (Priority: HIGH)

## Cache Module

- [ ] `backend/app/services/cache/__init__.py` — Cache package initialization
- [ ] `backend/app/services/cache/cache_keys.py` — Centralized cache key constants (audit:{id}, rate:{ip}, pricing:{tool})
- [ ] `backend/app/services/cache/cache_service.py` — Redis wrapper: get, set, delete, increment (for rate limiting)
- [ ] `backend/app/services/cache/cache_ttl.py` — TTL constants (audit results: 24h, pricing: 7d, rate limit: 1h)

## Email Module

- [ ] `backend/app/services/email/__init__.py` — Email package initialization
- [ ] `backend/app/services/email/email_provider.py` — Email provider adapter (Resend/Postmark/SES — swappable)
- [ ] `backend/app/services/email/email_service.py` — Email sending service with retry and logging
- [ ] `backend/app/services/email/email_templates.py` — Email templates: audit confirmation, high-savings Credex CTA, opt-in

---

# PHASE 9 — BACKGROUND JOBS (Priority: HIGH)

## Jobs Module

- [ ] `backend/app/services/jobs/__init__.py` — Jobs package initialization
- [ ] `backend/app/services/jobs/pricing_refresh_job.py` — Scheduled job: flag pricing entries older than 7 days for review
- [ ] `backend/app/services/jobs/lead_followup_job.py` — Scheduled job: queue high-savings leads for Credex outreach
- [ ] `backend/app/services/jobs/task_queue.py` — Celery task queue configuration (or APScheduler for simpler setup)

## Core Services

- [ ] `backend/app/services/__init__.py` — Services package initialization
- [ ] `backend/app/services/export_service.py` — PDF export generation (bonus feature — WeasyPrint or Puppeteer)
- [ ] `backend/app/services/notification_service.py` — Internal Slack/webhook notification for high-value leads

---

# PHASE 10 — AUDIT ENGINE SERVICES (Priority: CRITICAL)

## Audit Engine Module — The Core of the Product

- [ ] `backend/app/services/audit/__init__.py` — Audit package initialization
- [ ] `backend/app/services/audit/audit_engine.py` — Main orchestrator: accepts ToolInput[], returns AuditResult[]
- [ ] `backend/app/services/audit/plan_evaluator.py` — Per-tool evaluation: is this the right plan for team size + use case?
- [ ] `backend/app/services/audit/downgrade_advisor.py` — Is there a cheaper plan from the same vendor that fits?
- [ ] `backend/app/services/audit/alternative_advisor.py` — Is there a substantially cheaper alternative tool for this use case?
- [ ] `backend/app/services/audit/credits_advisor.py` — Could this be sourced cheaper via Credex credits?
- [ ] `backend/app/services/audit/savings_calculator.py` — Compute monthly and annual savings per tool and totals
- [ ] `backend/app/services/audit/audit_formatter.py` — Format engine results into AuditResponse schema
- [ ] `backend/app/services/audit/recommendation_ranker.py` — Rank recommendations by impact (highest savings first)
- [ ] `backend/app/services/audit/audit_events.py` — Audit event type definitions for logging

## Pricing Data Module

- [ ] `backend/app/services/pricing/__init__.py` — Pricing package initialization
- [ ] `backend/app/services/pricing/pricing_loader.py` — Load pricing from DB (cached) or static JSON fallback
- [ ] `backend/app/services/pricing/pricing_rules.py` — Hardcoded pricing rules per tool/plan with source URLs
- [ ] `backend/app/services/pricing/pricing_validator.py` — Validate pricing data completeness + staleness check

## AI Summary Module

- [ ] `backend/app/services/ai/__init__.py` — AI summary package initialization
- [ ] `backend/app/services/ai/anthropic_client.py` — Anthropic API client wrapper (claude-sonnet-4-20250514)
- [ ] `backend/app/services/ai/summary_service.py` — Generate ~100-word personalized audit summary via Claude
- [ ] `backend/app/services/ai/summary_fallback.py` — Template-based fallback summary when API fails/times out
- [ ] `backend/app/services/ai/prompt_builder.py` — Build structured prompt from audit results (spend, tools, savings)

---

# PHASE 11 — PRICING DATA REFERENCE (Priority: CRITICAL)

## Static Pricing Reference Files

- [ ] `data/pricing/cursor.json` — Cursor: Hobby/Pro/Business/Enterprise prices + source URLs + verified dates
- [ ] `data/pricing/github_copilot.json` — GitHub Copilot: Individual/Business/Enterprise pricing
- [ ] `data/pricing/claude.json` — Claude: Free/Pro/Max/Team/Enterprise/API pricing
- [ ] `data/pricing/chatgpt.json` — ChatGPT: Plus/Team/Enterprise/API pricing
- [ ] `data/pricing/anthropic_api.json` — Anthropic API: per-token rates for Haiku/Sonnet/Opus
- [ ] `data/pricing/openai_api.json` — OpenAI API: per-token rates for GPT-4o/GPT-4o-mini
- [ ] `data/pricing/gemini.json` — Gemini: Pro/Ultra/API pricing
- [ ] `data/pricing/windsurf.json` — Windsurf: Free/Pro/Team pricing (or v0 if chosen instead)
- [ ] `data/pricing/index.json` — Master index: all tools, plans, current monthly_usd_per_seat, last_verified

## Audit Logic Reference Files

- [ ] `data/audit_rules/plan_fit_rules.json` — Rules: e.g., "Team plan not cost-effective under 5 seats"
- [ ] `data/audit_rules/use_case_tool_map.json` — Best tools per use case: coding, writing, data, research, mixed
- [ ] `data/audit_rules/alternative_map.json` — Alternatives: e.g., "Cursor Pro → Claude Code for coding use case at lower cost"
- [ ] `data/audit_rules/credex_threshold.json` — Thresholds: savings > $500/mo triggers Credex CTA

---

# PHASE 12 — DATABASE SCRIPTS & SEEDS (Priority: MEDIUM)

## Database SQL Scripts

- [ ] `database/postgres/00_extensions.sql` — PostgreSQL extensions (uuid-ossp, pg_trgm for search)
- [ ] `database/postgres/01_schema.sql` — Full schema creation script
- [ ] `database/postgres/02_indexes.sql` — Index creation (share_token, lead email, created_at)
- [ ] `database/postgres/03_functions.sql` — PL/pgSQL: cleanup old anonymous audits (30d TTL)
- [ ] `database/postgres/04_seed_pricing.sql` — Seed initial pricing data for all 8 tools
- [ ] `database/postgres/05_seed_demo_audits.sql` — Seed demo audit scenarios for development

## Data Seed Files

- [ ] `data/seed/pricing_snapshot.json` — Full pricing seed: all tools × all plans × verified dates
- [ ] `data/seed/demo_audits.json` — Demo audit scenarios for testing UI and engine logic

---

# PHASE 13 — DEMO & DOCUMENTATION (Priority: HIGH)

## Demo Files

- [ ] `demo/README.md` — Demo guide: how to run the full audit flow end-to-end
- [ ] `demo/demo_scenarios.json` — 3 test scenarios: over-spend, already optimal, mixed stack
- [ ] `demo/demo_script.md` — Step-by-step demo walkthrough for reviewers

## Demo Cached Responses

- [ ] `demo/cached_responses/anthropic_summary_scenario1.json` — Cached AI summary for over-spend scenario
- [ ] `demo/cached_responses/anthropic_summary_scenario2.json` — Cached AI summary for optimal scenario
- [ ] `demo/cached_responses/anthropic_summary_scenario3.json` — Cached AI summary for mixed scenario

## Demo Screenshots

- [ ] `demo/screenshots/01_landing_page.png` — Hero section and value prop
- [ ] `demo/screenshots/02_spend_input_form.png` — Full tool input form
- [ ] `demo/screenshots/03_audit_results.png` — Results page with savings hero
- [ ] `demo/screenshots/04_ai_summary.png` — AI-generated paragraph section
- [ ] `demo/screenshots/05_credex_cta.png` — High-savings Credex CTA block
- [ ] `demo/screenshots/06_lead_capture.png` — Email gate modal
- [ ] `demo/screenshots/07_shareable_url.png` — Public share page with OG preview
- [ ] `demo/screenshots/08_mobile_results.png` — Mobile-responsive results page

## Documentation Files

- [ ] `docs/API_REFERENCE.md` — Complete API reference (all endpoints, request/response schemas)
- [ ] `docs/DATABASE_SCHEMA.md` — Database schema documentation with ERD
- [ ] `docs/DEPLOYMENT_GUIDE.md` — Step-by-step deployment instructions (Vercel + Render)
- [ ] `docs/AUDIT_ENGINE_LOGIC.md` — Detailed explanation of every audit rule and how savings are computed
- [ ] `docs/SECURITY.md` — Security measures: rate limiting, honeypot, HTTPS, no-PII in public URLs
- [ ] `docs/SETUP_GUIDE.md` — Local setup instructions (clone → .env → docker-compose up → working)
- [ ] `docs/TROUBLESHOOTING.md` — Common issues: DB connection, API key errors, email delivery
- [ ] `docs/PRICING_UPDATE_GUIDE.md` — How to update pricing data when vendors change plans

## Documentation — Diagrams

- [ ] `docs/diagrams/system_architecture.png` — Full system architecture diagram
- [ ] `docs/diagrams/audit_engine_flow.png` — Audit engine decision tree
- [ ] `docs/diagrams/data_flow.png` — User input → audit result → lead capture → email flow
- [ ] `docs/diagrams/database_erd.png` — Entity relationship diagram

---

# PHASE 14 — INFRASTRUCTURE (Priority: MEDIUM)

## Infrastructure Scripts

- [ ] `infra/docker-healthcheck.sh` — Docker health check script for container orchestration
- [ ] `infra/nginx.conf` — Production Nginx configuration (reverse proxy to FastAPI)
- [ ] `infra/nginx.dev.conf` — Development Nginx configuration
- [ ] `infra/redis.conf` — Redis configuration (maxmemory, eviction policy for rate limiting)

---

# PHASE 15 — DEVELOPMENT & DEPLOYMENT SCRIPTS (Priority: MEDIUM)

## Setup & Development Scripts

- [ ] `scripts/setup.sh` — One-command local setup: install deps, copy .env.example, run migrations, seed
- [ ] `scripts/start_dev.sh` — Start full dev stack (backend + frontend + DB + Redis)
- [ ] `scripts/stop_dev.sh` — Stop all dev services
- [ ] `scripts/run_migrations.sh` — Run Alembic migrations to latest
- [ ] `scripts/rollback_migration.sh` — Roll back last migration
- [ ] `scripts/seed_database.sh` — Seed DB with pricing data and demo audits
- [ ] `scripts/verify_env.py` — Verify all required environment variables are set
- [ ] `scripts/update_pricing.py` — CLI script: pull latest pricing from vendor pages, flag stale entries
- [ ] `scripts/generate_demo_data.py` — Generate realistic demo audit scenarios
- [ ] `scripts/health_check.sh` — Full system health check (DB, Redis, API, email)
- [ ] `scripts/backup_db.sh` — Database backup script (pg_dump to S3 or local)
- [ ] `scripts/test_audit_engine.sh` — Run audit engine unit tests in isolation

---

# PHASE 16 — FRONTEND CONFIGURATION (Priority: HIGH)

## Frontend Root Files

- [ ] `frontend/.env` — Frontend environment variables (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_ANTHROPIC_KEY)
- [ ] `frontend/.env.development` — Dev environment (localhost API)
- [ ] `frontend/.env.example` — Environment template (committed)
- [ ] `frontend/.env.production` — Production environment (deployed API URL)
- [ ] `frontend/.eslintignore` — ESLint ignore rules
- [ ] `frontend/.eslintrc.cjs` — ESLint configuration (Next.js + TypeScript + accessibility rules)
- [ ] `frontend/.prettierignore` — Prettier ignore rules
- [ ] `frontend/.prettierrc` — Prettier configuration
- [ ] `frontend/Dockerfile` — Production container (node:20-alpine + next build)
- [ ] `frontend/Dockerfile.dev` — Development container with hot reload
- [ ] `frontend/next.config.ts` — Next.js configuration (OG image headers, API rewrites, CSP headers)
- [ ] `frontend/package.json` — NPM dependencies
- [ ] `frontend/package-lock.json` — Dependency lock file
- [ ] `frontend/jest.config.js` — Jest test configuration
- [ ] `frontend/jest.setup.ts` — Jest setup (Testing Library, MSW)
- [ ] `frontend/playwright.config.ts` — Playwright E2E configuration
- [ ] `frontend/postcss.config.js` — PostCSS configuration
- [ ] `frontend/tailwind.config.ts` — Tailwind CSS configuration (custom colors, fonts)
- [ ] `frontend/tsconfig.json` — TypeScript configuration (strict mode on)
- [ ] `frontend/tsconfig.paths.json` — TS path aliases (@components, @hooks, @api, etc.)

## Frontend Public Assets

- [ ] `frontend/public/favicon.ico` — Favicon
- [ ] `frontend/public/favicon-16x16.png` — 16×16 favicon
- [ ] `frontend/public/favicon-32x32.png` — 32×32 favicon
- [ ] `frontend/public/apple-touch-icon.png` — Apple touch icon
- [ ] `frontend/public/manifest.json` — PWA manifest
- [ ] `frontend/public/og-image.png` — Default Open Graph image (1200×630, used when share URL has no custom preview)
- [ ] `frontend/public/og-image-high-savings.png` — OG image variant for high-savings audits
- [ ] `frontend/public/spendai-logo.svg` — App logo (light)
- [ ] `frontend/public/spendai-logo-dark.svg` — App logo (dark)
- [ ] `frontend/public/credex-logo.svg` — Credex logo for CTA block
- [ ] `frontend/public/robots.txt` — Robots file

## Frontend Source Root

- [ ] `frontend/src/App.tsx` — Root application component (or Next.js layout)
- [ ] `frontend/src/index.css` — Global styles (CSS variables, resets)
- [ ] `frontend/src/main.tsx` — Application entry point (or Next.js root layout)

---

# PHASE 17 — FRONTEND TYPES & API LAYER (Priority: HIGH)

## Frontend Types

- [ ] `frontend/src/types/index.ts` — All type exports
- [ ] `frontend/src/types/api.types.ts` — API response types (APIResponse, ErrorDetail)
- [ ] `frontend/src/types/audit.types.ts` — Audit types (AuditRequest, AuditResponse, ToolEntry, AuditResult)
- [ ] `frontend/src/types/tool.types.ts` — Tool enum types (ToolName, PlanName, UseCase)
- [ ] `frontend/src/types/lead.types.ts` — Lead capture types (LeadFormData, LeadResponse)
- [ ] `frontend/src/types/share.types.ts` — Public share types (PublicAuditData, OGMetaData)
- [ ] `frontend/src/types/form.types.ts` — Form state types (SpendFormState, ToolRowState)
- [ ] `frontend/src/types/savings.types.ts` — Savings types (SavingsSummary, ToolSaving, RecommendationAction)

## Frontend API Layer

- [ ] `frontend/src/api/index.ts` — API exports
- [ ] `frontend/src/api/api-config.ts` — Base URL, timeout, default headers
- [ ] `frontend/src/api/axiosInstance.ts` — Axios instance (or fetch wrapper) with interceptors
- [ ] `frontend/src/api/auditApi.ts` — POST /audit, GET /audit/{token}
- [ ] `frontend/src/api/leadApi.ts` — POST /lead (email capture after results shown)
- [ ] `frontend/src/api/summaryApi.ts` — POST /summary (AI-generated paragraph request)
- [ ] `frontend/src/api/shareApi.ts` — GET /audit/{share_token} (public share page fetch)
- [ ] `frontend/src/api/axiosErrorHandler.ts` — Axios error normalization
- [ ] `frontend/src/api/error-handler.ts` — Global error handling utilities

## Frontend API Interceptors

- [ ] `frontend/src/api/interceptors/request.interceptor.ts` — Add request ID header
- [ ] `frontend/src/api/interceptors/response.interceptor.ts` — Normalize errors, handle 429 rate limit
- [ ] `frontend/src/api/interceptors/retry.interceptor.ts` — Retry on network failure (max 2 retries)

---

# PHASE 18 — FRONTEND LIB & SECURITY (Priority: HIGH)

## Frontend Lib Layer

- [ ] `frontend/src/lib/analytics.ts` — Analytics event tracking (audit_completed, lead_captured, share_clicked)
- [ ] `frontend/src/lib/api-client.ts` — Enhanced API client (type-safe, error normalizing)
- [ ] `frontend/src/lib/cache-manager.ts` — LocalStorage form state persistence (across page reloads — required MVP)
- [ ] `frontend/src/lib/error-handler.ts` — Error handling (user-facing messages vs. console errors)
- [ ] `frontend/src/lib/logger.ts` — Frontend logging (errors to console in dev, Sentry in prod)
- [ ] `frontend/src/lib/og-meta.ts` — Open Graph + Twitter Card meta tag builder for share pages
- [ ] `frontend/src/lib/performance.ts` — Core Web Vitals reporting (Lighthouse ≥ 85 target)
- [ ] `frontend/src/lib/retry.ts` — Retry utility for AI summary fetch (with exponential backoff)
- [ ] `frontend/src/lib/sanitizer.ts` — Input sanitization before form submission
- [ ] `frontend/src/lib/validators.ts` — Validation utilities (email format, spend range, seats range)
- [ ] `frontend/src/lib/savings-formatter.ts` — Format savings numbers ($1,200/mo → "$14,400/yr" display)

## Frontend Security

- [ ] `frontend/src/security/content-security.ts` — CSP configuration helpers
- [ ] `frontend/src/security/xss-sanitizer.ts` — XSS prevention on user text inputs
- [ ] `frontend/src/security/honeypot.ts` — Honeypot field injection into lead capture form

## Frontend Monitoring

- [ ] `frontend/src/monitoring/error-tracking.ts` — Sentry error tracking (optional but recommended)
- [ ] `frontend/src/monitoring/web-vitals.ts` — Core Web Vitals (LCP, FID, CLS) collection

---

# PHASE 19 — FRONTEND UTILS & CONFIG (Priority: MEDIUM)

## Frontend Utils

- [ ] `frontend/src/utils/cn.ts` — Classname helper (clsx + tailwind-merge)
- [ ] `frontend/src/utils/constants.ts` — Tool names, plan names, use cases as typed enums
- [ ] `frontend/src/utils/debounce.ts` — Debounce utility
- [ ] `frontend/src/utils/formatCurrency.ts` — Currency formatting ($1,234.56/mo)
- [ ] `frontend/src/utils/formatSavings.ts` — Format savings display (monthly → annual, highlight big numbers)
- [ ] `frontend/src/utils/localStorage.ts` — Type-safe localStorage wrapper for form state persistence
- [ ] `frontend/src/utils/sanitizeInput.ts` — Strip dangerous characters from text inputs
- [ ] `frontend/src/utils/validators.ts` — Form field validators (email, spend > 0, seats > 0)
- [ ] `frontend/src/utils/toolHelpers.ts` — Helpers: get logo for tool, get plans for tool, get use-case label
- [ ] `frontend/src/utils/testUtils.tsx` — Test utilities (renderWithProviders, mock store)
- [ ] `frontend/src/utils/shareUrl.ts` — Build canonical share URL from share token
- [ ] `frontend/src/utils/pdfDownload.ts` — Trigger PDF download of audit report (bonus feature)

## Frontend Config

- [ ] `frontend/src/config/appConfig.ts` — App configuration (tool list, plan list, use cases, thresholds)
- [ ] `frontend/src/config/queryClient.ts` — React Query / TanStack Query configuration
- [ ] `frontend/src/config/toolConfig.ts` — Tool metadata: name, logo path, available plans, pricing URL

## Frontend Theme

- [ ] `frontend/src/theme/colors.ts` — Color palette (brand green for savings, red for waste, neutral grays)
- [ ] `frontend/src/theme/index.ts` — Theme exports
- [ ] `frontend/src/theme/shadows.ts` — Shadow definitions (card, modal, CTA block)
- [ ] `frontend/src/theme/spacing.ts` — Spacing system (consistent 4px base)
- [ ] `frontend/src/theme/typography.ts` — Typography configuration (Inter + mono for numbers)

---

# PHASE 20 — FRONTEND STATE MANAGEMENT (Priority: HIGH)

## Frontend Stores (Zustand)

- [ ] `frontend/src/store/auditStore.ts` — Audit state: form inputs, results, share token, loading state
- [ ] `frontend/src/store/formStore.ts` — Tool row form state: persisted to localStorage across reloads
- [ ] `frontend/src/store/leadStore.ts` — Lead capture state: email, company, role, capture status
- [ ] `frontend/src/store/uiStore.ts` — UI state: modal open/close, toast queue, step tracker
- [ ] `frontend/src/store/index.ts` — Store exports and combined store type

## Frontend Contexts

- [ ] `frontend/src/contexts/AuditContext.tsx` — Audit context provider (pass results to child components)
- [ ] `frontend/src/contexts/ErrorBoundaryContext.tsx` — Error boundary context for graceful degradation
- [ ] `frontend/src/contexts/NotificationContext.tsx` — Toast notification context

---

# PHASE 21 — FRONTEND HOOKS (Priority: HIGH)

## Frontend Hooks

- [ ] `frontend/src/hooks/index.ts` — Hooks exports
- [ ] `frontend/src/hooks/useAudit.ts` — Submit audit form, fetch results, manage loading/error state
- [ ] `frontend/src/hooks/useFormPersist.ts` — Persist form state to localStorage, restore on reload
- [ ] `frontend/src/hooks/useLead.ts` — Submit lead capture form, handle success/error
- [ ] `frontend/src/hooks/useShare.ts` — Fetch public audit by share token, build share URL
- [ ] `frontend/src/hooks/useAiSummary.ts` — Fetch AI-generated summary with retry + fallback
- [ ] `frontend/src/hooks/useToolRows.ts` — Manage dynamic tool row list (add, remove, update)
- [ ] `frontend/src/hooks/useSavingsCalculation.ts` — Compute total savings from audit results
- [ ] `frontend/src/hooks/useClipboard.ts` — Copy share URL to clipboard with success feedback
- [ ] `frontend/src/hooks/useDebounce.ts` — Debounce hook for live spend input
- [ ] `frontend/src/hooks/useMediaQuery.ts` — Media query hook for responsive breakpoints
- [ ] `frontend/src/hooks/useLocalStorage.ts` — Type-safe localStorage hook
- [ ] `frontend/src/hooks/useToast.ts` — Toast notification hook
- [ ] `frontend/src/hooks/usePageTitle.ts` — Dynamic page title update for share pages
- [ ] `frontend/src/hooks/useAnalytics.ts` — Track analytics events (audit_started, audit_completed, lead_submitted)
- [ ] `frontend/src/hooks/useNetworkStatus.ts` — Detect offline status and show warning

---

# PHASE 22 — FRONTEND COMPONENTS — LAYOUT (Priority: HIGH)

## Layout Components

- [ ] `frontend/src/components/layout/index.ts` — Layout exports
- [ ] `frontend/src/components/layout/RootLayout.tsx` — Root layout: nav + footer + main
- [ ] `frontend/src/components/layout/Header.tsx` — Top navigation bar with logo and CTA
- [ ] `frontend/src/components/layout/Footer.tsx` — Footer with Credex link, privacy policy, pricing sources note
- [ ] `frontend/src/components/layout/PageContainer.tsx` — Centered max-width content container
- [ ] `frontend/src/components/layout/Section.tsx` — Semantic section wrapper with padding
- [ ] `frontend/src/components/layout/Divider.tsx` — Visual divider between sections

---

# PHASE 23 — FRONTEND COMPONENTS — UI PRIMITIVES (Priority: HIGH)

## UI Primitive Components

- [ ] `frontend/src/components/ui/index.ts` — UI exports
- [ ] `frontend/src/components/ui/Button.tsx` — Button (primary, secondary, ghost, loading state)
- [ ] `frontend/src/components/ui/Input.tsx` — Text/number input with label, error, helper text
- [ ] `frontend/src/components/ui/Select.tsx` — Dropdown select (tool name, plan, use case)
- [ ] `frontend/src/components/ui/Badge.tsx` — Status badge (savings, optimal, switch, downgrade)
- [ ] `frontend/src/components/ui/Card.tsx` — Card container with optional border accent
- [ ] `frontend/src/components/ui/Modal.tsx` — Modal dialog (used for lead capture gate)
- [ ] `frontend/src/components/ui/Toast.tsx` — Toast notification (success, error, info)
- [ ] `frontend/src/components/ui/Tooltip.tsx` — Hover tooltip for pricing source attribution
- [ ] `frontend/src/components/ui/Spinner.tsx` — Loading spinner (used during audit processing)
- [ ] `frontend/src/components/ui/Skeleton.tsx` — Skeleton loading placeholder for results
- [ ] `frontend/src/components/ui/Separator.tsx` — Horizontal rule separator
- [ ] `frontend/src/components/ui/Alert.tsx` — Alert box (info, warning, error variants)
- [ ] `frontend/src/components/ui/ProgressBar.tsx` — Progress bar (potential savings meter)
- [ ] `frontend/src/components/ui/CopyButton.tsx` — Copy-to-clipboard button with success tick

---

# PHASE 24 — FRONTEND COMPONENTS — SPEND INPUT FORM (Priority: CRITICAL)

## Spend Input Form Components

- [ ] `frontend/src/components/form/index.ts` — Form component exports
- [ ] `frontend/src/components/form/SpendInputForm.tsx` — Main form orchestrator: tool rows + global fields + submit
- [ ] `frontend/src/components/form/ToolRow.tsx` — Single tool row: tool select + plan select + spend + seats
- [ ] `frontend/src/components/form/ToolSelector.tsx` — Searchable tool dropdown with logo icons
- [ ] `frontend/src/components/form/PlanSelector.tsx` — Plan dropdown (filtered by selected tool)
- [ ] `frontend/src/components/form/SpendInput.tsx` — Monthly spend number input with $ prefix
- [ ] `frontend/src/components/form/SeatsInput.tsx` — Number of seats input
- [ ] `frontend/src/components/form/UseCaseSelector.tsx` — Primary use case dropdown (coding/writing/data/research/mixed)
- [ ] `frontend/src/components/form/TeamSizeInput.tsx` — Total team size input (used for per-seat benchmarking)
- [ ] `frontend/src/components/form/AddToolButton.tsx` — "Add another tool" button
- [ ] `frontend/src/components/form/RemoveToolButton.tsx` — Remove tool row (×) button
- [ ] `frontend/src/components/form/FormPersistBanner.tsx` — "Form restored from last visit" banner
- [ ] `frontend/src/components/form/FormValidationErrors.tsx` — Inline validation error display

---

# PHASE 25 — FRONTEND COMPONENTS — AUDIT RESULTS (Priority: CRITICAL)

## Audit Results Components

- [ ] `frontend/src/components/results/index.ts` — Results component exports
- [ ] `frontend/src/components/results/AuditResultsPage.tsx` — Full results page orchestrator
- [ ] `frontend/src/components/results/SavingsHero.tsx` — HERO: total monthly + annual savings, big and clear
- [ ] `frontend/src/components/results/ToolBreakdownList.tsx` — List of per-tool audit cards
- [ ] `frontend/src/components/results/ToolAuditCard.tsx` — Per-tool card: current spend → action → savings + reason
- [ ] `frontend/src/components/results/RecommendationBadge.tsx` — Badge: Switch / Downgrade / Optimize / Already Optimal
- [ ] `frontend/src/components/results/SavingsAmount.tsx` — Savings amount display (green, animated, formatted)
- [ ] `frontend/src/components/results/OptimalSpendMessage.tsx` — "You're spending well" message for already-optimal audits
- [ ] `frontend/src/components/results/AiSummaryBlock.tsx` — AI-generated ~100-word paragraph with loading skeleton
- [ ] `frontend/src/components/results/AiSummaryFallback.tsx` — Fallback template summary if Anthropic API fails
- [ ] `frontend/src/components/results/CredexCTABlock.tsx` — Credex CTA (shown when savings > $500/mo): prominent, branded
- [ ] `frontend/src/components/results/NotifyMeBlock.tsx` — "Notify me when optimizations apply" for low/optimal audits
- [ ] `frontend/src/components/results/ShareBlock.tsx` — Share section: unique URL + copy button + social share links
- [ ] `frontend/src/components/results/PrintButton.tsx` — Print / PDF export trigger button (bonus)
- [ ] `frontend/src/components/results/AuditMetadata.tsx` — Audit timestamp, tools audited, use case label

---

# PHASE 26 — FRONTEND COMPONENTS — LEAD CAPTURE (Priority: CRITICAL)

## Lead Capture Components

- [ ] `frontend/src/components/lead/index.ts` — Lead component exports
- [ ] `frontend/src/components/lead/LeadCaptureModal.tsx` — Modal: email gate shown AFTER results displayed
- [ ] `frontend/src/components/lead/LeadCaptureForm.tsx` — Lead form: email (required) + company + role (optional)
- [ ] `frontend/src/components/lead/HoneypotField.tsx` — Hidden honeypot field (aria-hidden, display:none)
- [ ] `frontend/src/components/lead/LeadSuccessView.tsx` — Post-submission confirmation: "Check your inbox"
- [ ] `frontend/src/components/lead/LeadPrivacyNote.tsx` — Privacy note: "We don't sell your data. Credex may reach out for high-savings cases."
- [ ] `frontend/src/components/lead/SkipLeadLink.tsx` — "Skip for now" link (users can still view results without emailing)

---

# PHASE 27 — FRONTEND COMPONENTS — SHARE PAGE (Priority: HIGH)

## Share Page Components

- [ ] `frontend/src/components/share/index.ts` — Share component exports
- [ ] `frontend/src/components/share/PublicAuditView.tsx` — Public share page: PII-stripped audit results
- [ ] `frontend/src/components/share/ShareMetaTags.tsx` — OG + Twitter Card meta tags (dynamic per audit)
- [ ] `frontend/src/components/share/ShareSavingsBanner.tsx` — "This team could save $X/mo on AI tools" hero for share page
- [ ] `frontend/src/components/share/SharePublicToolList.tsx` — Anonymized tool breakdown (no email, no company)
- [ ] `frontend/src/components/share/TryItCTA.tsx` — "Audit your own AI spend →" CTA on share page (viral loop)

---

# PHASE 28 — FRONTEND COMPONENTS — LANDING PAGE (Priority: HIGH)

## Landing Page Components

- [ ] `frontend/src/components/landing/index.ts` — Landing component exports
- [ ] `frontend/src/components/landing/HeroSection.tsx` — Hero: headline (≤10 words) + subheadline + primary CTA
- [ ] `frontend/src/components/landing/HowItWorksSection.tsx` — 3-step explainer: Input → Audit → Save
- [ ] `frontend/src/components/landing/SocialProofSection.tsx` — Mocked social proof block (clearly labeled as mocked)
- [ ] `frontend/src/components/landing/ToolLogosSection.tsx` — "Works with" grid of supported tool logos
- [ ] `frontend/src/components/landing/FAQSection.tsx` — 5 real FAQ Q&As from LANDING_COPY.md
- [ ] `frontend/src/components/landing/CredexBrandingSection.tsx` — Subtle Credex "powered by" or "by Credex" attribution
- [ ] `frontend/src/components/landing/SampleAuditPreview.tsx` — Mock/redacted audit result as social proof

---

# PHASE 29 — FRONTEND COMPONENTS — CHARTS & VISUALIZATION (Priority: MEDIUM)

## Chart Components

- [ ] `frontend/src/components/charts/index.ts` — Chart component exports
- [ ] `frontend/src/components/charts/SavingsBreakdownChart.tsx` — Bar or donut chart: spend vs. potential spend per tool
- [ ] `frontend/src/components/charts/SpendDistributionChart.tsx` — Pie chart: current spend distribution by tool
- [ ] `frontend/src/components/charts/SavingsMeter.tsx` — Visual savings meter / gauge for results hero

---

# PHASE 30 — FRONTEND COMPONENTS — COMMON / SHARED (Priority: MEDIUM)

## Common Components

- [ ] `frontend/src/components/common/index.ts` — Common component exports
- [ ] `frontend/src/components/common/ToolLogo.tsx` — Tool logo image with fallback (Cursor, GitHub, Claude, etc.)
- [ ] `frontend/src/components/common/PricingSourceTooltip.tsx` — Tooltip showing pricing source URL + verified date
- [ ] `frontend/src/components/common/ExternalLink.tsx` — External link with rel="noopener noreferrer" and icon
- [ ] `frontend/src/components/common/EmptyState.tsx` — Empty state placeholder (no tools added yet)
- [ ] `frontend/src/components/common/ErrorState.tsx` — Error state with retry button
- [ ] `frontend/src/components/common/LoadingOverlay.tsx` — Full-page loading overlay during audit processing
- [ ] `frontend/src/components/common/StepIndicator.tsx` — Multi-step indicator: Input → Processing → Results

---

# PHASE 31 — FRONTEND PAGES & ROUTING (Priority: HIGH)

## Router Configuration (Next.js App Router)

- [ ] `frontend/src/app/layout.tsx` — Root layout with metadata, fonts, providers
- [ ] `frontend/src/app/page.tsx` — Landing page (hero + form entry)
- [ ] `frontend/src/app/audit/page.tsx` — Audit input page (full SpendInputForm)
- [ ] `frontend/src/app/results/page.tsx` — Audit results page (client-side, uses audit store)
- [ ] `frontend/src/app/share/[token]/page.tsx` — Public share page (SSR for OG tags, no PII)
- [ ] `frontend/src/app/not-found.tsx` — 404 page
- [ ] `frontend/src/app/error.tsx` — Error boundary page
- [ ] `frontend/src/app/sitemap.ts` — Sitemap (landing + share pages)
- [ ] `frontend/src/app/robots.ts` — Robots meta

## Page Components (if using pages router instead)

- [ ] `frontend/src/pages/index.tsx` — Landing page
- [ ] `frontend/src/pages/audit.tsx` — Audit input page
- [ ] `frontend/src/pages/results.tsx` — Results page
- [ ] `frontend/src/pages/share/[token].tsx` — Public share page (getServerSideProps for OG meta)
- [ ] `frontend/src/pages/404.tsx` — 404 page
- [ ] `frontend/src/pages/_app.tsx` — App wrapper with providers

---

# PHASE 32 — FRONTEND ASSETS (Priority: MEDIUM)

## Frontend Assets

- [ ] `frontend/src/assets/tool-logos/cursor.svg` — Cursor logo
- [ ] `frontend/src/assets/tool-logos/github-copilot.svg` — GitHub Copilot logo
- [ ] `frontend/src/assets/tool-logos/claude.svg` — Claude (Anthropic) logo
- [ ] `frontend/src/assets/tool-logos/chatgpt.svg` — ChatGPT (OpenAI) logo
- [ ] `frontend/src/assets/tool-logos/gemini.svg` — Gemini (Google) logo
- [ ] `frontend/src/assets/tool-logos/windsurf.svg` — Windsurf logo (or v0)
- [ ] `frontend/src/assets/tool-logos/generic-ai.svg` — Fallback generic AI tool icon
- [ ] `frontend/src/assets/illustrations/savings-hero.svg` — Hero illustration for savings page
- [ ] `frontend/src/assets/illustrations/empty-form.svg` — Illustration for empty state (no tools added)

---

# PHASE 33 — FRONTEND TESTING (Priority: MEDIUM)

## Frontend Test Setup

- [ ] `frontend/src/__tests__/setup.ts` — Test setup (Testing Library, MSW, jest-dom)
- [ ] `frontend/src/__tests__/mocks/data.ts` — Mock data (sample tool inputs, audit responses)
- [ ] `frontend/src/__tests__/mocks/handlers.ts` — MSW API handlers (mock /audit, /lead, /summary endpoints)
- [ ] `frontend/src/__tests__/mocks/server.ts` — MSW server setup

## Frontend Component Tests

- [ ] `frontend/src/__tests__/components/form/SpendInputForm.test.tsx` — Form renders, adds rows, validates, submits
- [ ] `frontend/src/__tests__/components/form/ToolRow.test.tsx` — Tool row selects correct plans for each tool
- [ ] `frontend/src/__tests__/components/results/SavingsHero.test.tsx` — Savings hero renders correct totals
- [ ] `frontend/src/__tests__/components/results/ToolAuditCard.test.tsx` — Per-tool card renders action + savings
- [ ] `frontend/src/__tests__/components/results/CredexCTABlock.test.tsx` — CTA shows for savings > $500/mo, hidden otherwise
- [ ] `frontend/src/__tests__/components/lead/LeadCaptureModal.test.tsx` — Modal opens after results shown, submits form

## Frontend Hook Tests

- [ ] `frontend/src/__tests__/hooks/useAudit.test.ts` — Audit hook submits, handles errors, updates store
- [ ] `frontend/src/__tests__/hooks/useFormPersist.test.ts` — Form state persists to localStorage, restores on reload
- [ ] `frontend/src/__tests__/hooks/useLead.test.ts` — Lead hook submits email, handles duplicate

## Frontend E2E Tests (Playwright)

- [ ] `frontend/src/__tests__/e2e/audit-flow.spec.ts` — Full E2E: fill form → submit → see results → capture email
- [ ] `frontend/src/__tests__/e2e/share-flow.spec.ts` — Share URL loads public audit without PII
- [ ] `frontend/src/__tests__/e2e/form-persist.spec.ts` — Reload page, form state restored from localStorage

## Frontend Utils Tests

- [ ] `frontend/src/__tests__/utils/formatCurrency.test.ts` — Currency format edge cases ($0, $1M)
- [ ] `frontend/src/__tests__/utils/validators.test.ts` — Email, spend, seats validators
- [ ] `frontend/src/__tests__/utils/shareUrl.test.ts` — Share URL construction from token

---

# PHASE 34 — BACKEND TESTING (Priority: CRITICAL)

## Backend Test Configuration

- [ ] `tests/__init__.py` — Tests package initialization
- [ ] `tests/conftest.py` — Pytest configuration and fixtures (async DB, test client, mock Anthropic)
- [ ] `tests/pytest.ini` — Pytest ini config (asyncio_mode=auto)
- [ ] `tests/pytest-coverage.ini` — Coverage configuration (target: ≥ 80% on audit engine)
- [ ] `tests/utils/__init__.py` — Utils package initialization
- [ ] `tests/utils/factories.py` — Data factories (build test ToolInput, AuditResponse objects)
- [ ] `tests/utils/test_helpers.py` — Test helper functions (create test audit, create test lead)

## Backend Test Fixtures

- [ ] `tests/fixtures/__init__.py` — Fixtures package initialization
- [ ] `tests/fixtures/sample_tool_inputs.py` — Sample tool input combinations for engine tests
- [ ] `tests/fixtures/sample_audit_responses.py` — Expected audit output fixtures
- [ ] `tests/fixtures/sample_pricing_data.py` — Mock pricing data for deterministic engine tests
- [ ] `tests/fixtures/sample_leads.py` — Sample lead data for capture tests

## Backend Unit Tests — Audit Engine (MINIMUM 5, ALL REQUIRED BY CREDEX)

- [ ] `tests/unit/test_plan_evaluator.py` — Plan fit logic: Team plan flagged for 2 users, Individual OK for 1
- [ ] `tests/unit/test_downgrade_advisor.py` — Downgrade advice: ChatGPT Team → Plus when <3 users
- [ ] `tests/unit/test_alternative_advisor.py` — Alternative suggestions: correct tool recommended per use case
- [ ] `tests/unit/test_savings_calculator.py` — Savings math: per-tool and totals match expected values
- [ ] `tests/unit/test_audit_engine.py` — Full engine integration: given inputs → correct AuditResult[]
- [ ] `tests/unit/test_credits_advisor.py` — Credits advisor: Credex alternative surfaces when retail > threshold
- [ ] `tests/unit/test_recommendation_ranker.py` — Results ranked by savings descending
- [ ] `tests/unit/test_pricing_loader.py` — Pricing loader returns correct prices; handles missing tool gracefully
- [ ] `tests/unit/test_summary_fallback.py` — AI summary fallback returns valid template when API fails
- [ ] `tests/unit/test_share_token.py` — Share token generation is unique; verification works; PII stripped correctly

## Backend Integration Tests

- [ ] `tests/integration/test_audit_api.py` — POST /audit returns valid AuditResponse with share token
- [ ] `tests/integration/test_lead_api.py` — POST /lead stores lead, sends email, handles duplicate gracefully
- [ ] `tests/integration/test_share_api.py` — GET /audit/{token} returns PII-stripped public view
- [ ] `tests/integration/test_summary_api.py` — POST /summary calls Anthropic, falls back on failure
- [ ] `tests/integration/test_health_api.py` — GET /health returns 200 with all services OK
- [ ] `tests/integration/test_rate_limit.py` — 11th request from same IP within window returns 429

## Backend E2E Tests

- [ ] `tests/e2e/test_full_audit_flow.py` — Input → engine → results → lead capture → email sent
- [ ] `tests/e2e/test_high_savings_flow.py` — Audit with >$500/mo savings triggers Credex CTA flag in response
- [ ] `tests/e2e/test_optimal_spend_flow.py` — Already-optimal audit returns honest "spending well" message
- [ ] `tests/e2e/test_share_flow.py` — Create audit → get share token → fetch public page → no PII present

---