// src/components/ProfileIcon.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // default icon
import "./ProfileIcon.css"; // for styling

const ProfileIcon = ({ isLoggedIn, username, avatarUrl }) => {
  return (
    <Link to="/profile" className="profile-icon-link">
      {isLoggedIn ? (
        <img
          src={avatarUrl || "/default-avatar.png"} // fallback if no uploaded image
          alt="User Avatar"
          className="profile-avatar"
        />
      ) : (
        <FaUserCircle className="profile-placeholder-icon" />
      )}
      <span className="profile-name">
        {isLoggedIn ? username : "Profile"}
      </span>
    </Link>
  );
};

export default ProfileIcon;
