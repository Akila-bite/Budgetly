// src/pages/Dashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

      {/* Budget Page Card */}
      <DashboardCard
        title="Budget"
        size="large"
        customClass="budget-card"
        onClick={() => navigate("/budget")}
      >
        <p>Track your income, expenses, and overall budget.</p>
      </DashboardCard>

      {/* Transactions Page Card */}
      <DashboardCard
        title="Transactions"
        size="medium"
        customClass="transactions-card"
        onClick={() => navigate("/transactionlist")}
      >
        <p>View, add, and edit your recent transactions.</p>
      </DashboardCard>

      {/* Goals Page Card */}
      <DashboardCard
        title="Goals"
        size="medium"
        customClass="goals-card"
        onClick={() => navigate("/goals")}
      >
        <p>Stay motivated with short- and long-term financial goals.</p>
      </DashboardCard>

      {/* Analytics Page Card */}
      <DashboardCard
        title="Analytics"
        size="large"
        customClass="analytics-card"
        onClick={() => navigate("/analytics")}
      >
        <p>Visualize your spending and saving trends.</p>
      </DashboardCard>

    </div>
  );
};

export default Dashboard;
