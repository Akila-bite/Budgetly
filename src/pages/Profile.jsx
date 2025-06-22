import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserType, setBudgetingStyle } from "../redux/userPreferencesSlice";
import { USER_TYPES, BUDGETING_STYLES } from "../constants/userOptions";
import { useAuthRequest } from "../constants/useAuthRequest";
import {fetchCategories,createCategory,deleteCategory} from "../redux/categorySlice";
import { toast } from "react-toastify";
import MoneyToast from "../components/MoneyToast";
import "./Profile.css";

const API_BASE_URL = "https://budgetly-backend-jan0.onrender.com";

const Profile = () => {
  const authRequest = useAuthRequest();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await authRequest({ method: "GET", url: "/users/me" });
      setUserData(data);
    };

    fetchUser();
  }, [authRequest]);

  const dispatch = useDispatch();
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
  const [loadingProfile, setLoadingProfile] = useState(true);

  const {
    categories,
    loading: catLoading,
    error: catError,
  } = useSelector((state) => state.categories);
  const [showManageCategories, setShowManageCategories] = useState(false);

  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState("expense");

  // Temporary category editing state
  const [editingCatId, setEditingCatId] = useState(null);
  const [editingCatName, setEditingCatName] = useState("");
  const [editingCatType, setEditingCatType] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/api/users/me`,
          token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );
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
        setLoadingProfile(false);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/users/${user._id}`,
        userData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setOriginalData(userData);
      setEditMode(false);
    } catch (error) {
      toast.error("Update failed.");
    }
  };

  const handleCancel = () => {
    if (originalData) setUserData(originalData);
    setEditMode(false);
    toast.info("Changes canceled.");
  };

  const handlePasswordChange = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/users/change-password`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed!");
      setPassword("");
    } catch (err) {
      toast.error("Password change failed.");
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const nameTrimmed = newCatName.trim();
    if (!nameTrimmed) {
      toast.error(<MoneyToast message="Category name cannot be empty" />);
      return;
    }
    dispatch(createCategory({ name: nameTrimmed, type: newCatType }))
      .unwrap()
      .then((createdCat) => {
        toast.success(
          <MoneyToast message={`Category "${createdCat.name}" created`} />
        );
        setNewCatName("");
        setNewCatType("expense");
      })
      .catch((errMsg) => {
        toast.error(<MoneyToast message={`Error: ${errMsg}`} />);
      });
  };

  const handleDeleteCategory = (id) => {
    if (!window.confirm("Delete this category?")) return;
    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => {
        toast.success(<MoneyToast message="Category deleted" />);
        if (editingCatId === id) {
          setEditingCatId(null);
          setEditingCatName("");
          setEditingCatType("");
        }
      })
      .catch((errMsg) => {
        toast.error(<MoneyToast message={`Error: ${errMsg}`} />);
      });
  };

  const startEditingCategory = (cat) => {
    setEditingCatId(cat._id);
    setEditingCatName(cat.name);
    setEditingCatType(cat.type);
  };

  const cancelEditingCategory = () => {
    setEditingCatId(null);
    setEditingCatName("");
    setEditingCatType("");
  };

  const handleEditCategory = () => {
    toast.info("Edit category feature not implemented yet.");
    setEditingCatId(null);
  };

  if (loadingProfile) return <p className="profile-loading">Loading profile...</p>;

  return (
    <div className="profile-page">
      <div className="profile-background" />
      <div className="overlay"></div>
      <div className="profile-container">
        <h2 className="profile-heading">Your Profile</h2>
        <div className="profile-edit-toggle">
          {!editMode ? (
            <button onClick={() => setEditMode(true)} className="profile-button primary">
              Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="profile-button primary">
                Save
              </button>
              <button onClick={handleCancel} className="profile-button secondary">
                Cancel
              </button>
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePasswordChange();
          }}
        >
          <label className="profile-label">Change Password</label>
          <input
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            className="profile-input"
            placeholder="Enter new password"
            autoComplete="current-password"
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

        <div style={{ marginTop: "2rem" }}>
          <button
            className="profile-button primary"
            onClick={() => setShowManageCategories((prev) => !prev)}
          >
            {showManageCategories ? "Hide Manage Categories" : "Manage Categories"}
          </button>
        </div>

        {showManageCategories && (
          <div className="manage-categories-section" style={{ marginTop: "1rem" }}>
            <h3>Manage Categories</h3>
            <form
              onSubmit={handleAddCategory}
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <input
                type="text"
                placeholder="New category name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="profile-input"
                required
              />
              <select
                value={newCatType}
                onChange={(e) => setNewCatType(e.target.value)}
                className="profile-input"
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <button type="submit" className="profile-button primary">
                Add Category
              </button>
            </form>
            {catLoading && <p>Loading categories...</p>}
            {catError && <p style={{ color: "red" }}>Error: {catError}</p>}

            {!catLoading && categories.length > 0 && (
              <table className="category-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id}>
                      <td>
                        {editingCatId === cat._id ? (
                          <input
                            type="text"
                            value={editingCatName}
                            onChange={(e) => setEditingCatName(e.target.value)}
                            className="profile-input"
                          />
                        ) : (
                          cat.name
                        )}
                      </td>
                      <td>
                        {editingCatId === cat._id ? (
                          <select
                            value={editingCatType}
                            onChange={(e) => setEditingCatType(e.target.value)}
                            className="profile-input"
                          >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                          </select>
                        ) : (
                          cat.type
                        )}
                      </td>
                      <td style={{ display: "flex", gap: "0.5rem" }}>
                        {editingCatId === cat._id ? (
                          <>
                            <button onClick={handleEditCategory} className="profile-button primary">
                              Save
                            </button>
                            <button onClick={cancelEditingCategory} className="profile-button secondary">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditingCategory(cat)}
                              className="profile-button primary"
                              type="button"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(cat._id)}
                              className="profile-button secondary"
                              type="button"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;





