import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import "./Transaction.css";

const Transaction = ({ onSubmit }) => {

  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "food",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (

    <div className="transaction-page">
      <div className="transaction-background"></div>

      <div className="transaction-content">
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>New Transaction</h2>

      <label>
        Amount:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Type:
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label>
        Category:
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="transport">Transport</option>
          <option value="toiletries">Toiletries</option>
          <option value="utilities">Utilities</option>
          <option value="rent">Rent</option>
          <option value="cash withdrawal">Cash Withdrawal</option>
          <option value="household items">Household Items</option>
          <option value="car expenses">Car Expenses</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Transaction</button>
    </form>
    </div>
    </div>
  );
};

export default Transaction;
