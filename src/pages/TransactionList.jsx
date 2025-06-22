import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransactionFilter } from "../context/TransactionFilterContext";
import { deleteTransaction, fetchTransactions } from "../redux/transactionSlice";
import { fetchCategories } from "../redux/categorySlice";
import "./TransactionList.css";

const TransactionList = ({ onEdit }) => {
  const dispatch = useDispatch();

  // Access transactions and categories correctly based on your Redux slice keys
  const { transactions = [] } = useSelector((state) => state.transaction);
  const { categories = [] } = useSelector((state) => state.categories);

  const { typeFilter, categoryFilter } = useTransactionFilter();

  // Fetch transactions and categories on mount
  useEffect(() => {
    dispatch(fetchTransactions());
    if (!categories.length) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  // Map category ID to category name
  const getCategoryName = (id) => {
    const match = categories.find((cat) => cat._id === id);
    return match ? match.name : id; // fallback to ID if not found
  };

  // Filter transactions based on selected filters
  const filtered = transactions.filter((tx) => {
    const typeMatch = typeFilter === "all" || tx.type === typeFilter;
    const categoryMatch = categoryFilter === "all" || tx.category === categoryFilter;
    return typeMatch && categoryMatch;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount (R)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((tx) => (
            <tr key={tx._id}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.description || "-"}</td>
              <td className={tx.type === "income" ? "income" : "expense"}>{tx.type}</td>
              <td>{getCategoryName(tx.category)}</td>
              <td>{tx.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => onEdit(tx)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(tx._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;


