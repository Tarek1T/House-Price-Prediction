from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.prediction import router as prediction_router
from app.core.config import get_settings
from app.services.inference import ModelService
from app.services.preprocessing import load_allowed_locations
from app.utils.logging_config import configure_logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    configure_logging()

    service = ModelService()
    service.load(
        settings.model_path,
        settings.locations_path,
        load_allowed_locations,
    )
    app.state.model_service = service
    yield
    app.state.model_service = None


settings = get_settings()

app = FastAPI(
    title="House Price Prediction API",
    version="1.0.0",
    description="FastAPI service for the student house-price prediction project.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)
