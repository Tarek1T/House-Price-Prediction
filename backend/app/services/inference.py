from pathlib import Path

import joblib


class ModelService:
    def __init__(self) -> None:
        self.model = None
        self.allowed_locations: set[str] = set()

    def load(self, model_path: str, locations_path: str, allowed_locations_loader) -> None:
        self.model = joblib.load(Path(model_path))
        self.allowed_locations = allowed_locations_loader(locations_path)

    def predict(self, frame) -> float:
        if self.model is None:
            raise RuntimeError("Model has not been loaded.")
        return float(self.model.predict(frame)[0])
