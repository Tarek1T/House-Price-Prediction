import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="page narrow">
      <section className="card">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="primary-button inline-button" to="/">Go home</Link>
      </section>
    </main>
  );
}
