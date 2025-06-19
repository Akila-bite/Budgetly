import React from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import { useSelector } from "react-redux";
import "./header.css";

export default function Header() {
   const { isLoggedIn, user } = useSelector((state) => state.auth);

  
  return (
    <header className="header">
          <ProfileIcon
        isLoggedIn={isLoggedIn}
        username={user?.fullName || "User"}
        avatarUrl={user?.avatarUrl}
      />
  
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
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
</ul>
</nav>
    </header>
  );
}