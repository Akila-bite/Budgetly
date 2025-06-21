// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useSelector} from "react-redux";
// import { setUserType, setBudgetingStyle } from "../redux/userPreferencesSlice";
// import { USER_TYPES, BUDGETING_STYLES } from "../constants/userOptions";
// import { toast } from "react-toastify";
// import "./Profile.css";

// const Profile = () => {


//   // ✅ FIX: Avoid selector re-evaluation warning
//   const user = useSelector((state) => state.user || {});
//   const userType = user.userType || "";
//   const budgetingStyle = user.budgetingStyle || "";

//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     incomeBracket: "",
//     currency: "ZAR",
//   });

//   const [originalData, setOriginalData] = useState(null);
//   const [password, setPassword] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true); // ✅ loader state

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const res = await axios.get("/api/users/me");
//         setUserData({
//           fullName: res.data.fullName,
//           email: res.data.email,
//           incomeBracket: res.data.incomeBracket || "",
//           currency: res.data.currency || "ZAR",
//         });
//         setOriginalData(res.data);
//       } catch (err) {
//         toast.error("Failed to load profile info.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleSave = async () => {
//     try {
//       await axios.put("/api/users/update", userData);
//       toast.success("Profile updated successfully!");
//       setOriginalData(userData);
//       setEditMode(false);
//     } catch (error) {
//       toast.error("Update failed.");
//     }
//   };

//   const handleCancel = () => {
//     setUserData(originalData);
//     setEditMode(false);
//     toast.info("Changes canceled.");
//   };

//   const handlePasswordChange = async () => {
//     try {
//       await axios.put("/api/users/change-password", { password });
//       toast.success("Password changed!");
//       setPassword("");
//     } catch (err) {
//       toast.error("Password change failed.");
//     }
//   };

//   if (loading) return <p className="profile-loading">Loading profile...</p>;

//   return (
//    <div className="profile-page">
//     <div className="profile-background" />
//     <div className="overlay"></div> {/* glass effect layer */}
//      <div className="profile-container">
//       <h2 className="profile-heading">Your Profile</h2>

//       <div className="profile-edit-toggle">
//         {!editMode ? (
//           <button onClick={() => setEditMode(true)} className="profile-button primary">
//             Edit Profile
//           </button>
//         ) : (
//           <>
//             <button onClick={handleSave} className="profile-button primary">Save</button>
//             <button onClick={handleCancel} className="profile-button secondary">Cancel</button>
//           </>
//         )}
//       </div>

//       <label className="profile-label">Full Name</label>
//       <input
//         name="fullName"
//         value={userData.fullName}
//         onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
//         className="profile-input"
//         readOnly={!editMode}
//       />

//       <label className="profile-label">Email</label>
//       <input
//         type="email"
//         name="email"
//         value={userData.email}
//         onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//         className="profile-input"
//         readOnly={!editMode}
//       />

//       {/* ✅ Wrap password input in a form */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handlePasswordChange();
//         }}
//       >
//         <label className="profile-label">Change Password</label>
//         <input
//           type="password"
//           value={password || ""} // ✅ Ensure controlled input
//           onChange={(e) => setPassword(e.target.value)}
//           className="profile-input"
//           placeholder="Enter new password"
//         />
//         <button type="submit" className="profile-button secondary">
//           Change Password
//         </button>
//       </form>

//       <label className="profile-label">Income Bracket</label>
//       <input
//         name="incomeBracket"
//         value={userData.incomeBracket}
//         onChange={(e) => setUserData({ ...userData, incomeBracket: e.target.value })}
//         className="profile-input"
//         readOnly={!editMode}
//       />

//       <label className="profile-label">Currency Preference</label>
//       <select
//         value={userData.currency}
//         onChange={(e) => setUserData({ ...userData, currency: e.target.value })}
//         className="profile-input"
//         disabled={!editMode}
//       >
//         <option value="ZAR">ZAR (R)</option>
//         <option value="USD">USD ($)</option>
//         <option value="EUR">EUR (€)</option>
//       </select>

//       <label className="profile-label">User Group / Type</label>
//       <select
//         value={userType}
//         onChange={(e) => dispatch(setUserType(e.target.value))}
//         className="profile-input"
//         disabled={!editMode}
//       >
//         {USER_TYPES.map((type) => (
//           <option key={type} value={type}>
//             {type}
//           </option>
//         ))}
//       </select>

//       <label className="profile-label">Budgeting Style</label>
//       <select
//         value={budgetingStyle}
//         onChange={(e) => dispatch(setBudgetingStyle(e.target.value))}
//         className="profile-input"
//         disabled={!editMode}
//       >
//         {BUDGETING_STYLES.map((style) => (
//           <option key={style} value={style}>
//             {style}
//           </option>
//         ))}
//       </select>

//     </div>
//     </div>
//   );
// };

// export default Profile;


// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserType, setBudgetingStyle } from "../redux/userPreferencesSlice";
 import { USER_TYPES, BUDGETING_STYLES } from "../constants/userOptions";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../redux/categorySlice"; // adjust import to actual path
import { toast } from "react-toastify";
import MoneyToast from "../components/MoneyToast";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();

  // User info from Redux (or you might fetch separately)
  const user = useSelector((state) => state.user || {}); // adjust if nested
  const userType = user.userType || "";
  const budgetingStyle = user.budgetingStyle || "";

  // Local state for profile fields (as before)
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

  // Category management local state
  const {
    categories,
    loading: catLoading,
    error: catError,
  } = useSelector((state) => state.categories);
  const [showManageCategories, setShowManageCategories] = useState(false);

  // For adding new category
  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState("expense");


  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Include auth header if needed
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "/api/users/me", // adjust endpoint
          token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {}
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

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handlers for profile update/password (as before)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/users/update", // adjust endpoint
        userData,
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {}
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
        "/api/users/change-password",
        { password },
        token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {}
      );
      toast.success("Password changed!");
      setPassword("");
    } catch (err) {
      toast.error("Password change failed.");
    }
  };

  if (loadingProfile) return <p className="profile-loading">Loading profile...</p>;

  // Category create handler
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

  // Category delete handler
  const handleDeleteCategory = (id) => {
    if (!window.confirm("Delete this category?")) return;
    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => {
        toast.success(<MoneyToast message="Category deleted" />);
        // If currently editing this, reset editing state
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

  return (
    <div className="profile-page">
      <div className="profile-background" />
      <div className="overlay"></div>
      <div className="profile-container">
        <h2 className="profile-heading">Your Profile</h2>

        {/* Profile edit toggle */}
        <div className="profile-edit-toggle">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="profile-button primary"
            >
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

        {/* Profile fields */}
        <label className="profile-label">Full Name</label>
        <input
          name="fullName"
          value={userData.fullName}
          onChange={(e) =>
            setUserData({ ...userData, fullName: e.target.value })
          }
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

        {/* Change Password */}
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
          onChange={(e) =>
            setUserData({ ...userData, incomeBracket: e.target.value })
          }
          className="profile-input"
          readOnly={!editMode}
        />

        <label className="profile-label">Currency Preference</label>
        <select
          value={userData.currency}
          onChange={(e) =>
            setUserData({ ...userData, currency: e.target.value })
          }
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
          {/* render USER_TYPES */}
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

        {/* Toggle Manage Categories Section */}
        <div style={{ marginTop: "2rem" }}>
          <button
            className="profile-button primary"
            onClick={() => setShowManageCategories((prev) => !prev)}
          >
            {showManageCategories ? "Hide Manage Categories" : "Manage Categories"}
          </button>
        </div>

        {/* Manage Categories UI */}
        {showManageCategories && (
          <div className="manage-categories-section" style={{ marginTop: "1rem" }}>
            <h3>Manage Categories</h3>

            {/* Add New Category Form */}
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
            {catError && (
              <p style={{ color: "red" }}>Error: {catError}</p>
            )}

            {/* List existing categories */}
            {!catLoading && categories.length === 0 && (
              <p>No categories yet.</p>
            )}
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
                            onChange={(e) =>
                              setEditingCatName(e.target.value)
                            }
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
                            onChange={(e) =>
                              setEditingCatType(e.target.value)
                            }
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
                            <button
                              onClick={handleEditCategory}
                              className="profile-button primary"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditingCategory}
                              className="profile-button secondary"
                              type="button"
                            >
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



