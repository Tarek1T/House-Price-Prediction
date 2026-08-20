from typing import Literal
from pydantic import BaseModel, ConfigDict, Field


class PredictionRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    location: str = Field(..., min_length=1, max_length=100)
    carpet_area_sqft: float = Field(..., gt=0, le=1_000_000)
    floor_num: int = Field(..., ge=-2, le=200)
    bathroom: int = Field(..., ge=0, le=20)
    balcony: int = Field(..., ge=0, le=20)
    furnishing: Literal["Furnished", "Semi-Furnished", "Unfurnished"]
    transaction: Literal["New Property", "Resale", "Other", "Rent/Lease"]
    ownership: Literal["Freehold", "Co-operative Society", "Power Of Attorney", "Leasehold"]
    facing: Literal[
        "East", "West", "North", "South",
        "North - East", "North - West", "South - East", "South -West"
    ]


class PredictionResponse(BaseModel):
    predicted_price: float
