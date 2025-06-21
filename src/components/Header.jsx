import React , { useState } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import { useSelector } from "react-redux";
// import { FaOutlineChartLine } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";

import "./header.css";

export default function Header() {
   const { isLoggedIn, user } = useSelector((state) => state.auth);

   const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen((prev) => !prev);
};


  
  return (
    <header className="header">
          <ProfileIcon
        isLoggedIn={isLoggedIn}
        username={user?.fullName || "User"}
        avatarUrl={user?.avatarUrl}
      />
  
     <div className="brand-logo">
      <span className="brand-name">Budgetly</span>
      <AiOutlineLineChart className="money-icon" />
    </div>
    
      <button className="menu-toggle" onClick={toggleMenu}>
      ☰ {/* hamburger menu icon */}
    </button>


    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
  
   
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
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
</ul>
</nav>
    </header>
  );
}