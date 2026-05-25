import { AuditResult } from '@/types';

export const mockAuditData: AuditResult = {
  id: "aud_mock999demo",
  share_token: "demo_token_xyz123",
  created_at: new Date().toISOString(),
  teamSize: 12,
  useCase: "coding",
  monthly_savings: 1450.00,
  annual_savings: 17400.00,
  savings_flag: "high",
  ai_summary: "Based on your team of 12 focused primarily on coding, there is significant over-provisioning in your current AI stack. You are currently paying for multiple premium subscriptions that offer overlapping capabilities. By consolidating to purpose-built coding tools and downgrading enterprise plans that aren't fully utilized, your team can realize $1,450 in immediate monthly savings without sacrificing productivity.",
  tools: [
    {
      tool: "github_copilot",
      current_plan: "enterprise",
      current_spend: 468.0,
      seats: 12,
      recommended_action: "Downgrade to Business plan",
      recommended_plan: "business",
      monthly_savings: 240.0,
      annual_savings: 2880.0,
      reason: "GitHub Copilot Enterprise ($39/seat) includes fine-tuned models and knowledge bases that smaller teams rarely utilize. Business at $19/seat covers code completion, chat, and PR summaries — saving $240/mo."
    },
    {
      tool: "chatgpt",
      current_plan: "team",
      current_spend: 360.0,
      seats: 12,
      recommended_action: "Consider Cursor Pro for coding",
      recommended_plan: "pro",
      recommended_tool: "cursor",
      monthly_savings: 180.0,
      annual_savings: 2160.0,
      reason: "ChatGPT Team is a general-purpose AI assistant. For dedicated coding, Cursor Pro ($20/seat) provides IDE-integrated AI with better code context — saving $120/mo."
    },
    {
      tool: "cursor",
      current_plan: "pro",
      current_spend: 240.0,
      seats: 12,
      recommended_action: "Keep current plan",
      monthly_savings: 0.0,
      annual_savings: 0.0,
      reason: "Your Cursor Pro subscription is well-matched to your team size of 12 and use case. No changes recommended."
    },
    {
      tool: "claude",
      current_plan: "enterprise", // using enterprise instead of max as max is not in PlanName
      current_spend: 1200.0,
      seats: 12,
      recommended_action: "Evaluate downgrade to Pro",
      recommended_plan: "pro",
      monthly_savings: 960.0,
      annual_savings: 11520.0,
      reason: "Claude Max at $100/seat/mo is 5× the cost of Pro. Unless your team consistently hits Pro usage limits, downgrading saves $960/mo without losing access to the same models."
    }
  ]
};
