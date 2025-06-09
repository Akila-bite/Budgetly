import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Budgetly</h1>
      <p>
        Track your income, manage your expenses, and take control of your finances with ease.
      </p>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
