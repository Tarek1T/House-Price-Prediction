import type { PredictionRequest, PredictionResponse } from "../types/prediction";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function predictPrice(payload: PredictionRequest): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `Prediction failed (${response.status}).`;
    try {
      const body = await response.json();
      if (Array.isArray(body.detail)) {
        message = body.detail.map((item: { msg: string }) => item.msg).join(", ");
      } else if (body.detail) {
        message = String(body.detail);
      }
    } catch {
      // Keep the status-based fallback message.
    }
    throw new Error(message);
  }

  return response.json() as Promise<PredictionResponse>;
}

export async function loadLocations(): Promise<string[]> {
  const response = await fetch("/locations.json");
  if (!response.ok) {
    throw new Error("Could not load the location list.");
  }
  return response.json() as Promise<string[]>;
}
