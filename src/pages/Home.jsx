// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
// import HeroImage from "../assets/display images/office siren twigs ꨄ︎.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleAddTransactionClick = () => {
    navigate("/transaction"); // This is the route that renders Transaction.jsx
  };

  return (
    // <div className="home-container">
    //   {/* Hero Section */}
    //   <section className="hero">
    //     <div className="image-container">
    //   <img src={HeroImage} alt="Dafy with stacks" className="hero-image" />
    //   <div className="overlay"></div>
    //     <div className="hero-text">
    //       <h1 className="display-1">Budgetly</h1>
    //       <p className="display-6">Track your spending. Stay on budget. Crush your goals</p>
    //     </div>
    //   </div>
    //   </section>

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

