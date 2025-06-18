import { useSelector, useDispatch } from "react-redux";
import { useTransactionFilter } from "../context/TransactionFilterContext";
import { deleteTransaction } from "../redux/transactionSlice"; 
import "./TransactionList.css";

const TransactionList = ({ onEdit }) => {
  const items = useSelector((state) => state.transactions?.items || []);
  const dispatch = useDispatch();
  const { typeFilter, categoryFilter } = useTransactionFilter();

  const filtered = items.filter((tx) => {
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
              <td>{tx.category}</td>
              <td>{tx.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => onEdit(tx)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(tx._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;

