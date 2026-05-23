def test_full_audit_flow(client):
    response = client.post("/api/v1/audit", json={"tools": []})
    assert response.status_code == 200
    
    audit_id = response.json().get("id")
    assert audit_id is not None

    lead_response = client.post("/api/v1/lead", json={
        "audit_id": audit_id,
        "email": "flow@example.com",
        "consent_given": True
    })
    assert lead_response.status_code in [200, 201]
