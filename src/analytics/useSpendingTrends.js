import { useSelector } from "react-redux";
import { useMemo } from "react";

const formatMonthLabel = (date) =>
  date.toLocaleString("default", { month: "short", year: "numeric" });

const useSpendingTrends = () => {
  // Defensive default empty array for transactions
  const { items: transactions = [] } = useSelector((state) => state.transaction || {});

  const data = useMemo(() => {
    const monthlyTotals = {};
    const today = new Date();

    transactions.forEach((tx) => {
      if (tx.type === "expense") {
        const txDate = new Date(tx.date);
        const monthKey = `${txDate.getFullYear()}-${txDate.getMonth()}`;
        const label = formatMonthLabel(txDate);

        if (!monthlyTotals[monthKey]) {
          monthlyTotals[monthKey] = { label, amount: 0 };
        }

        monthlyTotals[monthKey].amount += tx.amount;
      }
    });

    const sorted = Object.entries(monthlyTotals)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([_, val]) => ({
        ...val,
        amount: parseFloat(val.amount.toFixed(2)),
        isPrediction: false,
      }));

    const numPastMonths = sorted.length;
    if (numPastMonths >= 2) {
      const lastMonthAmount = sorted[numPastMonths - 1].amount;
      const prevMonthAmount = sorted[numPastMonths - 2].amount;

      const growthRate = lastMonthAmount - prevMonthAmount;

      const lastDate = new Date();
      lastDate.setMonth(lastDate.getMonth() + 1);

      for (let i = 0; i < 3; i++) {
        const futureDate = new Date(lastDate.getFullYear(), lastDate.getMonth() + i);
        const predictedAmount = lastMonthAmount + growthRate * (i + 1);

        sorted.push({
          label: formatMonthLabel(futureDate),
          amount: parseFloat(predictedAmount.toFixed(2)),
          isPrediction: true,
        });
      }
    }

    return sorted;
  }, [transactions]);

  return { data };
};

export default useSpendingTrends;



