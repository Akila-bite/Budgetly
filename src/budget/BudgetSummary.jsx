// import React, { useMemo, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setTotals } from '../redux/slices/transactionsSlice'; // adjust the path

// const BudgetSummary = () => {
//   const dispatch = useDispatch();
//   const transactions = useSelector((state) => state.transactions.items);

//   // 👇 Calculate totals using useMemo (won’t recalculate unless transactions change)
//   const { income, expenses, balance } = useMemo(() => {
//     const income = transactions
//       .filter((tx) => tx.type === 'income')
//       .reduce((sum, tx) => sum + tx.amount, 0);

//     const expenses = transactions
//       .filter((tx) => tx.type === 'expense')
//       .reduce((sum, tx) => sum + tx.amount, 0);

//     return {
//       income,
//       expenses,
//       balance: income - expenses,
//     };
//   }, [transactions]);

//   // 👇 Save totals to Redux state for reuse in other components (dashboard, navbar, etc.)
//   useEffect(() => {
//     dispatch(setTotals({ income, expenses, balance }));
//   }, [income, expenses, balance, dispatch]);

//   return (
//     <div className="p-6 rounded-xl bg-white shadow max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Budget Summary</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//         <div className="bg-green-100 p-4 rounded-lg shadow">
//           <h3 className="text-lg font-medium">Total Income</h3>
//           <p className="text-2xl text-green-600 font-bold">R{income.toFixed(2)}</p>
//         </div>

//         <div className="bg-red-100 p-4 rounded-lg shadow">
//           <h3 className="text-lg font-medium">Total Expenses</h3>
//           <p className="text-2xl text-red-600 font-bold">R{expenses.toFixed(2)}</p>
//         </div>

//         <div className={`p-4 rounded-lg shadow ${balance >= 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}>
//           <h3 className="text-lg font-medium">Balance</h3>
//           <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
//             R{balance.toFixed(2)}
//           </p>
//         </div>
//       </div>

//       {/* Placeholder for future charts */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-2">Visual Insights (Coming Soon)</h3>
//         <div className="h-60 bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center">
//           <p className="text-gray-500">Chart area – Pie/Bar/Line charts will go here</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BudgetSummary;

import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotals } from "../redux/transactionSlice";

const BudgetSummary = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);

  // calculate with useMemo (won’t recalculate unless transactions change)
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

//   Save totals to Redux state for reuse in other components (dashboard, navbar, etc.)
  useEffect(() => {
    dispatch(setTotals({ income, expenses, balance }));
  }, [income, expenses, balance, dispatch]);

  return (

    <div className="p-6 rounded-xl bg-white shadow max-w-4xl mx-auto">
    <div>
      {/* summary display */}
      {/* Add classNams later for styling purposes */}
      <p>Income: R{income.toFixed(2)}</p>
      <p>Expenses: R{expenses.toFixed(2)}</p>
      <p>Balance: R{balance.toFixed(2)}</p>
    </div>

 /* Placeholder for future charts */
      <div className="mt-8">
         <h3 className="text-xl font-semibold mb-2">Visual Insights (Coming Soon)</h3>
         <div className="h-60 bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center">
           <p className="text-gray-500">Chart area – Pie/Bar/Line charts will go here</p>
        </div>
      </div>
      
      </div>


  );
};

export default BudgetSummary;

