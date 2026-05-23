def test_summary_api(client):
    response = client.post("/api/v1/summary", json={"tools": []})
    assert response.status_code == 200
