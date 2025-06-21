
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  createCategory,
} from "../redux/categorySlice"; // adjust path if needed
import { createTransaction } from "../redux/transactionSlice";
import { toast } from "react-toastify";
import MoneyToast from "../components/MoneyToast";
import "./Transaction.css";

const Transaction = () => {
  const dispatch = useDispatch();

  // Redux state for categories
  const {
    categories,
    loading: catLoading,
    error: catError,
  } = useSelector((state) => state.categories);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Local state for form data
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "", // will be set once categories load
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  // State to control “adding category” UI
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Once categories load, default category to first if not set
  useEffect(() => {
    if (!catLoading && categories.length && !formData.category) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0].name,
      }));
    }
  }, [catLoading, categories, formData.category]);

  // When transaction type changes, if user is adding a category, or if current category doesn't match type?
  // Optionally: when `type` changes, reset category/default to first matching:
  useEffect(() => {
    if (!catLoading && categories.length) {
      // Try to pick first category matching the new type
      const match = categories.find((c) => c.type === formData.type);
      if (match) {
        setFormData((prev) => ({ ...prev, category: match.name }));
      } else {
        // No matching category exists: clear or keep previous? We'll keep empty so user can add new
        setFormData((prev) => ({ ...prev, category: "" }));
      }
    }
  }, [formData.type, categories, catLoading]);

  // Handle input changes for transaction fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submission of transaction
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic guard: ensure category is set
    if (!formData.category) {
      toast.error(<MoneyToast message="Please select or create a category" />);
      return;
    }
    dispatch(createTransaction(formData))
      .unwrap()
      .then(() => {
        toast.success(<MoneyToast message="Transaction recorded!" />);
        // Reset only amount, description, date. Keep type & category to speed up repeated entries
        setFormData((prev) => ({
          ...prev,
          amount: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        }));
      })
      .catch((errMsg) => {
        toast.error(<MoneyToast message={`Error: ${errMsg}`} />);
      });
  };

  // Handle submission of new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    const nameTrimmed = newCategoryName.trim();
    if (!nameTrimmed) {
      toast.error(<MoneyToast message="Category name cannot be empty" />);
      return;
    }
    // Determine type for new category: match transaction type
    const type = formData.type; // "expense" or "income"
    dispatch(createCategory({ name: nameTrimmed, type }))
      .unwrap()
      .then((createdCat) => {
        toast.success(
          <MoneyToast message={`Category "${createdCat.name}" created`} />
        );
        // Set formData.category to new category
        setFormData((prev) => ({
          ...prev,
          category: createdCat.name,
        }));
        // Reset newCategoryName and close the add UI
        setNewCategoryName("");
        setIsAddingCategory(false);
        // Optionally: no need to refetch, since slice already pushed new category
      })
      .catch((errMsg) => {
        toast.error(<MoneyToast message={`Error: ${errMsg}`} />);
      });
  };

  if (catLoading) return <p>Loading categories...</p>;
  if (catError)
    return <p style={{ color: "red" }}>Error loading categories: {catError}</p>;

  return (
    <div className="transaction-page">
      <div className="transaction-background" />
      <div className="transaction-content">
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h2>New Transaction</h2>

          <label>
            <strong>Amount:</strong>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <strong>Type:</strong>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <label>
            <strong>Category:</strong>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <select
                name="category"
                value={isAddingCategory ? "__new" : formData.category}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "__new") {
                    // User chose to add a new category
                    setIsAddingCategory(true);
                  } else {
                    setFormData((prev) => ({ ...prev, category: val }));
                    setIsAddingCategory(false);
                  }
                }}
                required={!isAddingCategory}
                style={{ flexGrow: 1 }}
              >
                {/* If formData.category might be empty string, include a placeholder */}
                {!isAddingCategory && !formData.category && (
                  <option value="" disabled>
                    Select category
                  </option>
                )}
                {categories
                  .filter((c) => c.type === formData.type) // only show categories matching transaction type
                  .map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                {/* Option to add new */}
                <option value="__new">+ Add new category</option>
              </select>
              {/* Optionally, a button to trigger add too */}
            </div>
          </label>

          {/* If adding a new category, show input & button */}
          {isAddingCategory && (
            <form
              onSubmit={handleAddCategory}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <input
                type="text"
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoComplete="off"
                required
              />
              <button type="submit">Save Category</button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName("");
                  // reset category selection if none selected
                  if (categories.length) {
                    // pick first available matching type
                    const match = categories.find(
                      (c) => c.type === formData.type
                    );
                    setFormData((prev) => ({
                      ...prev,
                      category: match ? match.name : "",
                    }));
                  } else {
                    setFormData((prev) => ({ ...prev, category: "" }));
                  }
                }}
              >
                Cancel
              </button>
            </form>
          )}

          <label>
            <strong>Description:</strong>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <label>
            <strong>Date:</strong>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default Transaction;


