import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../context/ThemeContext";
import { setUserType, setBudgetingStyle } from "../redux/userPreferencesSlice";
import { USER_TYPES, BUDGETING_STYLES } from "../constants/userOptions";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  // ✅ FIX: Avoid selector re-evaluation warning
  const user = useSelector((state) => state.user || {});
  const userType = user.userType || "";
  const budgetingStyle = user.budgetingStyle || "";

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    incomeBracket: "",
    currency: "ZAR",
  });

  const [originalData, setOriginalData] = useState(null);
  const [password, setPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loader state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData({
          fullName: res.data.fullName,
          email: res.data.email,
          incomeBracket: res.data.incomeBracket || "",
          currency: res.data.currency || "ZAR",
        });
        setOriginalData(res.data);
      } catch (err) {
        toast.error("Failed to load profile info.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put("/api/users/update", userData);
      toast.success("Profile updated successfully!");
      setOriginalData(userData);
      setEditMode(false);
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  const handleCancel = () => {
    setUserData(originalData);
    setEditMode(false);
    toast.info("Changes canceled.");
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put("/api/users/change-password", { password });
      toast.success("Password changed!");
      setPassword("");
    } catch (err) {
      toast.error("Password change failed.");
    }
  };

  if (loading) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className={`profile-container ${theme}`}>
      <h2 className="profile-heading">Your Profile</h2>

      <div className="profile-edit-toggle">
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="profile-button primary">
            Edit Profile
          </button>
        ) : (
          <>
            <button onClick={handleSave} className="profile-button primary">Save</button>
            <button onClick={handleCancel} className="profile-button secondary">Cancel</button>
          </>
        )}
      </div>

      <label className="profile-label">Full Name</label>
      <input
        name="fullName"
        value={userData.fullName}
        onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
        className="profile-input"
        readOnly={!editMode}
      />

      <label className="profile-label">Email</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        className="profile-input"
        readOnly={!editMode}
      />

      {/* ✅ Wrap password input in a form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePasswordChange();
        }}
      >
        <label className="profile-label">Change Password</label>
        <input
          type="password"
          value={password || ""} // ✅ Ensure controlled input
          onChange={(e) => setPassword(e.target.value)}
          className="profile-input"
          placeholder="Enter new password"
        />
        <button type="submit" className="profile-button secondary">
          Change Password
        </button>
      </form>

      <label className="profile-label">Income Bracket</label>
      <input
        name="incomeBracket"
        value={userData.incomeBracket}
        onChange={(e) => setUserData({ ...userData, incomeBracket: e.target.value })}
        className="profile-input"
        readOnly={!editMode}
      />

      <label className="profile-label">Currency Preference</label>
      <select
        value={userData.currency}
        onChange={(e) => setUserData({ ...userData, currency: e.target.value })}
        className="profile-input"
        disabled={!editMode}
      >
        <option value="ZAR">ZAR (R)</option>
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
      </select>

      <label className="profile-label">User Group / Type</label>
      <select
        value={userType}
        onChange={(e) => dispatch(setUserType(e.target.value))}
        className="profile-input"
        disabled={!editMode}
      >
        {USER_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label className="profile-label">Budgeting Style</label>
      <select
        value={budgetingStyle}
        onChange={(e) => dispatch(setBudgetingStyle(e.target.value))}
        className="profile-input"
        disabled={!editMode}
      >
        {BUDGETING_STYLES.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>

      <div className="profile-theme-toggle">
        <span>Theme:</span>
        <button onClick={toggleTheme} className="profile-button toggle">
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div> 
    </div>
  );
};

export default Profile;



