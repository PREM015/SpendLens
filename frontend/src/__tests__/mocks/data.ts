export const mockAuditResponse = {
  id: "test_audit_1",
  share_token: "test_token_123",
  monthly_savings: 500.0,
  annual_savings: 6000.0,
  tools: [
    {
      tool: "chatgpt",
      current_plan: "team",
      current_spend: 600.0,
      seats: 20,
      use_case: "writing",
      recommended_action: "switch",
      recommended_plan: "pro",
      recommended_tool: "claude",
      monthly_savings: 200.0,
      annual_savings: 2400.0,
      reason: "Claude Pro is more cost-effective for writing"
    }
  ]
};
