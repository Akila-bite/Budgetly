// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import welcomeImg from "../assets/display images/animated_heroimage.jpg"; // adjust relative path as needed
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
        <h1>Welcome to your new financial journal.</h1>
        <p>Track your spending. Stay on budget. Crush your goals.</p>
      </section>

{/* Welcome Image Section */}
<section className="image-container">
<img src={welcomeImg} alt="Welcome Illustration" className="welcome-image" />
</section>


{/* About Budgetly Section */}
<section className="about-budgetly">
  <div className="about-container">
    {/* Left Column: About Info */}
    <div className="about-info">
      <h2>About Budgetly</h2>
            
      <p>
        Budgetly is your personal finance journal – designed to help you understand, plan, and take control of your finances.
        Whether you're saving for a goal, managing daily expenses, or just trying to make sense of your spending habits, Budgetly is your all-in-one solution.
      </p>
    </div>

    {/* Right Column: Features */}
<div className="features-list">
  <h3>What You Can Do</h3>
  {/* <ul>
    <li><i className="fas fa-receipt icon"></i><strong>Track Transactions</strong>:   Log your income and expenses easily.</li>
    <li><i className="fas fa-bullseye icon"></i><strong>Set Financial Goals</strong>: Create savings or spending goals with custom durations.</li>
    <li><i className="fas fa-chart-line icon"></i> <strong>View Spending Analytics</strong>: Visualize your financial habits and adjust accordingly.</li>
    <li><i className="fas fa-tags icon"></i> <strong>Categorize Expenses</strong>: Organize your spending into meaningful categories.</li>
    <li><i className="fas fa-tachometer-alt icon"></i><strong> Stay In Control</strong>: Use the Dashboard to see all your activity at a glance.</li>
  </ul> */}
<ul>
  <li>
    <span className="icon"><i className="fas fa-receipt"></i></span>
    <div className="feature-text">
      <strong>Track Transactions:</strong> Log your income and expenses easily.
    </div>
  </li>
  <li>
    <span className="icon"><i className="fas fa-bullseye"></i></span>
    <div className="feature-text">
      <strong>Set Financial Goals:</strong> Create savings or spending goals with custom durations.
    </div>
  </li>
  <li>
    <span className="icon"><i className="fas fa-chart-line"></i></span>
    <div className="feature-text">
      <strong>View Spending Analytics:</strong> Visualize your financial habits and adjust accordingly.
    </div>
  </li>
  <li>
    <span className="icon"><i className="fas fa-tags"></i></span>
    <div className="feature-text">
      <strong>Categorize Expenses:</strong> Organize your spending into meaningful categories.
    </div>
  </li>
  <li>
    <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
    <div className="feature-text">
      <strong>Stay In Control:</strong> Use the Dashboard to see all your activity at a glance.
    </div>
  </li>
</ul>
  <p><em>Go to the Dashboard to see everything Budgetly has to offer!</em></p>
</div>
  </div>
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

