import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {

  
  return (
    <header className="header">
    
    <nav className="navbar">
      <ul className= "nav-links">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/analytics">Analytics</Link>
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" to="/goals">Goals</Link>
        </li>

         {/* <li className="nav-item">
          <Link className="nav-link" to="/analytics">Analytics</Link>
        </li> */}
</ul>
</nav>
    </header>
  );
}