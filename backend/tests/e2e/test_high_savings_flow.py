def test_high_savings_flow(client):
    response = client.post("/api/v1/audit", json={"tools": []})
    assert response.status_code == 200
