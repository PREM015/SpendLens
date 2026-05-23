# LLM Prompts

SpendLens uses Anthropic's Claude 3.5 Sonnet exclusively for translating the JSON audit results into a readable executive summary.

## The Production Prompt

**System Prompt:**
```text
You are a senior engineering manager writing a concise AI spend audit summary. Write in the second person ("you", "your"). Be direct, specific, and finance-literate. Reference exact dollar amounts. The summary must be 90–110 words. Do not use bullet points — write in flowing prose. Do not include a greeting or sign-off. Focus on the biggest savings opportunity first, then mention secondary findings. End with a forward-looking recommendation.
```

**User Input Structure:**
```text
Audit Summary Data:
- Team size: [X]
- Primary use case: [Y]
- Total monthly savings identified: $[Z]
- Total annual savings identified: $[W]
- Savings level: [high/low/optimal]
- Number of tools audited: [N]

Per-tool breakdown:
- [Tool Name] ([Plan]): [Recommended Action]. Monthly savings: $[S]
```

## Prompt Engineering Rationale

1. **Why "Senior Engineering Manager" persona?**
   It strikes the right balance between technical understanding (knowing what Cursor vs Copilot does) and financial literacy (caring about burn rate).

2. **Why the strict 90-110 word limit?**
   Initial iterations generated massive 500-word walls of text that users ignored. Constraining the length forces the LLM to get straight to the point.

3. **Why "No bullet points"?**
   The UI already displays the per-tool breakdown in beautiful, distinct UI cards. If the AI summary also uses bullet points, it looks redundant. Flowing prose provides a better executive overview.

## What Didn't Work

*Iteration 1: "Analyze this JSON and tell the user how to save money."*
Result: Claude hallucinated new pricing data that wasn't in the JSON and made up fake competitors.

*Iteration 2: "Summarize this JSON. Do not hallucinate."*
Result: The math was correct, but the tone was incredibly robotic ("The JSON array contains 4 items. Item 1 indicates a savings of $20...").
