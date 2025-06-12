import { createContext, useState, useContext } from 'react';

const TransactionFilterContext = createContext();

export const useTransactionFilter = () => useContext(TransactionFilterContext);

export const TransactionFilterProvider = ({ children }) => {
  const [typeFilter, setTypeFilter] = useState("all"); // income | expense | all
  const [categoryFilter, setCategoryFilter] = useState("all");

  return (
    <TransactionFilterContext.Provider
      value={{ typeFilter, setTypeFilter, categoryFilter, setCategoryFilter }}
    >
      {children}
    </TransactionFilterContext.Provider>
  );
};
