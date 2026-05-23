# Testing Strategy

Due to the 7-day timeline, automated testing is focused entirely on the core business logic: the Audit Engine.

## Test Files

All test files are located in `frontend/src/__tests__/`:

1. `audit-engine.test.ts`
   - Tests the 4 core checks (Plan fit, Downgrade, Alternatives, Credits).
   - Tests duplicate detection.
   - Tests annual savings math.

2. `formatCurrency.test.ts`
   - Tests the currency formatting utility.

3. `validators.test.ts`
   - Tests Zod schemas for the form and lead capture.

## How to Run

From the `frontend` directory:
```bash
npm run test
```

## Coverage Goal
The MVP requires 100% coverage on `audit-engine.ts` as it contains the core financial logic. Component testing is deferred to post-MVP.
