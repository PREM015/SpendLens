# Key Metrics & Instrumentation

## North Star Metric
**Number of Audits Completed (with >$0 in identified savings)**
This indicates that the tool is successfully finding value for users, which validates the core premise of SpendLens.

## Input Metrics
1. **Form Completion Rate**: (Number of successful submissions) / (Number of users who click "Add Tool")
   - *Goal*: > 60%
   - *Action if low*: Simplify the form, add tooltips for finding pricing info.

2. **Email Capture Rate**: (Number of emails submitted) / (Number of audits completed with savings > $500)
   - *Goal*: > 30%
   - *Action if low*: Improve the copy on the Lead Capture modal to make the Credex volume negotiation sound more appealing.

3. **Viral Share Rate**: (Number of unique pageviews on `/audit/[id]`) / (Number of audits completed)
   - *Goal*: > 1.5 (Each audit is shared at least once on average)
   - *Action if low*: Make the "Copy Share Link" button more prominent in the UI.

## Pivot Trigger
If after 30 days and 1,000 unique visitors, the **Email Capture Rate** is below 2%, it means the top-of-funnel is working, but the value proposition of Credex negotiating volume discounts is not resonating. We would need to pivot the "upgrade" path—perhaps instead of Credex services, we offer an automated "1-click cancellation" service using a virtual card API.
