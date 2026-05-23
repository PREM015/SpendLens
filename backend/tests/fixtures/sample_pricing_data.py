import pytest

@pytest.fixture
def mock_pricing_data():
    return [
        {"tool_id": "cursor", "plan_name": "pro", "monthly_usd_per_seat": 20.0},
        {"tool_id": "chatgpt", "plan_name": "team", "monthly_usd_per_seat": 30.0},
        {"tool_id": "claude", "plan_name": "pro", "monthly_usd_per_seat": 20.0}
    ]
