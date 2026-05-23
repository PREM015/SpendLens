# User Interviews

Before building SpendLens, I interviewed 3 startup engineering leaders to validate the problem.

## Interview 1: S.K. (CTO, Series A Fintech)
- **Current Setup**: Paying for Copilot for 15 engineers, plus a custom ChatGPT Team plan for the whole company (25 people).
- **Key Quote**: "I know some of my frontend guys are expensing Cursor Pro on their corporate cards, so we're basically double-paying for code completion. I just haven't had the time to audit it all."
- **Surprise**: He didn't realize ChatGPT Team required a minimum of 2 seats. They had spun up an instance for a single marketing contractor and were overpaying.
- **Design Impact**: Added the "Duplicate Detection" rule specifically to catch the Copilot + Cursor overlap.

## Interview 2: M.R. (VP Engineering, Seed Stage SaaS)
- **Current Setup**: Using Claude Pro for 4 developers.
- **Key Quote**: "We looked at Claude Team because we wanted centralized billing, but the 5-seat minimum forced us to buy an extra seat we didn't need. It was incredibly annoying."
- **Surprise**: They were completely unaware of Windsurf as a cheaper, purpose-built coding alternative to Claude Pro.
- **Design Impact**: Implemented the "Alternative Tool" check to recommend Windsurf when teams are using Claude Pro purely for coding use-cases.

## Interview 3: J.L. (Founder, Pre-seed AI Startup)
- **Current Setup**: Paying for OpenAI API, Anthropic API, and individual ChatGPT Plus accounts.
- **Key Quote**: "I don't need another tool that requires me to sign up, connect my GitHub, or give OAuth access just to tell me I'm wasting $40. It has to be zero friction."
- **Surprise**: The absolute refusal to create an account for an audit tool.
- **Design Impact**: Pivot the entire product architecture to be "No Login Required." Value must be delivered immediately; email capture is strictly optional at the end.
