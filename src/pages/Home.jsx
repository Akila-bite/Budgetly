// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleAddTransactionClick = () => {
    navigate("/transaction"); // This is the route that renders Transaction.jsx
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Budgetly</h1>
        <p>Track your spending. Stay on budget. Crush your goals.</p>
      </section>

      {/* Add Transaction Preview/Button */}
      <section className="add-preview">
        <h2>Quick Actions</h2>
        <button className="add-button" onClick={handleAddTransactionClick}>
          ➕ Add New Transaction
        </button>
      </section>
    </div>
  );
};

export default Home;

