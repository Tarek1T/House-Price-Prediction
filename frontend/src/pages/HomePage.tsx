import { PredictionForm } from "../components/PredictionForm";

export function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">End-to-End Machine Learning</span>
          <h1>House Price Predictor</h1>
          <p>Enter the property details below and get a model-based price estimate in Indian rupees.</p>
        </div>
      </section>
      <section className="card">
        <div className="card-heading">
          <h2>Property details</h2>
          <p>All fields are required so the request matches the trained model schema.</p>
        </div>
        <PredictionForm />
      </section>
    </main>
  );
}
