import json
from pathlib import Path

import pandas as pd

FEATURE_COLUMNS = [
    "carpet_area_sqft",
    "floor_num",
    "bathroom",
    "balcony",
    "location_grouped",
    "Furnishing",
    "Transaction",
    "Ownership",
    "facing",
]


def load_allowed_locations(path: str) -> set[str]:
    return set(json.loads(Path(path).read_text(encoding="utf-8")))


def request_to_frame(payload, allowed_locations: set[str]) -> pd.DataFrame:
    location = payload.location if payload.location in allowed_locations else "Other"
    row = {
        "carpet_area_sqft": payload.carpet_area_sqft,
        "floor_num": payload.floor_num,
        "bathroom": payload.bathroom,
        "balcony": payload.balcony,
        "location_grouped": location,
        "Furnishing": payload.furnishing,
        "Transaction": payload.transaction,
        "Ownership": payload.ownership,
        "facing": payload.facing,
    }
    return pd.DataFrame([row], columns=FEATURE_COLUMNS)
