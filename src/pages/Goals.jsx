import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MoneyToast from "../components/MoneyToast";
import { useAuthRequest } from "../constants/useAuthRequest"; // ✅ custom hook
import "./Goals.css";

const Goals = () => {
  const authRequest = useAuthRequest(); // ✅

  // ========== STATE ==========

  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    goalType: "saving",
    category: "",
    targetAmount: "",
    timeframe: "monthly",
    dueDate: "",
    description: "",
  });
  const [filterType, setFilterType] = useState("");
  const [filterTimeframe, setFilterTimeframe] = useState("");
  const [updatedProgress, setUpdatedProgress] = useState({});

  // ========== FETCH GOALS ==========

  const fetchGoals = async () => {
    try {
      const data = await authRequest({
        method: "GET",
        url: "/goals",
      });
      setGoals(data);
    } catch (err) {
      toast.error(
        <MoneyToast message={err.response?.data?.message || "Failed to fetch goals"} />
      );
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // ========== FORM HANDLERS ==========

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authRequest({
        method: "POST",
        url: "/goals",
        data: formData,
      });

      toast.success(<MoneyToast message="Goal added successfully!" />);
      fetchGoals();

      setFormData({
        title: "",
        goalType: "saving",
        category: "",
        targetAmount: "",
        timeframe: "monthly",
        dueDate: "",
        description: "",
      });
    } catch (err) {
      toast.error(
        <MoneyToast message={err.response?.data?.message || "Failed to add goal"} />
      );
    }
  };

  const handleUpdateProgress = async (goalId) => {
    const progress = updatedProgress[goalId];
    if (progress === undefined || progress === "") return;

    try {
      await authRequest({
        method: "PUT",
        url: `/goals/${goalId}`,
        data: { currentAmount: progress },
      });

      toast.success(<MoneyToast message="Progress updated!" />);
      setUpdatedProgress((prev) => ({ ...prev, [goalId]: "" }));
      fetchGoals();
    } catch (err) {
      toast.error(
        <MoneyToast message={err.response?.data?.message || "Update failed"} />
      );
    }
  };

  // ========== RENDER ==========

  return (
    <div className="goals-container">
      <h2 className="page-title">Goal Tracker</h2>

      <div className="goals-grid">
        {/* LEFT: GOAL FORM */}
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

        {/* RIGHT: GOALS LIST */}
        <div className="goals-list-card">
          <h3>My Goals</h3>

          {/* Filters */}
          <div className="goal-filters">
            <label>Filter by type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              <option value="saving">Saving</option>
              <option value="spending">Spending</option>
            </select>

            <label>Filter by timeframe:</label>
            <select
              value={filterTimeframe}
              onChange={(e) => setFilterTimeframe(e.target.value)}
            >
              <option value="">All Timeframes</option>
              <option value="short-term">Short-term</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="long-term">Long-term</option>
            </select>
          </div>

          {/* List */}
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
                    <strong>{goal.title}</strong> – {goal.goalType} – {goal.category} – R
                    {goal.targetAmount}
                    <p>{goal.description}</p>

                    {/* Progress bar */}
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.min(
                            (goal.currentAmount / goal.targetAmount) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <small>
                      {`Progress: R${goal.currentAmount} / R${goal.targetAmount}`}
                    </small>

                    {/* Progress input */}
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
                          setUpdatedProgress({
                            ...updatedProgress,
                            [goal._id]: e.target.value,
                          })
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



