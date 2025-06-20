import React, { useMemo, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTotals } from "../redux/transactionSlice";
import daffyStacks from '../assets/display images/Daffy with stacks.jpg';
import './budget.css';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Budget = () => {
  const dispatch = useDispatch();

  // Get transactions from Redux store or default to an empty array
  const transactions = useSelector((state) =>
    (state.transactions && state.transactions.items) || []
  );

  // Calculate totals using useMemo to avoid recalculating unless transactions change
  const { income, expenses, balance } = useMemo(() => {
    const income = transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  // Dispatch totals to Redux store so they can be used in other components
  useEffect(() => {
    dispatch(setTotals({ income, expenses, balance }));
  }, [income, expenses, balance, dispatch]);

    // ✅ Chart.js data setup
  const chartData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Budget Overview',
        data: [income, expenses, balance],
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
        borderWidth: 1,
        cutout: '60%' // Makes it a donut chart
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };


  return (
<>
 <div className="budget-page-header">
       <h3 className="budget-title">
     stay on top of your balance.
  </h3>
  <p className="budget-subtext">
    This balance not looking too accurate?{" "}
    <a href="/transactionlist" className="budget-link">
      Check your recorded transactions for possible errors or mistakes.
    </a>
  </p>
    </div>
    <div className="budget-container">
      {/* LEFT SIDE: Budget summary and placeholder */}
      <div className="budget-content">
        <div className="budget-totals">
          <p>Income: R{income.toFixed(2)}</p>
          <p>Expenses: R{expenses.toFixed(2)}</p>
          <p>Balance: R{balance.toFixed(2)}</p>
        </div>

         {/* Donut Chart */}
        <div className="budget-chart-placeholder">
          <h3>Get a feel of how things are looking:</h3>
          <div className="chart-box">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Image */}
      <div className="budget-image">
        <img src={daffyStacks} alt="Budget Illustration" />
      </div>
    </div>
  </>
  );
};

export default Budget;



