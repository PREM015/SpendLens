import pytest

@pytest.fixture
def valid_lead_request():
    return {
        "audit_id": "test_audit_1",
        "email": "user@example.com",
        "company": "Example Corp",
        "role": "CTO",
        "consent_given": True
    }
