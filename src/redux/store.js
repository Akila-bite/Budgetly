
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './transactionSlice';
import goalsReducer from './goalSlice';
import budgetReducer from './budgetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    goals: goalsReducer,
    budget: budgetReducer,
  },
});
