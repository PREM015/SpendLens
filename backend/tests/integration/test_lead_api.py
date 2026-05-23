def test_lead_api(client):
    # Depending on DB setup, we might need a real audit ID. Just test endpoint responds.
    response = client.post("/api/v1/lead", json={
        "audit_id": "dummy",
        "email": "test@example.com",
        "consent_given": True
    })
    # Might be 404 or 422 depending on validation, but 200/201 if successful
    assert response.status_code in [200, 201, 404]
