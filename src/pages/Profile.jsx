import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";
import { setUserType, setBudgetingStyle } from "../redux/slices/userPreferencesSlice";
import { USER_TYPES, BUDGETING_STYLES } from "../constants/userOptions";
import "./Profile.css";

const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // handles dark/light mode switching

  const dispatch = useDispatch();

  // Getting the selected values from Redux state
  const { userType, budgetingStyle } = useSelector((state) => state.userPreferences);

  // Backend-synced profile fields
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    incomeBracket: "",
    currency: "ZAR",
  });

  const [password, setPassword] = useState(""); // for changing password

  // Fetch user's current info from backend on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/users/me"); // replace with actual API
        setUserData({
          fullName: res.data.fullName,
          email: res.data.email,
          incomeBracket: res.data.incomeBracket || "",
          currency: res.data.currency || "ZAR",
        });
      } catch (err) {
        alert("Failed to load profile info.");
      }
    };

    fetchUserProfile();
  }, []);

  // Update user details in the backend
  const handleSave = async () => {
    try {
      await axios.put("/api/users/update", userData); // replace with actual API
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Update failed.");
    }
  };

  // Handle password update
  const handlePasswordChange = async () => {
    try {
      await axios.put("/api/users/change-password", { password }); // replace with actual API
      alert("Password changed!");
      setPassword("");
    } catch (err) {
      alert("Password change failed.");
    }
  };

  return (
    <div className={`profile-container ${theme}`}>
      <h2 className="profile-heading">Your Profile</h2>

      {/* Full Name */}
      <label className="profile-label">Full Name</label>
      <input
        name="fullName"
        value={userData.fullName}
        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
        className="profile-input"
      />

      {/* Email Address */}
      <label className="profile-label">Email</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        className="profile-input"
      />

      {/* Password Change */}
      <label className="profile-label">Change Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="profile-input"
      />
      <button onClick={handlePasswordChange} className="profile-button secondary">
        Change Password
      </button>

      {/* Income Bracket */}
      <label className="profile-label">Income Bracket</label>
      <input
        name="incomeBracket"
        value={userData.incomeBracket}
        onChange={(e) => setUserData({ ...userData, incomeBracket: e.target.value })}
        className="profile-input"
      />

      {/* Currency Preference */}
      <label className="profile-label">Currency Preference</label>
      <select
        value={userData.currency}
        onChange={(e) => setUserData({ ...userData, currency: e.target.value })}
        className="profile-input"
      >
        <option value="ZAR">ZAR (R)</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
      </select>

      {/* User Type — stored in Redux */}
      <label className="profile-label">User Group / Type</label>
      <select
        value={userType}
        onChange={(e) => dispatch(setUserType(e.target.value))}
        className="profile-input"
      >
        {USER_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Budgeting Style — stored in Redux */}
      <label className="profile-label">Budgeting Style</label>
      <select
        value={budgetingStyle}
        onChange={(e) => dispatch(setBudgetingStyle(e.target.value))}
        className="profile-input"
      >
        {BUDGETING_STYLES.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>

      {/* Theme toggle with context */}
      <div className="profile-theme-toggle">
        <span>Theme:</span>
        <button onClick={toggleTheme} className="profile-button toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/* Save backend data */}
      <button onClick={handleSave} className="profile-button primary">
        Save Changes
      </button>
    </div>
  );
};

export default Profile;

