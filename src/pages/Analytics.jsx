import React from "react";
import {useBudgetAnalytics,useGoalAnalytics,useTransactionAnalytics,useSpendingTrends,} from "../analytics/useAnalytics";
import { useSelector } from "react-redux";
import "./Analytics.css"; // Custom CSS file

// Recharts imports for charts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

const Analytics = () => {
  // Fetch goals from Redux store
  const goals = useSelector((state) => state.goals.goals);

  // Hook for general budget insights (income, expenses, etc.)
  const {
    income,
    expenses,
    balance,
    savings,
    savingsRate,
    selectedMonth,
    availableMonths,
  } = useBudgetAnalytics();

  // Hook for analyzing savings goals
  const { goalInsights, totals } = useGoalAnalytics(goals);

  // Hook for analyzing transactions (weekly/monthly/category)
  const {
    totalIncome,
    totalExpenses,
    categoryBarChartData,
    monthlyTrendData,
    weeklyTrendData,
    predictedMonthlySpending,
  } = useTransactionAnalytics();

  // Hook for spending trends over time (actual vs predicted)
  const { data: spendingTrends } = useSpendingTrends();

  return (
    <div className="analytics-container">
      {/* 📊 Budget Overview */}
      <section className="analytics-card">
        <h2>Budget Summary ({selectedMonth})</h2>
        <ul>
          <li>Income: R{income}</li>
          <li>Expenses: R{expenses}</li>
          <li>Savings: R{savings}</li>
          <li>Balance: R{balance}</li>
          <li>Savings Rate: {savingsRate}%</li>
        </ul>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={[
              { name: "Income", value: +income },
              { name: "Expenses", value: +expenses },
              { name: "Savings", value: +savings },
              { name: "Balance", value: +balance },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 🏁 Goal Progress */}
      <section className="analytics-card">
        <h2>Savings Goals</h2>
        <ul>
          {goalInsights.map((goal) => (
            <li key={goal._id}>
              {goal.title}: {goal.progressPercent.toFixed(1)}% (
              R{goal.currentAmount}/{goal.targetAmount})
            </li>
          ))}
        </ul>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={goalInsights.map((g) => ({
              name: g.title,
              progress: +g.progressPercent,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip />
            <Bar dataKey="progress" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 🍔 Category Breakdown */}
      <section className="analytics-card">
        <h2>Spending by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryBarChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 📆 Weekly Trends */}
      <section className="analytics-card">
        <h2>Weekly Spending</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* 🔮 Monthly Forecast */}
      <section className="analytics-card">
        <h2>Monthly Spending Forecast</h2>
        <p>
          Total so far: R{totalExpenses} | Predicted: R{predictedMonthlySpending}
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={[
              { label: "Spent", value: totalExpenses },
              { label: "Forecast", value: predictedMonthlySpending },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ff7f50" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* 📈 Spending Trends Over Time (Actual vs Predicted) */}
      <section className="analytics-card full-width">
        <h2>Spending Trends & Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={spendingTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Actual Spending Line */}
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              name="Actual"
              isAnimationActive={false}
              data={spendingTrends.filter((d) => !d.isPrediction)}
            />
            {/* Predicted Spending Line */}
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#82ca9d"
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={2}
              name="Predicted"
              isAnimationActive={false}
              data={spendingTrends.filter((d) => d.isPrediction)}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Analytics;



