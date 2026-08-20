import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ResultPage } from "./pages/ResultPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <Link to="/" className="brand">HousePrice<span>AI</span></Link>
          <span className="status-pill">ML Prediction</span>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <footer>FastAPI + React + scikit-learn</footer>
      </div>
    </BrowserRouter>
  );
}
