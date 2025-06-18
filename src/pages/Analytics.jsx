
import React from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, PieChart, Pie, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const transactions = useSelector((state) => state.transactions.items);
  const income = useSelector((state) => state.transactions.totalIncome);
  const expenses = useSelector((state) => state.transactions.totalExpenses);
  const balance = income - expenses;

  const monthlyTrends = [
    { month: "Jan", income: 4000, expenses: 2500 },
    { month: "Feb", income: 4200, expenses: 2700 },
    { month: "Mar", income: 4100, expenses: 3200 },
    { month: "Apr", income: 4300, expenses: 3100 },
  ];

  const categoryBreakdown = [
    { name: "Food", value: 900 },
    { name: "Transport", value: 400 },
    { name: "Entertainment", value: 300 },
    { name: "Utilities", value: 600 },
  ];

  const savingsRate = ((income - expenses) / income) * 100;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard title="Total Income" value={`R${income}`} />
        <SummaryCard title="Total Expenses" value={`R${expenses}`} />
        <SummaryCard title="Current Balance" value={`R${balance}`} />
        <SummaryCard title="Savings Rate" value={`${savingsRate.toFixed(1)}%`} />
      </div>

      {/* Trends */}
      <h2 className="text-xl font-semibold mb-2">Monthly Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyTrends}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#4ade80" />
          <Line type="monotone" dataKey="expenses" stroke="#f87171" />
        </LineChart>
      </ResponsiveContainer>

      {/* Category Breakdown */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryBreakdown}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#60a5fa"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Forecasting Example */}
      <div className="mt-8 bg-blue-50 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Trend Prediction</h2>
        <p>
          Based on your current spending rate, you are projected to spend approximately <strong>R3200</strong> this month.
        </p>
        <p className="text-sm text-gray-500 mt-1">* This is a basic forecast. More accurate predictions coming soon.</p>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-sm text-gray-600">{title}</h3>
    <p className="text-lg font-bold">{value}</p>
  </div>
);

export default Analytics;

