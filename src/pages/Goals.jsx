import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import MoneyToast from '../components/MoneyToast'; 
import "./Goals.css"; 

const Goals = () => {
  // ========== STATE ==========

  // Holds the array of goal objects fetched from the backend
  const [goals, setGoals] = useState([]);

  // Controlled form data for adding a new goal
  const [formData, setFormData] = useState({
    title: "",
    goalType: "saving",
    category: "",
    targetAmount: "",
    timeframe: "monthly",
    dueDate: "",
    description: "",
  });

  // Filtering states for goal list
  const [filterType, setFilterType] = useState("");
  const [filterTimeframe, setFilterTimeframe] = useState("");

  // Tracks individual progress updates for each goal
  const [updatedProgress, setUpdatedProgress] = useState({});

  

  // Fetches all goals belonging to the logged-in user
  const fetchGoals = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("/api/goals", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Fetched goals data:", res.data);
    setGoals(res.data);
  };

  // Fetch on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // ========== FORM HANDLERS ==========

  // Updates form input values as user types/selects
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submits a new goal to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post("/api/goals", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

     toast.success(<MoneyToast message="Goal added successfully!" />);


    fetchGoals(); // Refresh list after adding
    // Reset the form
    setFormData({
      title: "",
      goalType: "saving",
      category: "",
      targetAmount: "",
      timeframe: "monthly",
      dueDate: "",
      description: "",
    });
  };

  // Submits progress update for a specific goal
  const handleUpdateProgress = async (goalId) => {
    const token = localStorage.getItem("token");
    const progress = updatedProgress[goalId];

    if (progress === undefined || progress === "") return; // Ignore if empty

    await axios.put(
      `/api/goals/${goalId}`,
      { currentAmount: progress },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUpdatedProgress((prev) => ({ ...prev, [goalId]: "" }));
    fetchGoals(); // Refresh list
  };

  // ========== RENDER ==========

  return (
    <div className="goals-container">
      <h2 className="page-title">Goal Tracker</h2>

      {/* Main grid: left = form, right = list */}
      <div className="goals-grid">
        <div className="goal-form-card">
          <h3>New Goal</h3>
          <form className="goal-form" onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Goal title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <select name="goalType" value={formData.goalType} onChange={handleChange}>
              <option value="saving">Saving</option>
              <option value="spending">Spending</option>
            </select>
            <input
              name="category"
              placeholder="Category (e.g., car, food)"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <input
              name="targetAmount"
              type="number"
              placeholder="Target amount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
            />
            <select name="timeframe" value={formData.timeframe} onChange={handleChange}>
              <option value="short-term">Short-term</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="long-term">Long-term</option>
            </select>
            <input
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Add Goal</button>
          </form>
        </div>

        {/* RIGHT SIDE:GOALS LIST */}
        <div className="goals-list-card">
          <h3>My Goals</h3>

          {/* Filters for the goals list */}
          <div className="goal-filters">
            <label>Filter by type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              <option value="saving">Saving</option>
              <option value="spending">Spending</option>
            </select>

            <label>Filter by timeframe:</label>
            <select value={filterTimeframe} onChange={(e) => setFilterTimeframe(e.target.value)}>
              <option value="">All Timeframes</option>
              <option value="short-term">Short-term</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="long-term">Long-term</option>
            </select>
          </div>

          {/* List of filtered goals */}
          <ul className="goals-list">
            {Array.isArray(goals) &&
              goals
                .filter(
                  (goal) =>
                    (!filterType || goal.goalType === filterType) &&
                    (!filterTimeframe || goal.timeframe === filterTimeframe)
                )
                .map((goal) => (
                  <li key={goal._id} className="goal-item">
                    <strong>{goal.title}</strong> – {goal.goalType} – {goal.category} – R{goal.targetAmount}
                    <p>{goal.description}</p>

                    {/* Progress bar visualization */}
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <small>{`Progress: R${goal.currentAmount} / R${goal.targetAmount}`}</small>

                    {/* Progress update input */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateProgress(goal._id);
                      }}
                      className="update-progress-form"
                    >
                      <input
                        type="number"
                        placeholder="Update progress"
                        value={updatedProgress[goal._id] || ""}
                        onChange={(e) =>
                          setUpdatedProgress({ ...updatedProgress, [goal._id]: e.target.value })
                        }
                      />
                      <button type="submit">Update</button>
                    </form>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Goals;


