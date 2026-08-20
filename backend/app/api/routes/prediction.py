from fastapi import APIRouter, Request

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import request_to_frame

router = APIRouter()


@router.get("/health")
def health(request: Request) -> dict[str, str]:
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict(payload: PredictionRequest, request: Request) -> PredictionResponse:
    service = request.app.state.model_service
    frame = request_to_frame(payload, service.allowed_locations)
    predicted_price = service.predict(frame)
    return PredictionResponse(predicted_price=predicted_price)
