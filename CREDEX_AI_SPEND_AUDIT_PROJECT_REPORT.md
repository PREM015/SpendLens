# 💸 SpendLens — Official Project Report v1.0
### Credex Web Development Internship | Round 1 | AI Infrastructure Domain

---

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   Project Name    :  SpendLens                                   │
│   Subtitle        :  Free AI Spend Audit Tool for Startups       │
│                      — Find Where Your AI Budget is Leaking      │
│   Assignment      :  Credex Web Dev Intern — Round 1             │
│   Domain          :  AI Infrastructure / SaaS Finance            │
│                                                                  │
│   Frontend        :  Next.js 14 + TypeScript + Tailwind CSS      │
│   Backend         :  Next.js API Routes + Supabase               │
│   AI Layer        :  Anthropic Claude API (claude-sonnet-4)      │
│   Email           :  Resend (Transactional)                      │
│   Deploy          :  Vercel                                      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📑 TABLE OF CONTENTS

```
1.  Why This Problem? — Strategic Choice Explained
2.  Problem Statement
3.  Solution Overview — What SpendLens Does End-to-End
4.  System Architecture
5.  Feature-by-Feature Technical Design (All 6 MVP Features)
6.  Complete Technology Stack — Every Tool Justified
7.  Database Design — Supabase Schema
8.  API Documentation
9.  Frontend Design Plan — All Screens
10. AI Integration — Anthropic Claude Summary Engine
11. Audit Engine Logic — The Core Rules
12. Lead Capture + Email System
13. Shareable URL + Open Graph System
14. Entrepreneurial Analysis
15. Competitive Analysis
16. Risk Assessment & Mitigation
17. Future Scope (Week 2 and Beyond)
18. Required File Index
```

---

## 1️⃣ WHY THIS PROBLEM? — STRATEGIC CHOICE EXPLAINED

Most tools built for this type of brief produce generic "AI chatbot" demos that show off the technology without solving a real commercial problem. SpendLens is different. Here is exactly why this problem was chosen.

**Credex's actual business:**
Credex sells discounted AI infrastructure credits — Cursor, Claude, ChatGPT Enterprise, and others — sourced from companies that overforecast or pivoted. The discount is real and substantial. But a discount only creates urgency if the buyer first realizes they are overpaying. SpendLens creates that realization, for free, in under 90 seconds. It is not a demo. It is a working lead-generation machine with genuine utility for the person using it.

**The gap where nobody is building:**
There is no "Mint for AI tools." Every founder who pays a monthly AI bill has a rough sense of what they spend, but no structured view of: whether they are on the right plan, whether a cheaper tool would do the same job, and how much they are overpaying in aggregate. This is a discovered pain, not a manufactured one. The first 100 users will come from founders nodding their heads the moment they see the headline.

**Numbers that are verifiable:**
Every pricing figure in this tool comes from official vendor pricing pages, captured with a date and URL in `PRICING_DATA.md`. The audit recommendations trace to those numbers. A finance-literate person should read every recommendation and agree.

**Why AI is appropriate here — and only here:**
The audit math is hardcoded rules. Knowing when NOT to use AI is part of the test, and hardcoded rules are correct for the financial calculations — they are auditable, explainable, and deterministic. AI is used exactly once: to generate a personalized ~100-word plain-language summary of the audit. This requires natural language generation that cannot be templated perfectly. That is a genuine AI use case. Everything else is rules.

---

## 2️⃣ PROBLEM STATEMENT

### 2.1 The Ground Reality of AI Tool Spend

**FACT 1 — Startups Overspend on AI Tools Without Knowing It**
The average startup with 10–30 engineers pays for 3–6 AI tools simultaneously. Plans are selected once, on a Tuesday, by whoever needs the tool first — and never revisited. A team that started with GitHub Copilot Individual ($10/seat/month) before Cursor existed now pays for both Cursor Pro ($20/seat/month) and Copilot Business ($19/seat/month) for overlapping coding assistance. That is $39/developer/month instead of $20. At 15 engineers, that is $285/month wasted — $3,420/year.

**FACT 2 — Plan Selection Is Made at Signup, Never Reviewed**
Most plans are selected under the pressure of onboarding a new tool — often by the engineer who championed the purchase, not the CFO. The Team plan that made sense for 15 users now has 8 active users, with 7 seats paying for nothing. A Claude Team plan at $30/seat with 7 idle seats = $210/month in pure waste. No alert fires. The card gets charged.

**FACT 3 — There Is No Second Opinion**
When a DigitalOcean founder audits their cloud spend, they have dashboards, advisors, and rightsizing recommendations. When an engineering manager looks at AI tool spend, they have a spreadsheet and a vague sense that something is off. There is no Cloudability for AI tools. There is no benchmark: "companies your size average $X per developer per month on AI tools." Nobody is building this.

**FACT 4 — The Credex Opportunity Is Invisible Without the Audit**
Credex can offer meaningful discounts on AI infrastructure credits. But a discount on a purchase someone did not realize they needed to make is useless. The audit creates the awareness — and immediately positions Credex as the solution for users who discover real overspend. Without a free audit tool, Credex's TAM is "people who already know they overspend." With SpendLens, Credex's TAM is "every startup that pays for AI tools."

---

### 2.2 The Problem in One Statement

> *"Startup founders and engineering managers pay for 3–6 AI tools on autopilot — never knowing if they're on the right plan, paying for idle seats, or duplicating functionality — because no single free tool audits their complete AI stack, benchmarks their spend against comparable teams, and surfaces the exact actions that would cut their monthly bill."*

---

### 2.3 Who Suffers

| Stakeholder | Pain Point | Scale |
|---|---|---|
| Engineering Manager | Paying for idle seats on Team plans they set up once | Every startup with 5+ engineers |
| Startup Founder / CFO | No benchmark — no idea if $800/month on AI is good or bad | Every seed/Series A startup |
| Solo Developer | On Cursor Business ($40) when Pro ($20) covers their needs | Every indie developer |
| API direct users | No visibility into token waste or cheaper model alternatives | Every company calling LLMs directly |
| Teams with overlapping tools | Copilot + Cursor + CodeWhisperer all running simultaneously | Common in teams >10 engineers |

### 2.4 The Three Spend Scenarios Nobody Handles

```
SCENARIO 1 — WRONG PLAN (Most common, ~50% of audits)
  Team on Claude Team plan (minimum 5 seats)
  Actual active users: 2
  Current spend: $150/month
  Should be: Claude Pro × 2 = $40/month
  Savings: $110/month / $1,320 year
  SpendLens action: Flag, calculate, explain, link to downgrade

SCENARIO 2 — DUPLICATE TOOLS (Common, ~35% of audits)
  Team paying for GitHub Copilot Business + Cursor Pro
  Both serve the same core use case: AI coding assistant
  Current spend: $19 + $20 = $39/developer
  Should be: Pick one. Cursor Pro alone: $20/developer
  Savings: $19/developer/month
  SpendLens action: Identify overlap, recommend best fit for
                    their stated use case (coding/writing/etc)

SCENARIO 3 — RETAIL WHEN CREDITS ARE CHEAPER (~15% of audits)
  Team paying retail for $500+/month in Claude API spend
  Credex sells discounted credits for exactly this category
  SpendLens action: Surface Credex consultation prominently
                    "You could save an additional 20–40% here"
```

---

## 3️⃣ SOLUTION OVERVIEW — WHAT SPENDLENS DOES END-TO-END

### 3.1 What SpendLens Does

```
COLD VISITOR LANDS ON PAGE FROM TWEET / HN / BLOG POST
              │
              ▼
    STEP 1: SPEND INPUT FORM
    User selects AI tools they pay for
    Enters plan, seats, monthly spend, use case
    Form saves state — reloads survive without losing data
              │
              ▼
    STEP 2: AUDIT ENGINE (Hardcoded Rules — NOT AI)
    Per-tool: wrong plan check
    Per-tool: cheaper same-vendor plan check
    Per-tool: cheaper alternative tool check
    High-spend flag: surface Credex credits option
    Engine produces structured audit result object
              │
              ▼
    STEP 3: AI SUMMARY GENERATION (Anthropic Claude API)
    Audit data sent to Claude
    ~100-word plain English personalized paragraph
    Graceful fallback if API fails
    Stream in while results load
              │
              ▼
    STEP 4: RESULTS PAGE
    Hero: total monthly + annual savings, big and clear
    Per-tool breakdown: current → action → savings → reason
    If >$500/mo savings: Credex CTA card (prominent)
    If <$100/mo or optimal: honest "You're spending well"
    Unique shareable URL generated
              │
              ▼
    STEP 5: LEAD CAPTURE (After value is shown — never before)
    Optional email capture: "Email me this report"
    Optional: company, role, team size
    Stored in Supabase
    Transactional email sent via Resend
              │
              ▼
    STEP 6: SHAREABLE URL
    /audit/[unique-id] — public, identifying info stripped
    Open Graph tags: headline savings number in preview
    Twitter card support
    "Copy link" button — the viral loop
```

### 3.2 The 90-Second User Journey

```
00 sec → Founder lands on SpendLens home page
         Sees headline: "Find Out Exactly Where Your
         AI Budget Is Going — Free, 90 Seconds"
05 sec → Starts filling form
         Adds: Cursor Pro × 3 seats = $60/month
               GitHub Copilot Business × 3 = $57/month
               Claude Pro × 2 = $40/month
20 sec → Clicks "Run My Audit"
25 sec → Results load:

         ┌─────────────────────────────────┐
         │  YOU COULD SAVE $57/MONTH       │
         │  That's $684/year               │
         └─────────────────────────────────┘

         Cursor Pro    → Keep. Right plan for 3 devs.
         Copilot Biz   → Drop. Cursor already covers this.
                         Savings: $57/month
         Claude Pro    → Keep. Optimal for 2-user team.

30 sec → AI-generated summary appears:
         "Your team is paying for overlapping coding
          assistance tools. Cursor Pro and GitHub Copilot
          Business both provide AI pair-programming, but
          with Cursor already in use, Copilot adds cost
          without adding capability. Dropping Copilot
          Business saves $57/month immediately..."

45 sec → Clicks "Share this audit" — copies URL
60 sec → Enters email for full report
90 sec → Transactional email arrives in inbox
```

### 3.3 What Is and Is NOT in the 7-Day MVP

```
IN MVP — Works end-to-end on launch day:
→ All 8 AI tools with correct plans and pricing
→ All 4 audit checks (plan fit, downgrade, alternative, credits)
→ AI-generated summary with graceful fallback
→ Email capture stored in Supabase
→ Transactional email via Resend
→ Shareable public URL with Open Graph preview
→ Form state persistence across reloads
→ Honeypot abuse protection
→ GitHub Actions CI (lint + tests green)
→ ≥5 audit engine tests that actually run
→ Lighthouse: Performance ≥ 85, Accessibility ≥ 90

NOT IN MVP — Future scope only:
→ PDF export of full report
→ Embeddable <script> widget
→ Benchmark mode (your spend vs industry average)
→ Referral codes
→ Admin dashboard for Credex to view leads
→ Saved audit history / user accounts
→ Real-time API pricing sync from vendor pages
```

---

## 4️⃣ SYSTEM ARCHITECTURE

### 4.1 Architecture Principle

SpendLens follows one rule: every piece of infrastructure earns its place. There is no database that could be replaced by a JSON file, no API route that could be an inline function, no abstraction that adds complexity without adding value. The architecture is chosen for a 7-day solo build that needs to be production-deployable and maintainable by someone who has never seen the codebase.

### 4.2 High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                                                                  │
│            Next.js 14 App Router (React + TypeScript)            │
│            Tailwind CSS | Zustand | Framer Motion                │
└─────────────────────────┬────────────────────────────────────────┘
                          │  Internal Next.js API Routes
┌─────────────────────────▼────────────────────────────────────────┐
│                      API LAYER (Next.js)                         │
│                                                                  │
│   POST /api/run-audit      → Runs engine, saves audit, returns ID│
│   POST /api/capture-lead   → Saves email, triggers email send    │
│   GET  /api/audit/[id]     → Fetches public audit for share URL  │
│   POST /api/generate-summary → Calls Anthropic API, streams back │
└──────┬────────────────────────────────┬───────────────────────────┘
       │                                │
       ▼                                ▼
┌──────────────────────┐   ┌────────────────────────────────────────┐
│    AUDIT ENGINE      │   │           EXTERNAL SERVICES            │
│    (Pure TypeScript) │   │                                        │
│                      │   │  Anthropic Claude API (summary gen)    │
│  lib/audit-engine.ts │   │  Resend API (transactional email)      │
│  lib/pricing-data.ts │   │                                        │
│                      │   │                                        │
│  Input:  form data   │   │                                        │
│  Output: audit result│   │                                        │
└──────────────────────┘   └──────────────────┬─────────────────────┘
                                              │
                          ┌───────────────────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
          ▼                               ▼
┌─────────────────────┐       ┌──────────────────────┐
│      Supabase       │       │  Vercel Edge Network  │
│  (PostgreSQL)       │       │                       │
│                     │       │  Next.js deployed     │
│  Table: audits      │       │  OG image generation  │
│  Table: leads       │       │  Static assets CDN    │
│                     │       │                       │
└─────────────────────┘       └──────────────────────┘
```

### 4.3 Full Stack — Every Layer Named

```
┌──────────────────────────────────────────────────────────────────┐
│  LAYER              TECHNOLOGY              PURPOSE              │
├──────────────────────────────────────────────────────────────────┤
│  Framework          Next.js 14 App Router   Pages + API routes   │
│  Language           TypeScript              Type safety          │
│  Styling            Tailwind CSS            Utility-first CSS    │
│  Animation          Framer Motion           Results page motion  │
│  State              Zustand + localStorage  Form persistence     │
│  Validation         Zod                     Input + API schemas  │
│  Icons              Lucide React            UI iconography       │
├──────────────────────────────────────────────────────────────────┤
│  Database           Supabase (PostgreSQL)   Audits + leads store │
│  DB Client          @supabase/supabase-js   Typed DB queries     │
│  Email              Resend                  Transactional email  │
│  AI                 Anthropic Claude API    Summary generation   │
├──────────────────────────────────────────────────────────────────┤
│  Deploy             Vercel                  Hosting + CI/CD      │
│  CI                 GitHub Actions          Lint + test on push  │
│  Testing            Jest + ts-jest          Audit engine tests   │
│  Linting            ESLint + Prettier       Code quality         │
└──────────────────────────────────────────────────────────────────┘
```

### 4.4 Data Flow: From Form Input to Audit Result

```
USER FILLS FORM
    ↓
    FormData: [
      { tool: "cursor", plan: "pro", seats: 3, spend: 60, useCase: "coding" },
      { tool: "copilot", plan: "business", seats: 3, spend: 57, useCase: "coding" },
      { tool: "claude", plan: "pro", seats: 2, spend: 40, useCase: "writing" }
    ]
    teamSize: 8
    ↓
POST /api/run-audit
    ↓
    auditEngine(formData) → AuditResult
    ↓
    INSERT INTO audits (id, tools, savings, summary, created_at)
    ↓
    Return: { auditId: "abc123", result: AuditResult }
    ↓
Navigate to /audit/abc123
    ↓
POST /api/generate-summary (streams back)
    ↓
    Anthropic API → Claude → 100-word paragraph
    ↓
Results page renders fully
    ↓
User clicks "Email me this report"
    ↓
POST /api/capture-lead
    ↓
    INSERT INTO leads (email, company, role, audit_id)
    ↓
    Resend.send(email, auditSummary)
```

### 4.5 Why This Stack vs Alternatives

| Decision | Chose | Rejected | Reason |
|---|---|---|---|
| Framework | Next.js 14 | Vite + Express | API routes + frontend in one repo. No separate backend to deploy. |
| Database | Supabase | Firebase / Mongo | SQL, free tier, TypeScript client, instant setup. |
| Email | Resend | Postmark / SES | Best DX, generous free tier (100/day), React Email templates |
| State | Zustand | Redux / Context | Minimal boilerplate, localStorage middleware built-in |
| Styling | Tailwind | CSS Modules | Speed. Ship in 7 days. |
| Hosting | Vercel | Render / Fly.io | Native Next.js, global CDN, auto preview deployments |

### 4.6 What Would Change at 10,000 Audits/Day

```
CURRENT (MVP):
  Audit engine runs synchronously in API route — fine for <100/day
  Supabase free tier — fine for <50,000 rows
  Anthropic API called per audit — fine for <500/day

AT 10,000 AUDITS/DAY:
  1. Queue audit jobs → BullMQ + Redis (avoid Vercel timeout)
  2. Cache Anthropic responses for identical inputs → Redis
  3. Upgrade Supabase to Pro (connection pooling via PgBouncer)
  4. Move OG image generation to edge functions
  5. Rate limiting at CDN layer (Vercel WAF or Cloudflare)
  6. Separate read replicas for /audit/[id] public reads
```

---

## 5️⃣ FEATURE-BY-FEATURE TECHNICAL DESIGN

### 📦 FEATURE 1 — Spend Input Form

**Purpose:** Collect the user's complete AI tool stack cleanly, persist state across reloads, and make adding multiple tools feel fast and frictionless.

#### The Tools and Plans

```
CURSOR
  Plans: Hobby (Free) | Pro ($20/user/mo) | Business ($40/user/mo)
         | Enterprise (custom)
  Input: plan, seats, monthly spend

GITHUB COPILOT
  Plans: Individual ($10/user/mo) | Business ($19/user/mo)
         | Enterprise ($39/user/mo)
  Input: plan, seats, monthly spend

CLAUDE (Anthropic)
  Plans: Free | Pro ($20/user/mo) | Max ($100/user/mo)
         | Team ($30/user/mo, min 5 seats) | Enterprise (custom)
         | API Direct (enter monthly spend)
  Input: plan, seats (or spend for API), monthly spend

CHATGPT (OpenAI)
  Plans: Plus ($20/user/mo) | Team ($30/user/mo, min 2 seats)
         | Enterprise (custom) | API Direct (enter monthly spend)
  Input: plan, seats (or spend for API), monthly spend

ANTHROPIC API DIRECT
  Plans: Pay-as-you-go (per token)
  Input: monthly spend (estimated)

OPENAI API DIRECT
  Plans: Pay-as-you-go (per token)
  Input: monthly spend (estimated)

GEMINI (Google)
  Plans: Free | Advanced ($19.99/user/mo) | API (pay-as-you-go)
  Input: plan, seats, monthly spend

WINDSURF (Codeium)
  Plans: Free | Pro ($15/user/mo) | Teams ($35/user/mo)
  Input: plan, seats, monthly spend
```

#### Form State Schema (TypeScript)

```typescript
// types/form.ts

export type ToolId =
  | 'cursor'
  | 'copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic_api'
  | 'openai_api'
  | 'gemini'
  | 'windsurf';

export type UseCase =
  | 'coding'
  | 'writing'
  | 'data'
  | 'research'
  | 'mixed';

export interface ToolEntry {
  id: string;           // UUID — unique row identifier
  tool: ToolId;
  plan: string;         // e.g. "pro", "business", "api_direct"
  seats: number;
  monthlySpend: number; // USD, what they actually pay
  useCase: UseCase;
}

export interface FormState {
  tools: ToolEntry[];
  teamSize: number;
  primaryUseCase: UseCase;
}
```

#### Form Persistence — How It Works

```typescript
// store/form-store.ts (Zustand)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormState, ToolEntry } from '@/types/form';

interface FormStore extends FormState {
  addTool: (tool: ToolEntry) => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updates: Partial<ToolEntry>) => void;
  setTeamSize: (size: number) => void;
  reset: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      tools: [],
      teamSize: 1,
      primaryUseCase: 'mixed',
      addTool: (tool) =>
        set((state) => ({ tools: [...state.tools, tool] })),
      removeTool: (id) =>
        set((state) => ({ tools: state.tools.filter((t) => t.id !== id) })),
      updateTool: (id, updates) =>
        set((state) => ({
          tools: state.tools.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      setTeamSize: (size) => set({ teamSize: size }),
      reset: () => set({ tools: [], teamSize: 1 }),
    }),
    { name: 'spendlens-form' } // persists to localStorage under this key
  )
);
```

#### Form Validation (Zod)

```typescript
// lib/form-schema.ts

import { z } from 'zod';

export const ToolEntrySchema = z.object({
  id: z.string().uuid(),
  tool: z.enum(['cursor','copilot','claude','chatgpt',
                'anthropic_api','openai_api','gemini','windsurf']),
  plan: z.string().min(1),
  seats: z.number().int().min(1).max(10000),
  monthlySpend: z.number().min(0).max(1000000),
  useCase: z.enum(['coding','writing','data','research','mixed']),
});

export const FormStateSchema = z.object({
  tools: z.array(ToolEntrySchema).min(1, 'Add at least one tool'),
  teamSize: z.number().int().min(1),
  primaryUseCase: z.enum(['coding','writing','data','research','mixed']),
});
```

---

### 📦 FEATURE 2 — Audit Engine

**Purpose:** Pure TypeScript function that takes form data and returns a structured audit result. Hardcoded rules. No AI. Deterministic. Auditable. Defensible to a finance-literate reader.

#### Audit Result Schema

```typescript
// types/audit.ts

export interface ToolAuditResult {
  tool: ToolId;
  currentSpend: number;          // USD/month
  currentPlan: string;
  recommendedAction: string;     // "Keep" | "Downgrade to X" | "Switch to Y" | "Drop"
  recommendedPlan?: string;
  recommendedTool?: ToolId;
  monthlySavings: number;        // 0 if optimal
  annualSavings: number;
  reason: string;                // One sentence. Finance-literate.
  flag: 'optimal' | 'savings' | 'credits';
}

export interface AuditResult {
  toolResults: ToolAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  savingsFlag: 'high' | 'low' | 'optimal'; // high: >$500, low: <$100
  aiSummary?: string;            // Filled by Anthropic API call
  createdAt: string;
}
```

#### The Four Checks the Engine Runs Per Tool

```
CHECK 1 — IS THE PLAN RIGHT FOR THEIR SEAT COUNT?

  Rule: Claude Team requires minimum 5 seats at $30/seat
  If user has Claude Team with <5 seats:
    → Recommend: Claude Pro at $20/seat × actual seats
    → Savings: ($30 × seats) - ($20 × seats) = $10/seat/month
    → Reason: "Claude Team plan requires minimum 5 seats.
               With [N] users, Claude Pro at $20/seat
               delivers the same capability at $[X]/month less."

  Rule: ChatGPT Team minimum 2 seats
  If user has ChatGPT Team with 1 user:
    → Recommend: ChatGPT Plus at $20/month
    → Savings: $30 - $20 = $10/month
    → Reason: "ChatGPT Team is priced for 2+ users.
               Single-user Plus plan at $20/month is identical
               in functionality for a solo user."

CHECK 2 — IS THERE A CHEAPER PLAN FROM THE SAME VENDOR?

  Rule: Cursor Business ($40) vs Pro ($20)
  If user is on Cursor Business with ≤3 seats:
    → Recommend: Cursor Pro
    → Savings: $20/seat/month
    → Reason: "Cursor Business adds SSO, admin controls,
               and usage policies — features only relevant
               for teams >10. At [N] users, Pro is identical
               in coding capability at half the price."

  Rule: GitHub Copilot Enterprise ($39) vs Business ($19)
  If user is on Enterprise with ≤25 seats:
    → Recommend: Business
    → Savings: $20/seat/month
    → Reason: "Copilot Enterprise adds Copilot in GitHub.com
               and custom models — features teams under 25
               rarely fully utilize. Business plan is feature-
               complete for standard AI coding assistance."

CHECK 3 — IS THERE A SUBSTANTIALLY CHEAPER ALTERNATIVE?

  This check is USE CASE dependent:

  USE CASE: CODING
  If paying for GitHub Copilot Business ($19/seat) AND Cursor Pro ($20/seat):
    → Flag: Duplicate tools
    → Recommend: Drop Copilot, keep Cursor
    → Savings: $19/seat/month
    → Reason: "Cursor Pro and GitHub Copilot Business both
               provide inline AI coding assistance. With both
               active, you're paying for the same capability
               twice. Cursor has broader IDE support and
               richer context — Copilot adds nothing incremental."

  USE CASE: WRITING / RESEARCH
  If paying for ChatGPT Plus ($20) AND Claude Pro ($20):
    → Flag: Likely overlap
    → Recommend: Pick one based on use case
    → Reason: "Both tools cover general writing and research.
               Claude tends to be stronger for long documents;
               ChatGPT for structured outputs. Running both
               for the same use case duplicates cost.
               Consolidate to the one your team uses >80%."

  USE CASE: CODING — API DIRECT USAGE
  If paying >$200/month OpenAI API for coding assistance:
    → Flag: Consider Claude API
    → Reason: "For code generation at scale, Claude 3 Haiku
               via API costs ~$0.25/M input tokens vs
               GPT-4o-mini at ~$0.15/M. For Claude 3.5 Sonnet
               vs GPT-4o, Claude is comparable in price with
               documented coding benchmark leads.
               Worth a 30-day parallel test."

CHECK 4 — RETAIL PRICE WHEN CREDITS ARE AVAILABLE

  Threshold: Total AI spend > $500/month

  If totalMonthlySpend > 500:
    → Flag: 'credits'
    → Surface: Credex consultation CTA
    → Reason: "Your team is spending $[X]/month on AI tools
               at retail pricing. Credex specializes in
               discounted AI infrastructure credits — the
               same tools at 20–40% below retail for teams
               with committed spend. At your current run rate,
               that's $[Y]–$[Z] in annual savings beyond
               what's already identified above."
```

#### Engine Implementation Structure

```typescript
// lib/audit-engine.ts

import { PRICING } from './pricing-data';
import { FormState, ToolEntry } from '@/types/form';
import { AuditResult, ToolAuditResult } from '@/types/audit';

export function runAudit(form: FormState): AuditResult {
  const toolResults: ToolAuditResult[] = form.tools.map((tool) =>
    auditTool(tool, form)
  );

  // Duplicate tool check — cross-tool analysis
  const withDuplicates = checkDuplicates(toolResults, form.tools);

  const totalMonthlySavings = withDuplicates.reduce(
    (sum, r) => sum + r.monthlySavings, 0
  );

  return {
    toolResults: withDuplicates,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    savingsFlag:
      totalMonthlySavings > 500 ? 'high' :
      totalMonthlySavings < 100 ? 'low' : 'savings',
    createdAt: new Date().toISOString(),
  };
}

function auditTool(entry: ToolEntry, form: FormState): ToolAuditResult {
  // Routes to tool-specific audit function
  switch (entry.tool) {
    case 'cursor':     return auditCursor(entry, form);
    case 'copilot':    return auditCopilot(entry, form);
    case 'claude':     return auditClaude(entry, form);
    case 'chatgpt':    return auditChatGPT(entry, form);
    // ... etc
  }
}
```

#### Test Cases (Required 5 — Audit Engine)

```
TEST 1: Claude Team with 2 seats → recommends Pro, calculates correct savings
  Input:  { tool: 'claude', plan: 'team', seats: 2, spend: 60 }
  Expect: monthlySavings = 20, recommendedPlan = 'pro'

TEST 2: Cursor Business solo dev → recommends Pro
  Input:  { tool: 'cursor', plan: 'business', seats: 1, spend: 40 }
  Expect: monthlySavings = 20, recommendedPlan = 'pro'

TEST 3: Copilot + Cursor both present for coding team → flags duplicate
  Input:  tools: [copilot_business_5seats, cursor_pro_5seats]
  Expect: one tool flagged for removal, savings = $95/month

TEST 4: Already optimal plan → returns 0 savings, flag = 'optimal'
  Input:  { tool: 'claude', plan: 'pro', seats: 1, spend: 20 }
  Expect: monthlySavings = 0, flag = 'optimal'

TEST 5: Total spend > $500/month → credits flag fires
  Input:  total monthly spend across tools > 500
  Expect: savingsFlag = 'high', credits CTA triggered

BONUS TEST 6: Annual savings = monthly × 12
  Input:  any audit result with monthlySavings = 100
  Expect: annualSavings = 1200
```

---

### 📦 FEATURE 3 — Audit Results Page

**Purpose:** The page that gets screenshotted and shared. First impression for every cold visitor who clicks a shared link. Designed to be visually impactful, honest, and shareable.

#### Page Sections — Top to Bottom

```
SECTION 1: HERO NUMBERS (above the fold)
  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │     YOU COULD SAVE                              │
  │     $2,160 / year                               │
  │     ($180/month · Your 3-tool audit)            │
  │                                                 │
  └─────────────────────────────────────────────────┘
  Design note: The annual number is always bigger than the monthly.
  $2,160/year hits harder than $180/month. Same money, more impact.

SECTION 2: AI-GENERATED PERSONALIZED SUMMARY
  Rounded card, light background
  ~100 words in plain English
  Loading skeleton while Anthropic API responds
  Subtle "Generated by Claude" attribution

SECTION 3: PER-TOOL BREAKDOWN TABLE
  Each row: [Tool logo] [Current plan] [$spend] → [Action] [Savings] [Reason]
  Color coding:
    Green row  = savings identified
    Gray row   = already optimal ("You're spending well here")
    Orange row = credits opportunity

SECTION 4: CREDEX CTA (conditional on savingsFlag = 'high')
  ┌─────────────────────────────────────────────────┐
  │  🔑 Go further with Credex                      │
  │  Your team spends $620/month at retail pricing. │
  │  Credex offers discounted AI credits —          │
  │  the same tools, 20–40% below retail.           │
  │                                                 │
  │  [Book a free consultation →]                   │
  └─────────────────────────────────────────────────┘

SECTION 5: HONEST MESSAGE (if savingsFlag = 'low' or 'optimal')
  ┌─────────────────────────────────────────────────┐
  │  ✅ You're spending well                        │
  │  We didn't find significant waste in your       │
  │  stack. Keep an eye on seat counts as you grow. │
  │                                                 │
  │  [Notify me when new optimizations apply →]     │
  └─────────────────────────────────────────────────┘

SECTION 6: LEAD CAPTURE
  "Want this emailed to you?"
  Email input + optional company/role
  "Send my report" CTA
  Below the fold — value shown first, always.

SECTION 7: SHARE BANNER
  Your unique audit URL
  [Copy link] button
  "Share with your team"
```

#### Open Graph Tags

```typescript
// app/audit/[id]/page.tsx — generateMetadata()

export async function generateMetadata({ params }): Promise<Metadata> {
  const audit = await getAudit(params.id);

  return {
    title: `AI Spend Audit — Save $${audit.totalMonthlySavings}/month`,
    description: `This audit found $${audit.totalAnnualSavings}/year in potential AI tool savings. Run your free audit at SpendLens.`,
    openGraph: {
      title: `I could save $${audit.totalMonthlySavings}/month on AI tools`,
      description: `Free audit by SpendLens — ${audit.toolResults.length} tools reviewed`,
      images: [`/api/og?savings=${audit.totalMonthlySavings}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `My AI spend audit found $${audit.totalAnnualSavings}/year in savings`,
    },
  };
}
```

---

### 📦 FEATURE 4 — AI-Generated Personalized Summary

**Purpose:** Use Claude to generate a natural language paragraph that feels personal to the user's specific stack. One genuine AI feature in the entire product.

#### Why AI Here (and Only Here)

```
The audit math is deterministic. Rules are correct for finance logic.
But the final summary paragraph — the one that gets read and shared —
benefits from natural language that acknowledges the user's specific
situation:

BAD (template): "You could save $180/month."

GOOD (Claude):  "Your team is paying for overlapping coding assistance.
                 Cursor Pro and GitHub Copilot Business both deliver
                 inline AI pair-programming, and with a 3-person
                 engineering team, there is no workflow that requires
                 both running simultaneously..."

The difference is the difference between a spreadsheet and a consultant.
```

#### The Prompt (Full — Goes in PROMPTS.md)

```
SYSTEM:
You are a senior engineering manager reviewing an AI tool spend audit
for a startup. Your job is to write a single paragraph (90–110 words)
that explains the most important finding in plain English.

Be specific about the tools named. Be honest — if they are spending
well, say so. Do not invent savings. Do not be salesy.
Write in second person ("Your team...").
Do not use bullet points. Write one flowing paragraph only.
Do not begin with "I" or "Based on".

USER:
Here is the audit result:

Team size: {teamSize}
Primary use case: {primaryUseCase}

Tool breakdown:
{toolResults.map(r =>
  `- ${r.tool} (${r.currentPlan}): $${r.currentSpend}/month
   Action: ${r.recommendedAction}
   Savings: $${r.monthlySavings}/month
   Reason: ${r.reason}`
).join('\n')}

Total monthly savings identified: $${totalMonthlySavings}
Total annual savings identified: $${totalAnnualSavings}

Write the summary paragraph now.
```

#### Graceful Fallback

```typescript
// lib/generate-summary.ts

export async function generateSummary(audit: AuditResult): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [{ role: 'user', content: buildPrompt(audit) }],
      }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    return data.content[0].text;

  } catch (error) {
    // Fallback: template-based summary — never crashes the page
    return buildTemplateSummary(audit);
  }
}

function buildTemplateSummary(audit: AuditResult): string {
  if (audit.totalMonthlySavings === 0) {
    return `Your AI tool stack looks well-optimized. You're on appropriate plans for your team size and we found no significant duplicate coverage across your ${audit.toolResults.length} tools. Keep monitoring seat counts as your team grows — plan minimums can create waste quickly when headcount changes.`;
  }

  const topSaving = [...audit.toolResults]
    .sort((a, b) => b.monthlySavings - a.monthlySavings)[0];

  return `Your audit identified $${audit.totalMonthlySavings}/month ($${audit.totalAnnualSavings}/year) in potential savings across ${audit.toolResults.length} tools. The largest opportunity is ${topSaving.tool}: ${topSaving.reason} This audit covers plan optimization only — if your total AI spend is significant, discounted credits through providers like Credex can compound these savings further.`;
}
```

---

### 📦 FEATURE 5 — Lead Capture + Storage

**Purpose:** Capture email after value is shown, store in Supabase, send transactional email, protect against abuse.

#### Database Schema

```sql
-- Supabase SQL — run in dashboard

CREATE TABLE audits (
  id            TEXT PRIMARY KEY,        -- nanoid, 12 chars
  tools         JSONB NOT NULL,          -- ToolEntry[]
  result        JSONB NOT NULL,          -- AuditResult (no email)
  team_size     INTEGER,
  use_case      TEXT,
  total_savings INTEGER,                 -- monthly, USD
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id      TEXT REFERENCES audits(id),
  email         TEXT NOT NULL,
  company       TEXT,
  role          TEXT,
  team_size     INTEGER,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast audit lookup by public URL
CREATE INDEX idx_audits_created ON audits(created_at DESC);

-- Prevent duplicate email capture per audit
CREATE UNIQUE INDEX idx_leads_email_audit ON leads(email, audit_id);
```

#### Abuse Protection — Honeypot Pattern

```typescript
// The honeypot approach: simplest, zero friction for real users

// In the form (HTML):
// Hidden input that CSS hides — bots fill it, humans never see it
// <input name="website" style={{ display: 'none' }} tabIndex={-1} />

// In the API route:
export async function POST(request: Request) {
  const body = await request.json();

  // Honeypot check — if this field is filled, it's a bot
  if (body.website && body.website.length > 0) {
    // Return 200 silently — don't tell the bot it failed
    return Response.json({ success: true });
  }

  // Continue with real lead processing...
}
```

**Why honeypot over hCaptcha:**
hCaptcha adds a user-facing challenge. Honeypots have zero friction for real users and stop 95%+ of automated form submissions. For an early-stage tool where trust is being built, adding a CAPTCHA introduces friction before value is proven. Document this decision in ARCHITECTURE.md.

#### Transactional Email Template

```
Subject: Your AI Spend Audit from SpendLens

Hi [first name or "there"],

Here's a summary of your audit:

POTENTIAL SAVINGS: $[X]/month · $[Y]/year

[Per-tool breakdown: 3 lines max]

Your shareable audit link: [URL]

[IF high savings]:
Your team's AI spend is significant enough that discounted
credits could save you an additional 20-40%. The team at
Credex specializes in exactly this — reply to this email
or book a call: [link]

[IF optimal]:
You're already spending well. We'll let you know if new
optimization opportunities apply to your stack.

— SpendLens (powered by Credex)
```

---

### 📦 FEATURE 6 — Shareable Result URL

**Purpose:** Every audit gets a permanent public URL. Identifying info stripped. Savings numbers shown. Designed to be shared in Slack, on Twitter, in blog posts.

#### URL Generation

```typescript
// lib/generate-id.ts
import { nanoid } from 'nanoid';

// 12-character alphanumeric — collision-resistant for billions of IDs
// Readable in a URL, short enough to share
export const generateAuditId = () => nanoid(12);

// Result: /audit/V7dKpQ2mNx8w
```

#### What the Public URL Shows vs Hides

```
PUBLIC URL (/audit/[id]) — SHOWS:
  ✅ Tool names and plans audited
  ✅ Per-tool monthly savings
  ✅ Total monthly + annual savings
  ✅ Recommended actions
  ✅ AI-generated summary
  ✅ "Run your own audit" CTA

PUBLIC URL — HIDES:
  ❌ Email address
  ❌ Company name
  ❌ Role
  ❌ Any personally identifying information
```

---

## 6️⃣ DATABASE DESIGN

### 6.1 Supabase Tables — Full Schema

```
TABLE: audits
┌─────────────────┬───────────┬─────────────────────────────────┐
│ Column          │ Type      │ Notes                           │
├─────────────────┼───────────┼─────────────────────────────────┤
│ id              │ TEXT PK   │ nanoid(12) — public URL segment │
│ tools           │ JSONB     │ ToolEntry[] — what they entered │
│ result          │ JSONB     │ AuditResult (no email/company)  │
│ team_size       │ INTEGER   │ From form                       │
│ use_case        │ TEXT      │ coding/writing/data/research    │
│ total_savings   │ INTEGER   │ Monthly USD — for quick queries │
│ ai_summary      │ TEXT      │ Claude-generated paragraph      │
│ created_at      │ TIMESTAMPTZ│ Auto-set                      │
└─────────────────┴───────────┴─────────────────────────────────┘

TABLE: leads
┌─────────────────┬───────────┬─────────────────────────────────┐
│ Column          │ Type      │ Notes                           │
├─────────────────┼───────────┼─────────────────────────────────┤
│ id              │ UUID PK   │ gen_random_uuid()               │
│ audit_id        │ TEXT FK   │ → audits.id                     │
│ email           │ TEXT      │ Required                        │
│ company         │ TEXT      │ Optional                        │
│ role            │ TEXT      │ Optional                        │
│ team_size       │ INTEGER   │ Optional (may differ from audit)│
│ email_sent      │ BOOLEAN   │ Track delivery status           │
│ created_at      │ TIMESTAMPTZ│ Auto-set                      │
└─────────────────┴───────────┴─────────────────────────────────┘
```

---

## 7️⃣ API DOCUMENTATION

```
POST /api/run-audit
  Body:    FormState (validated with Zod)
  Action:  Runs audit engine → saves to audits table → returns audit ID
  Returns: { auditId: string, result: AuditResult }
  Time:    <200ms (no external API calls)

POST /api/generate-summary
  Body:    { auditId: string }
  Action:  Calls Anthropic API → updates audit.ai_summary in DB
  Returns: { summary: string } (or fallback template)
  Time:    2–8 seconds (streams if implemented)

GET /api/audit/[id]
  Action:  Fetches audit by ID, strips any lead data
  Returns: Public AuditResult (no email/company)
  Cache:   60 seconds (results don't change)

POST /api/capture-lead
  Body:    { auditId, email, company?, role?, teamSize?, honeypot? }
  Action:  Honeypot check → save lead → send email via Resend
  Returns: { success: boolean }
  Rate:    5 per IP per hour
```

---

## 8️⃣ FRONTEND DESIGN PLAN — ALL SCREENS

### Screen 1: Landing Page (Home)

```
┌──────────────────────────────────────────────────────────┐
│  SpendLens                              [How it works]   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   Find Out Exactly Where Your                            │
│   AI Budget Is Leaking                                   │
│                                                          │
│   Free audit. No login. Results in 90 seconds.           │
│                                                          │
│           [Start My Free Audit →]                        │
│                                                          │
│   ─────────────────────────────────────────────────      │
│                                                          │
│   [Cursor logo] [Claude logo] [ChatGPT logo]             │
│   [Copilot logo] [Gemini logo] [Windsurf logo]           │
│                                                          │
│   "Stop paying for 4 tools when 2 would do."            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Screen 2: Spend Input Form

```
┌──────────────────────────────────────────────────────────┐
│  What AI tools does your team pay for?                   │
│  ─────────────────────────────────────────────────────   │
│                                                          │
│  Team size: [  8  ]   Primary use case: [Coding ▼]      │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ [Cursor ▼]  [Pro ▼]   Seats: [3]  $/mo: [$60  ]  │  │
│  └──────────────────────────────────────────────── [✕]┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ [Copilot▼] [Business▼] Seats: [3] $/mo: [$57  ]  │  │
│  └──────────────────────────────────────────────── [✕]┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ [Claude ▼] [Pro   ▼]  Seats: [2]  $/mo: [$40  ]  │  │
│  └──────────────────────────────────────────────── [✕]┘  │
│                                                          │
│  [+ Add another tool]          Running total: $157/mo    │
│                                                          │
│  ─────────────────────────────────────────────────────   │
│                [  Run My Audit  →  ]                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Screen 3: Results Page

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                  YOU COULD SAVE                          │
│                  $684 / year                             │
│             ($57/month · 3 tools audited)                │
│                                                          │
│  ─────────────────────────────────────────────────────   │
│  [AI Summary card — loading skeleton → paragraph]        │
│  ─────────────────────────────────────────────────────   │
│                                                          │
│  Tool           Plan      Spend    Action        Saves   │
│  ─────────────────────────────────────────────────────   │
│  ✅ Cursor Pro   Pro ×3   $60/mo  Keep             —    │
│  ⚠️  Copilot Biz  Biz ×3  $57/mo  Drop (duplicate) $57  │
│  ✅ Claude Pro   Pro ×2   $40/mo  Keep             —    │
│                                                          │
│  ─────────────────────────────────────────────────────   │
│  📤 Share this audit: spendlens.app/audit/V7dKpQ2mNx8w  │
│  [Copy link]                                             │
│  ─────────────────────────────────────────────────────   │
│  📧 Email me this report                                 │
│  [your@email.com          ]  [Send Report]               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 9️⃣ ENTREPRENEURIAL ANALYSIS

### 9.1 GTM — Go-to-Market Plan

**The Exact Target User:**
Engineering manager at a Series A SaaS company, 10–30 engineers, just been asked by the CFO to find cost-cutting opportunities without hurting velocity. They pay for AI tools but have never looked at the stack critically. They are not a financial person — they bought tools one at a time based on recommendations, never thinking about the aggregate.

**What They Google/Scroll Before Wanting This:**
- "cursor vs github copilot 2025"
- "is claude pro worth it for teams"
- "cutting ai tool costs startup"
- "best ai coding assistant for small team"
- CFO sends a Slack with "can we review software spend" — then they go Googling

**Where They Hang Out Online:**
- Specific: r/ExperiencedDevs, r/cscareerquestions (senior engineers)
- HackerNews "Ask HN: How do you manage AI tool costs?"
- Rands Leadership Slack (engineering managers)
- Lenny's Slack (#tools channel)
- Twitter/X — anyone who tweets about Cursor, Claude, or AI dev tools
- YC alumni Slack — founders actively cutting burn

**First 100 Users in 30 Days — $0 Budget:**

```
Week 1 (users 1–20):
  → Post on HN "Show HN: I built a free AI spend auditor
    for dev teams" — target 30+ upvotes
  → Post in r/ExperiencedDevs with specific savings examples
    ("Found I was paying for Copilot + Cursor — dropped Copilot,
    saved $228/year per developer")
  → DM 20 indie founders on X who have tweeted about AI costs
    in the last 30 days

Week 2 (users 21–50):
  → Reach out to 5 developer-focused newsletter authors
    (TLDR, Bytes.dev, Cooper's Daily Digest) with a
    "tool tip" submission — most run free community submissions
  → Find 10 tweets complaining about AI tool costs,
    reply with the audit tool link
  → Post in Lenny's Slack #tools channel

Week 3 (users 51–80):
  → Audit your own company's stack and write a 400-word
    Twitter/X thread: "I audited my team's AI spend.
    Here's what I found." — include the shareable audit URL
  → Submit to Product Hunt "upcoming" for a scheduled launch

Week 4 (users 81–100+):
  → Product Hunt launch day
  → All prior channels reshare for PH day bump
```

**The Unfair Distribution Channel:**
Credex already has relationships with companies that buy AI credits. Every existing Credex customer is a potential SpendLens user — and every SpendLens user who discovers $500+/month in savings is a warm Credex lead. The inbound-to-sales loop is the unfair channel: competitors would need to build the sales relationship from scratch; Credex already has it.

**Week-1 Traction If This Works:**
- 200+ audits completed
- 40+ email captures
- 5+ inbound consultation requests
- 3+ organic tweets sharing audit URLs
- HN "Show HN" in top 30 for the day

---

### 9.2 ECONOMICS — Unit Economics

**What a Converted Lead is Worth to Credex:**

```
Assumption: Credex earns margin on discounted AI credits.
Conservative margin: 10–15% on face value of credits sold.

Scenario A (small team, $500/mo AI spend):
  Credex credits sold: $500 × 12 months = $6,000/year
  At 12% margin: $720 LTV (year 1)
  If 30% retain year 2: $720 + ($720 × 0.30) = $936 LTV

Scenario B (mid-size team, $2,000/mo AI spend):
  Credits sold: $24,000/year
  At 12% margin: $2,880 LTV (year 1)

Scenario C (growth-stage, $10,000/mo AI spend):
  Credits sold: $120,000/year
  At 12% margin: $14,400 LTV (year 1)

Blended LTV assumption (mostly Scenario A/B): ~$1,200/converted customer
```

**The Funnel Math:**

```
1,000 audits completed
  → 15% email capture rate = 150 leads
  → 20% of leads book consultation (30 consultations)
  → 40% of consultations convert to credit purchase (12 customers)
  → Blended LTV $1,200

Revenue from 1,000 audits = 12 × $1,200 = $14,400

CAC per customer via this channel = $0 (tool is free, no paid media)
Margin on $14,400 = effectively 100% (minus tool hosting ~$20/month)
```

**$1M ARR in 18 Months — What Has to Be True:**

```
Need: ~833 paying customers at $1,200 blended LTV/year
     OR ~415 customers at $2,400 LTV (higher-spend teams)

From funnel: need 69,000 audits at 1.2% conversion
OR: improve conversion (better Credex CTA) to get same result from 35,000 audits

What has to be true:
1. SpendLens reaches 5,000 audits/month by month 6
   (plausible with PH launch + SEO + referral loop)
2. Consultation booking rate holds at 20%+
   (requires fast, genuine Credex follow-up — not cold outreach)
3. Credex credit sales process closes at 40%+
   (requires real discount to be compelling vs. retail)
4. The tool becomes self-referral — shared audit URLs drive
   organic audits at 10%+ of total (the viral coefficient)
```

---

## 🔟 COMPETITIVE ANALYSIS

```
┌────────────────────┬────────────┬────────────┬────────────┬──────────────┐
│  Feature           │  Spendesk  │ Ramp       │ Manually   │ SpendLens    │
│                    │            │ (SaaS intel)│ in Sheets │ (You)        │
├────────────────────┼────────────┼────────────┼────────────┼──────────────┤
│ Free, no login     │     ❌     │     ❌     │     ✅     │      ✅      │
│ AI-tool-specific   │     ❌     │     ❌     │     ✅     │      ✅      │
│ Audit in 90 sec    │     ❌     │     ❌     │     ❌     │      ✅      │
│ Per-plan reasoning │     ❌     │     ❌     │     ❌     │      ✅      │
│ Use-case matching  │     ❌     │     ❌     │     ❌     │      ✅      │
│ Shareable URL      │     ❌     │     ❌     │     ❌     │      ✅      │
│ OG preview sharing │     ❌     │     ❌     │     ❌     │      ✅      │
│ Email report       │     ❌     │     ❌     │     ❌     │      ✅      │
│ Credex credits CTA │     ❌     │     ❌     │     ❌     │      ✅      │
│ Viral loop built-in│     ❌     │     ❌     │     ❌     │      ✅      │
├────────────────────┼────────────┼────────────┼────────────┼──────────────┤
│ ZERO FRICTION      │     ❌     │     ❌     │     ❌     │      ✅      │
└────────────────────┴────────────┴────────────┴────────────┴──────────────┘

The zero-friction, no-login, free-before-gate position is the
unique entry advantage. Every competitor either requires a login,
costs money, or is a general expense tool — not AI-specific.

The use-case matching (coding vs writing vs research) is what makes
recommendations defensible. No spreadsheet or generic SaaS tool
does this — it requires knowing the product landscape.
```

---

## 1️⃣1️⃣ RISK ASSESSMENT & MITIGATION

| Risk | Probability | Mitigation |
|---|---|---|
| Anthropic API rate limit during review | Medium | Fallback template summary built. API failure returns a clean, readable template — page never crashes or shows an error to the reviewer. |
| Pricing data out of date | Medium | PRICING_DATA.md documents every price with URL and capture date. Review is done day of submission. Any price change in final 24 hours gets a note in DEVLOG.md. |
| Supabase free tier row limits | Low | 500MB free tier. At ~2KB per audit row, supports 250,000 audits before hitting limits. Not a concern for 7-day review. |
| Resend email delivery rate | Low | Resend free tier has high deliverability (SPF/DKIM handled). Test with 3 real email providers (Gmail, Outlook, iCloud) before submission. |
| CI failing on submission day | Medium | Run `npm test` and `npm run lint` locally before every push to main. Never push to main without local test pass. |
| Lighthouse score below threshold | Medium | Test mobile Lighthouse from day 4 onward. Common failures: missing alt text, non-semantic HTML, render-blocking scripts. Fix early. |
| Git commit count below 5 days | High (if left late) | Commit every single day. The check is programmatic. Even a docs-only commit on a slow day satisfies the requirement. |
| Fabricated user interviews detected | Instant reject | Talk to real people. Start reaching out on Day 1. 10 minutes each. Three conversations. The quality of the quotes is the signal. |

---

## 1️⃣2️⃣ FUTURE SCOPE — WEEK 2 AND BEYOND

### Phase 2 — Week 2 (If Extended)

- **PDF export:** Full audit report as downloadable PDF. ReportLab (Python) or Puppeteer (Node) to render the results page as PDF. Adds value for founders sharing with CFOs.
- **Benchmark mode:** "Your AI spend per developer is $X/month. Teams your size average $Y." Requires an aggregate of audit data — possible after 100+ audits are in the database.
- **Embeddable widget:** A `<script>` tag a blogger or tool-review site can embed. Opens a lightweight modal with the form. Dramatically expands distribution.

### Phase 3 — Month 1 to 3

- **Referral codes:** Share the audit URL with a referral code embedded. Both parties get a benefit (e.g., early access to benchmark data). Drives compounding organic growth.
- **API pricing sync:** Automated weekly pull from vendor pricing pages via web scraping. Flag in the UI when a price was last verified — builds trust.
- **Credex consultation scheduling:** In-product Calendly or Cal.com integration for high-savings users. Removes the friction of leaving the page to book.

### Phase 4 — Month 3 to 6

- **Multi-user workspace audits:** Allow a team to collaboratively build their audit, with each person adding their own tools. Aggregate view for the engineering manager.
- **Spend tracking over time:** Monthly email: "Your AI spend changed. Here's what's new." Turns a one-time audit into a recurring touchpoint.
- **Credex white-label:** SpendLens as a white-labeled tool that Credex's enterprise partners can embed in their own portals.

---

## 1️⃣3️⃣ REQUIRED FILE INDEX

All files must exist at repo root on submission day. This table is the checklist.

```
┌──────────────────────┬──────────────────────────────────────────────┐
│ File                 │ What Goes In It                              │
├──────────────────────┼──────────────────────────────────────────────┤
│ README.md            │ 2-3 sentence summary, screenshots, quick     │
│                      │ start, 5 trade-off decisions, deployed URL   │
├──────────────────────┼──────────────────────────────────────────────┤
│ ARCHITECTURE.md      │ Mermaid diagram, data flow, stack choices,   │
│                      │ 10k/day scaling plan                         │
├──────────────────────┼──────────────────────────────────────────────┤
│ DEVLOG.md            │ 7 entries, exact format, one per day         │
│                      │ (## Day N — YYYY-MM-DD format)               │
├──────────────────────┼──────────────────────────────────────────────┤
│ REFLECTION.md        │ 5 questions, 150-400 words each              │
├──────────────────────┼──────────────────────────────────────────────┤
│ TESTS.md             │ List of all tests, filenames, how to run     │
├──────────────────────┼──────────────────────────────────────────────┤
│ PRICING_DATA.md      │ Every price, official URL, date captured     │
├──────────────────────┼──────────────────────────────────────────────┤
│ PROMPTS.md           │ Full Anthropic prompts, reasoning,           │
│                      │ what didn't work                             │
├──────────────────────┼──────────────────────────────────────────────┤
│ GTM.md               │ Exact user, specific channels, first 100     │
│                      │ users plan, unfair channel                   │
├──────────────────────┼──────────────────────────────────────────────┤
│ ECONOMICS.md         │ LTV math, CAC per channel, $1M ARR path      │
├──────────────────────┼──────────────────────────────────────────────┤
│ USER_INTERVIEWS.md   │ 3 real interviews, quotes, what changed      │
├──────────────────────┼──────────────────────────────────────────────┤
│ LANDING_COPY.md      │ Headline ≤10 words, subheadline ≤25 words,  │
│                      │ CTA, social proof block, 5 FAQs              │
├──────────────────────┼──────────────────────────────────────────────┤
│ METRICS.md           │ North Star, 3 input metrics, pivot trigger   │
├──────────────────────┼──────────────────────────────────────────────┤
│ .github/workflows/   │ ci.yml: lint + test on push to main          │
│ ci.yml               │                                              │
└──────────────────────┴──────────────────────────────────────────────┘
```

---

## 📌 FINAL SUMMARY

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  💸 SPENDLENS — PROJECT SUMMARY                                  │
│                                                                  │
│  Domain          : AI Infrastructure / SaaS Finance             │
│  Core Mechanic   : Free audit → genuine value → warm lead       │
│  Viral Loop      : Shareable URL → OG preview → new audits      │
│                                                                  │
│  FULL STACK:                                                     │
│  Frontend  : Next.js 14 + TypeScript + Tailwind + Framer Motion │
│  State     : Zustand + localStorage (form persistence)          │
│  Backend   : Next.js API Routes (no separate server)            │
│  Validation: Zod (forms + API schemas)                          │
│  Database  : Supabase (PostgreSQL) — audits + leads             │
│  AI Layer  : Anthropic Claude API (summary generation only)     │
│  Email     : Resend (transactional)                             │
│  Hosting   : Vercel (auto-deploy from GitHub)                   │
│  CI        : GitHub Actions (lint + test on every push)         │
│  Testing   : Jest + ts-jest (≥5 audit engine tests)             │
│                                                                  │
│  6 MVP FEATURES (all required):                                  │
│  → Spend input form — 8 tools, state persistence               │
│  → Audit engine — hardcoded rules, finance-defensible          │
│  → Results page — shareable, visually impactful                │
│  → AI summary — Claude API with graceful fallback              │
│  → Lead capture — Supabase + Resend + honeypot                 │
│  → Shareable URL — OG tags + Twitter card + public stripping   │
│                                                                  │
│  UNIQUE VALUE (3 things competitors don't do):                   │
│  → Zero friction — no login, value before email gate           │
│  → Use-case matching — coding ≠ writing in recommendations     │
│  → Honest audits — "You're spending well" when true            │
│                                                                  │
│  QUANTIFIED FUNNEL (per 1,000 audits):                          │
│  → 1,000 audits → 150 leads (15% capture)                     │
│  → 150 leads → 30 consultations (20%)                         │
│  → 30 consultations → 12 customers (40%)                      │
│  → 12 customers × $1,200 LTV = $14,400 revenue               │
│  → CAC = $0 (free tool, no paid media)                        │
│                                                                  │
│  CREDEX ANGLE:                                                   │
│  → Audit surfaces overspend Credex can solve                   │
│  → $500+/month users see Credex CTA immediately               │
│  → Shared audit URLs drive organic reach                       │
│  → Tool is plausibly Product Hunt-launchable in 7 days         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---
