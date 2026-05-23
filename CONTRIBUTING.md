# Contributing to SpendLens

First off, thank you for considering contributing to SpendLens! It's people like you that make SpendLens such a great tool.

## Updating Pricing Data
The most common contribution is updating pricing data. If a vendor changes their pricing:
1. Open the relevant file in `data/pricing/`.
2. Update the `pricePerSeat` or `features` array.
3. Update the `lastVerified` date to today's date.
4. Submit a Pull Request.

## Local Development
1. Clone the repo.
2. Run `npm install` in the `frontend/` directory.
3. Copy `frontend/.env.example` to `frontend/.env.local` and add your keys.
4. Run `npm run dev`.

## Pull Request Process
1. Ensure any changes to the Audit Engine logic (`frontend/src/lib/audit-engine.ts`) pass all unit tests.
2. Run `npm test` locally before pushing.
3. Your PR must pass the GitHub Actions CI pipeline (Lint + Typecheck + Test).
4. Update the `CHANGELOG.md` with your changes.
