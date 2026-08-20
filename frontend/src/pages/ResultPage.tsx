import { Link, useLocation } from "react-router-dom";
import type { PredictionRequest, PredictionResponse } from "../types/prediction";

type State = { result: PredictionResponse; form: PredictionRequest };

export function ResultPage() {
  const location = useLocation();
  const state = location.state as State | null;

  if (!state?.result || !state.form) {
    return (
      <main className="page narrow">
        <section className="card">
          <h2>No prediction found</h2>
          <p>Submit the property form first.</p>
          <Link className="primary-button inline-button" to="/">Back to predictor</Link>
        </section>
      </main>
    );
  }

  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(state.result.predicted_price);

  return (
    <main className="page narrow">
      <section className="result-card">
        <span className="eyebrow">Prediction complete</span>
        <h1>Estimated property price</h1>
        <div className="price">{formatted}</div>
        <p className="muted">This is a model estimate, not a guaranteed market price.</p>

        <div className="summary-grid">
          <div><span>Location</span><strong>{state.form.location}</strong></div>
          <div><span>Area</span><strong>{state.form.carpet_area_sqft.toLocaleString()} sqft</strong></div>
          <div><span>Bathrooms</span><strong>{state.form.bathroom}</strong></div>
          <div><span>Floor</span><strong>{state.form.floor_num}</strong></div>
        </div>

        <Link className="primary-button inline-button" to="/">Predict another property</Link>
      </section>
    </main>
  );
}
