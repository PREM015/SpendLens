def create_test_audit(client):
    response = client.post("/api/v1/audit", json={"tools": []})
    return response.json()
