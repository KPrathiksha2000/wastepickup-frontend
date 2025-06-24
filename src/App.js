// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RequestForm from "./pages/RequestForm";
import AdminPanel from "./pages/AdminPanel";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>♻️ Recyclable Waste Pickup System</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/admin">Admin</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RequestForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
