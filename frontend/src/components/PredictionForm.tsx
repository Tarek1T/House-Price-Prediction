import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loadLocations, predictPrice } from "../api/predictionClient";
import type { PredictionRequest } from "../types/prediction";

const initialForm: PredictionRequest = {
  location: "",
  carpet_area_sqft: 1000,
  floor_num: 3,
  bathroom: 2,
  balcony: 1,
  furnishing: "Semi-Furnished",
  transaction: "Resale",
  ownership: "Freehold",
  facing: "East",
};

export function PredictionForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<PredictionRequest>(initialForm);
  const [locations, setLocations] = useState<string[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLocations()
      .then((items) => {
        setLocations(items);
        setForm((current) => ({ ...current, location: current.location || items[0] || "" }));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoadingLocations(false));
  }, []);

  function update<K extends keyof PredictionRequest>(key: K, value: PredictionRequest[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!form.location) {
      setError("Please choose a location.");
      return;
    }
    if (form.carpet_area_sqft <= 0) {
      setError("Area must be greater than 0 sqft.");
      return;
    }

    setLoading(true);
    try {
      const result = await predictPrice(form);
      navigate("/result", { state: { result, form } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not get a prediction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          Location
          <select value={form.location} onChange={(e) => update("location", e.target.value)} disabled={loadingLocations} required>
            {loadingLocations ? <option>Loading...</option> : null}
            {locations.map((location) => <option key={location} value={location}>{location}</option>)}
          </select>
        </label>

        <label>
          Carpet area (sqft)
          <input type="number" min="1" step="1" value={form.carpet_area_sqft}
            onChange={(e) => update("carpet_area_sqft", Number(e.target.value))} required />
        </label>

        <label>
          Floor number
          <input type="number" min="-2" step="1" value={form.floor_num}
            onChange={(e) => update("floor_num", Number(e.target.value))} required />
        </label>

        <label>
          Bathrooms
          <input type="number" min="0" step="1" value={form.bathroom}
            onChange={(e) => update("bathroom", Number(e.target.value))} required />
        </label>

        <label>
          Balconies
          <input type="number" min="0" step="1" value={form.balcony}
            onChange={(e) => update("balcony", Number(e.target.value))} required />
        </label>

        <label>
          Furnishing
          <select value={form.furnishing} onChange={(e) => update("furnishing", e.target.value as PredictionRequest["furnishing"])} required>
            <option>Furnished</option>
            <option>Semi-Furnished</option>
            <option>Unfurnished</option>
          </select>
        </label>

        <label>
          Transaction
          <select value={form.transaction} onChange={(e) => update("transaction", e.target.value as PredictionRequest["transaction"])} required>
            <option>New Property</option>
            <option>Resale</option>
            <option>Other</option>
            <option>Rent/Lease</option>
          </select>
        </label>

        <label>
          Ownership
          <select value={form.ownership} onChange={(e) => update("ownership", e.target.value as PredictionRequest["ownership"])} required>
            <option>Freehold</option>
            <option>Co-operative Society</option>
            <option>Power Of Attorney</option>
            <option>Leasehold</option>
          </select>
        </label>

        <label>
          Facing
          <select value={form.facing} onChange={(e) => update("facing", e.target.value as PredictionRequest["facing"])} required>
            <option>East</option><option>West</option><option>North</option><option>South</option>
            <option>North - East</option><option>North - West</option>
            <option>South - East</option><option>South -West</option>
          </select>
        </label>
      </div>

      {error ? <p className="error" role="alert">{error}</p> : null}

      <button className="primary-button" type="submit" disabled={loading || loadingLocations}>
        {loading ? "Predicting..." : "Predict House Price"}
      </button>
    </form>
  );
}
