def test_share_flow(client):
    response = client.get("/api/v1/share/dummy_token")
    assert response.status_code in [200, 404]
