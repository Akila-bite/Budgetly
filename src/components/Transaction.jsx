import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/categorySlice"; 
import { createTransaction } from "../redux/transactionSlice";
import { toast } from "react-toastify";
import MoneyToast from "../components/MoneyToast";
import { useAuthRequest } from "../constants/useAuthRequest";
import "./Transaction.css";

const Transaction = () => {
  const dispatch = useDispatch();
  const authRequest = useAuthRequest(); // ✅ custom hook

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

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",      // <-- will hold category _id now
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Set default category to first category's _id on load
  useEffect(() => {
    if (!catLoading && categories.length && !formData.category) {
      setFormData((prev) => ({
        ...prev,
        category: categories[0]._id,
      }));
    }
  }, [catLoading, categories, formData.category]);

  // Update category when type changes (use first category of matching type)
  useEffect(() => {
    if (!catLoading && categories.length) {
      const match = categories.find((c) => c.type === formData.type);
      setFormData((prev) => ({
        ...prev,
        category: match ? match._id : "",
      }));
    }
  }, [formData.type, categories, catLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      toast.error(<MoneyToast message="Please select or create a category" />);
      return;
    }

    dispatch(createTransaction(formData))
      .unwrap()
      .then(() => {
        toast.success(<MoneyToast message="Transaction recorded!" />);
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

  // Add new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const nameTrimmed = newCategoryName.trim();
    if (!nameTrimmed) {
      toast.error(<MoneyToast message="Category name cannot be empty" />);
      return;
    }

    const type = formData.type;

    try {
      const createdCat = await authRequest({
        method: "POST",
        url: "/categories",
        data: { name: nameTrimmed, type },
      });

      toast.success(
        <MoneyToast message={`Category "${createdCat.name}" created`} />
      );

      setFormData((prev) => ({
        ...prev,
        category: createdCat._id, // <-- set category to new category's _id
      }));

      setNewCategoryName("");
      setIsAddingCategory(false);

      dispatch(fetchCategories());

    } catch (err) {
      toast.error(
        <MoneyToast
          message={`Error: ${err?.response?.data?.message || "Failed to create category"}`}
        />
      );
    }
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
                    setIsAddingCategory(true);
                  } else {
                    setFormData((prev) => ({ ...prev, category: val }));
                    setIsAddingCategory(false);
                  }
                }}
                required={!isAddingCategory}
                style={{ flexGrow: 1 }}
              >
                {!isAddingCategory && !formData.category && (
                  <option value="" disabled>
                    Select category
                  </option>
                )}
                {categories
                  .filter((c) => c.type === formData.type)
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}> {/* <-- Use _id as value */}
                      {cat.name}
                    </option>
                  ))}
                <option value="__new">+ Add new category</option>
              </select>
            </div>
          </label>

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

                  const match = categories.find(
                    (c) => c.type === formData.type
                  );
                  setFormData((prev) => ({
                    ...prev,
                    category: match ? match._id : "",
                  }));
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




