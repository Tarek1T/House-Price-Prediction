from fastapi.testclient import TestClient

from app.main import app


def test_health():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


def test_predict_happy_path():
    payload = {
        "location": "new-delhi",
        "carpet_area_sqft": 1200,
        "floor_num": 5,
        "bathroom": 2,
        "balcony": 2,
        "furnishing": "Semi-Furnished",
        "transaction": "Resale",
        "ownership": "Freehold",
        "facing": "East",
    }
    with TestClient(app) as client:
        response = client.post("/predict", json=payload)
        assert response.status_code == 200
        assert response.json()["predicted_price"] > 0


def test_predict_invalid_area_returns_422():
    payload = {
        "location": "new-delhi",
        "carpet_area_sqft": 0,
        "floor_num": 5,
        "bathroom": 2,
        "balcony": 2,
        "furnishing": "Semi-Furnished",
        "transaction": "Resale",
        "ownership": "Freehold",
        "facing": "East",
    }
    with TestClient(app) as client:
        response = client.post("/predict", json=payload)
        assert response.status_code == 422
