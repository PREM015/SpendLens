# SpendLens

**Free AI Spend Audit Tool for Startups**
*Powered by [Credex](https://credex.co)*

**🚀 Live Demo:** [https://spendlens-credex.vercel.app](https://spendlens-credex.vercel.app) *(Replace with actual deployed URL)*

Find out exactly where your AI budget is leaking. SpendLens runs a deterministic, 4-point check against your team's current AI tool stack (Cursor, Copilot, Claude, ChatGPT, etc.) and recommends plan optimizations and consolidations to save money.

## Product Walkthrough

*(Please replace these placeholders with actual screenshots or a Loom video link)*
- ![Dashboard Screenshot](./frontend/public/screenshot-dashboard.png)
- ![Audit Engine Input](./frontend/public/screenshot-input.png)
- ![Landing Page](./frontend/public/screenshot-landing.png)

## Quick Start

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd credex/frontend
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and add your keys:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY` (for AI summaries)
   - `RESEND_API_KEY` (for email delivery)

3. **Database Setup**
   Run the backend migrations to create the database schema:
   ```bash
   cd backend
   alembic upgrade head
   cd ..
   ```

4. **Run the Application**
   It is highly recommended to run the entire stack using Docker:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Architecture & Tech Stack
- **Frontend**: Next.js 14 (App Router) with Tailwind CSS & Framer Motion
- **Backend**: Python FastAPI (Async)
- **Database**: PostgreSQL (via asyncpg & SQLAlchemy 2.0)
- **Caching**: Redis
- **State**: Zustand
- **AI**: Anthropic Claude 3.5 Sonnet (for summary generation)
- **Email**: Resend

## Architectural Trade-offs
1. **Hardcoded Engine vs. AI Agent**: The core audit engine uses deterministic, hardcoded rules written in Python/TypeScript instead of an LLM. This guarantees 100% accurate mathematical calculations and prevents hallucinations when dealing with financial data.
2. **FastAPI vs Node.js**: Chose a dedicated Python FastAPI backend to handle complex data logic and make it easier to add background scraping/ML tasks later.
3. **Docker Compose**: Used Docker to spin up the entire stack (Next.js, FastAPI, Postgres, Redis) seamlessly instead of relying on separate managed services.
4. **Zustand vs React Context**: Zustand was chosen for frontend form state to prevent unnecessary re-renders across the complex multi-row tool input form.
5. **Tailwind v4 vs v3**: Decided to use Tailwind v4 for modern CSS features and simpler configuration, but had to accept the trade-off of writing explicit custom variants for `class`-based dark mode to work nicely with `next-themes`.
