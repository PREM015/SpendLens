def test_audit_api(client):
    response = client.post("/api/v1/audit", json={"tools": []})
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
