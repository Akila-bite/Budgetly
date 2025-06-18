import { useSelector } from "react-redux";
import { useMemo } from "react";

// Optional: filter by selected month/year
const getMonthYearKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // e.g. 2025-06
};

const useBudgetAnalytics = (selectedMonth = null) => {
  const transactions = useSelector((state) => state.transactions.transactions);

  const monthKey = selectedMonth || getMonthYearKey(new Date());

  const filteredTx = useMemo(() => {
    return transactions.filter((tx) => getMonthYearKey(tx.date) === monthKey);
  }, [transactions, monthKey]);

  const { income, expenses, savings, balance, savingsRate } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let savings = 0;

    filteredTx.forEach((tx) => {
      if (tx.type === "income") {
        income += tx.amount;
      } else if (tx.type === "expense") {
        expenses += tx.amount;

        // Optional: count savings separately if they fall under a saving goal/category
        if (
          tx.category.toLowerCase().includes("save") ||
          tx.category.toLowerCase().includes("goal")
        ) {
          savings += tx.amount;
        }
      }
    });

    const balance = income - expenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    return {
      income,
      expenses,
      savings,
      balance,
      savingsRate,
    };
  }, [filteredTx]);

  // Generate month options for a dropdown (if you want a filter UI)
  const availableMonths = useMemo(() => {
    const monthSet = new Set(
      transactions.map((tx) => getMonthYearKey(tx.date))
    );
    return [...monthSet].sort().reverse(); // Most recent first
  }, [transactions]);

  return {
    income: income.toFixed(2),
    expenses: expenses.toFixed(2),
    balance: balance.toFixed(2),
    savings: savings.toFixed(2),
    savingsRate: savingsRate.toFixed(1),
    selectedMonth: monthKey,
    availableMonths,
  };
};

export default useBudgetAnalytics;
