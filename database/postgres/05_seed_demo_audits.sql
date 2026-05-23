INSERT INTO audits (id, share_token, monthly_savings, annual_savings, is_public)
VALUES ('demo_audit_1', 'demo-share-token-123', 500.0, 6000.0, TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO audit_tool_entries (id, audit_id, tool, current_plan, current_spend, seats, use_case, recommended_action, recommended_plan, recommended_tool, monthly_savings, annual_savings, reason, flag)
VALUES ('demo_entry_1', 'demo_audit_1', 'chatgpt', 'team', 600.0, 20, 'writing', 'switch', 'pro', 'claude', 200.0, 2400.0, 'Claude Pro is more cost-effective for writing', 'warning')
ON CONFLICT (id) DO NOTHING;
