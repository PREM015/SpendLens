# SpendLens Development Log

## Day 1 — 2026-05-21
**Hours worked:** 4
**What I did:** Bootstrapped the Next.js 14 frontend and Python FastAPI backend. Configured Tailwind v4 and set up the basic project structure. Started planning the data models and how the Audit Engine will work without relying on AI.
**What I learned:** Setting up a monorepo structure with Docker Compose from day one makes everything much easier. I also decided to use Zustand for frontend state instead of context to avoid re-renders on the complex multi-row form.
**Blockers / what I'm stuck on:** Figuring out the best way to handle the pricing data. Should I store it in a database or hardcode it?
**Plan for tomorrow:** Build the MVP input form and define the hardcoded pricing logic structure.

## Day 2 — 2026-05-22
**Hours worked:** 5
**What I did:** Implemented the core Audit Engine logic in TypeScript. It now accurately detects if someone is overpaying for Cursor (Pro vs Business) and Copilot based on seat counts. Wrote 15+ automated tests for the engine to ensure the math is rock solid.
**What I learned:** It is very tricky to map "use cases" to "alternative tools". I decided to use a strict mapping matrix so the recommendations are defensible.
**Blockers / what I'm stuck on:** The UI for adding multiple tools dynamically is a bit clunky.
**Plan for tomorrow:** Build the dashboard results page and integrate the Recharts area charts.

## Day 3 — 2026-05-23
**Hours worked:** 6
**What I did:** Built the Results Dashboard with Recharts to show the current vs optimized trajectory. Integrated Anthropic's Claude 3.5 Sonnet to generate the 100-word personalized summary. Hooked up Supabase to store the lead data and the audit results.
**What I learned:** Dealing with LLM latency during a loading state requires good UI design (used a skeleton shimmer effect). I also learned how to use Next.js server actions effectively for the Supabase insertion.
**Blockers / what I'm stuck on:** Figuring out how to generate a unique public URL that strips PII (emails).
**Plan for tomorrow:** Finalize the public shareable URL, Open Graph tags, and lead capture email flow via Resend.

## Day 4 — 2026-05-24
**Hours worked:** 4
**What I did:** Implemented the shareable `/share/[token]` route. It successfully strips out the user's email while displaying the audit results. Configured Resend to send the transactional email. Spent time polishing the Landing Page with Framer Motion animations.
**What I learned:** Generating dynamic Open Graph images requires absolute URLs, which was tricky in localhost but worked perfectly once pushed to staging.
**Blockers / what I'm stuck on:** Multi-language and currency support is requested by a few early testers.
**Plan for tomorrow:** Finalize deployment, wrap up the multi-language support, and submit the project.

## Day 5 — 2026-05-25
**Hours worked:** 3
**What I did:** Added i18n multi-language support and currency toggles. Fixed a critical Tailwind v4 dark mode bug where `class="dark"` wasn't applying correctly without `@custom-variant`. Deployed the application and verified everything works end-to-end. Preparing final submission.
**What I learned:** Tailwind v4 changed how class-based dark mode works under the hood, requiring an explicit configuration in globals.css.
**Blockers / what I'm stuck on:** None! The project is fully ready for submission at 14:00 today.
**Plan for tomorrow:** Submitting early.

## Day 6 — 2026-05-26
**Hours worked:** 0
**What I did:** Took the day off since the project was completed and submitted on Day 5.
**What I learned:** N/A
**Blockers / what I'm stuck on:** N/A
**Plan for tomorrow:** Rest.

## Day 7 — 2026-05-27
**Hours worked:** 0
**What I did:** Project submitted early.
**What I learned:** N/A
**Blockers / what I'm stuck on:** N/A
**Plan for tomorrow:** Await feedback.
