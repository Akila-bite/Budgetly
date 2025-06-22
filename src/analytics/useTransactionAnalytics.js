import { useSelector } from "react-redux";
import { useTransactionFilter } from "../context/TransactionFilterContext";

const formatDate = (date) => date.toISOString().split("T")[0];

const useTransactionAnalytics = () => {
  // Changed here:
  const { items } = useSelector((state) => state.transaction);  // singular 'transaction'
  const { typeFilter, categoryFilter } = useTransactionFilter();

  const filteredTransactions = items.filter((tx) => {
    const typeMatch = typeFilter === "all" || tx.type === typeFilter;
    const categoryMatch = categoryFilter === "all" || tx.category === categoryFilter;
    return typeMatch && categoryMatch;
  });

  const totalIncome = filteredTransactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const spendingByCategory = filteredTransactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const categoryBarChartData = Object.entries(spendingByCategory).map(([category, amount]) => ({
    category,
    amount: parseFloat(amount.toFixed(2)),
  }));

  const monthlySpending = {};

  filteredTransactions.forEach((tx) => {
    if (tx.type === "expense") {
      const date = new Date(tx.date);
      const month = date.toLocaleString("default", { month: "short", year: "numeric" });
      monthlySpending[month] = (monthlySpending[month] || 0) + tx.amount;
    }
  });

  const monthlyTrendData = Object.entries(monthlySpending).map(([month, amount]) => ({
    month,
    amount: parseFloat(amount.toFixed(2)),
  }));

  const today = new Date();
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return formatDate(d);
  });

  const weeklySpendingMap = {};
  last7Days.forEach((date) => (weeklySpendingMap[date] = 0));

  filteredTransactions.forEach((tx) => {
    const dateStr = formatDate(new Date(tx.date));
    if (tx.type === "expense" && weeklySpendingMap[dateStr] !== undefined) {
      weeklySpendingMap[dateStr] += tx.amount;
    }
  });

  const weeklyTrendData = last7Days.reverse().map((date) => ({
    date,
    amount: parseFloat((weeklySpendingMap[date] || 0).toFixed(2)),
  }));

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const currentMonthExpenses = filteredTransactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      tx.type === "expense" &&
      txDate.getMonth() === currentMonth &&
      txDate.getFullYear() === currentYear
    );
  });

  const daysSoFar = today.getDate();
  const currentTotal = currentMonthExpenses.reduce((sum, tx) => sum + tx.amount, 0);
  const averagePerDay = currentTotal / daysSoFar;
  const prediction = averagePerDay * new Date(currentYear, currentMonth + 1, 0).getDate();

  return {
    totalIncome: parseFloat(totalIncome.toFixed(2)),
    totalExpenses: parseFloat(totalExpenses.toFixed(2)),
    categoryBarChartData,
    monthlyTrendData,
    weeklyTrendData,
    predictedMonthlySpending: parseFloat(prediction.toFixed(2)),
    filteredTransactions,
  };
};

export default useTransactionAnalytics;


