import pytest

@pytest.fixture
def sample_audit_response():
    return {
        "id": "audit_123",
        "share_token": "token_123",
        "monthly_savings": 200.0,
        "annual_savings": 2400.0,
        "tools": []
    }
