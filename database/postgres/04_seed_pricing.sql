INSERT INTO tool_pricing (id, tool_id, plan_name, monthly_usd_per_seat, min_seats, is_custom, source_url, last_verified)
VALUES 
    ('pricing_1', 'cursor', 'hobby', 0.0, NULL, FALSE, 'https://cursor.sh/pricing', CURRENT_DATE),
    ('pricing_2', 'cursor', 'pro', 20.0, NULL, FALSE, 'https://cursor.sh/pricing', CURRENT_DATE),
    ('pricing_3', 'cursor', 'business', 40.0, NULL, FALSE, 'https://cursor.sh/pricing', CURRENT_DATE),
    ('pricing_4', 'github_copilot', 'individual', 10.0, NULL, FALSE, 'https://github.com/pricing', CURRENT_DATE),
    ('pricing_5', 'github_copilot', 'business', 19.0, NULL, FALSE, 'https://github.com/pricing', CURRENT_DATE),
    ('pricing_6', 'claude', 'free', 0.0, NULL, FALSE, 'https://anthropic.com/pricing', CURRENT_DATE),
    ('pricing_7', 'claude', 'pro', 20.0, NULL, FALSE, 'https://anthropic.com/pricing', CURRENT_DATE),
    ('pricing_8', 'chatgpt', 'plus', 20.0, NULL, FALSE, 'https://openai.com/chatgpt/pricing', CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;
