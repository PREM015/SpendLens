# Development Log

## Day 1 — 2025-05-18
- **Hours**: 6
- **What I did**: Initialized Next.js project, configured Tailwind, designed the core audit engine logic, and compiled all 8 pricing JSON files from vendor websites.
- **Learned**: ChatGPT Enterprise has no public pricing, so I had to build the engine to handle `0` cost custom plans gracefully.
- **Blockers**: Finding reliable historical pricing data.
- **Plan for tomorrow**: Build the API routes and Supabase schema.

## Day 2 — 2025-05-19
- **Hours**: 8
- **What I did**: Wrote the Supabase SQL schema. Implemented all 4 API routes (`run-audit`, `generate-summary`, `audit/[id]`, `capture-lead`). Integrated Anthropic API.
- **Learned**: Next.js App Router API handlers require specific response typing to satisfy strict mode.
- **Blockers**: Claude API rate limits on my new tier.
- **Plan for tomorrow**: Build the frontend form state management.

## Day 3 — 2025-05-20
- **Hours**: 7
- **What I did**: Built Zustand stores. Created the `SpendInputForm` with dynamic row addition/removal and auto-calculation of spend based on selected plans.
- **Learned**: Framer Motion `AnimatePresence` requires `layout` props to smoothly handle removing items from the middle of a list.
- **Blockers**: None.
- **Plan for tomorrow**: Build the Results page UI.

## Day 4 — 2025-05-21
- **Hours**: 9
- **What I did**: Built the massive Results page. Implemented the "Savings Hero" banner, per-tool breakdown cards, and the Credex CTA trigger for >$500 savings.
- **Learned**: Handling the async loading state of the AI summary independently from the main results render makes the app feel much faster.
- **Blockers**: Getting the glassmorphism CSS right across browsers.
- **Plan for tomorrow**: Build the Landing page and Share page.

## Day 5 — 2025-05-22
- **Hours**: 5
- **What I did**: Built the landing page with gradient animations. Implemented the Share page logic to strip PII. Finalized the Resend email template.
- **Learned**: Building HTML emails that look good on mobile is still terrible in 2025.
- **Blockers**: None.
- **Plan for tomorrow**: Write documentation and tests.

## Day 6 — 2025-05-23
- **Hours**: 6
- **What I did**: Wrote all required Credex documentation (README, GTM, ECONOMICS, etc.). Added Zod validation schemas.
- **Learned**: The Credex submission requirements are intense but force good business thinking.
- **Blockers**: None.
- **Plan for tomorrow**: Final polish, bug fixing, and Vercel deployment.

## Day 7 — 2025-05-24
- **Hours**: 4
- **What I did**: Final testing round. Fixed a bug where duplicate detection overrode plan-fit recommendations incorrectly. Deployed the MVP to Vercel.
- **Learned**: Always test edge cases (like a user submitting 10 identical tools).
- **Blockers**: None.

## Day 8 — 2025-05-25 (Architecture Pivot)
- **Hours**: 8
- **What I did**: Based on the project scale, we pivoted from the Next.js API + Supabase MVP to a full Python FastAPI + PostgreSQL architecture. Set up Docker Compose, Alembic migrations, and the FastAPI core structure.
- **Learned**: Porting TypeScript logic to Python is straightforward but requires strict Pydantic schema validation.
- **Blockers**: Docker network routing between frontend and backend.
- **Plan for tomorrow**: Port the Audit Engine to Python.

## Day 9 — 2025-05-26
- **Hours**: 7
- **What I did**: Re-wrote the Audit Engine in Python (`app/services/audit/`). Transferred the Anthropic and Resend integrations to the backend. Fixed the frontend to accept `snake_case` JSON responses.
- **Learned**: Pydantic v2 is incredibly fast and handles aliases (`monthlySpend` to `monthly_spend`) seamlessly.
- **Blockers**: None.

## Day 10 — 2025-05-27
- **Hours**: 4
- **What I did**: Wrote the Pytest test suite for the Python audit engine. Fixed final testing bugs and updated all Markdown documentation to reflect the new Enterprise Architecture.
- **Learned**: Writing rigorous tests for financial logic is absolutely critical.
- **Blockers**: None. The project is 100% complete.
