
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import transactionReducer from './transactionSlice';
import goalsReducer from './goalSlice';
import budgetReducer from './budgetSlice';
import categoryReducer from './categorySlice';
import userPreferencesReducer from './userPreferencesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    goals: goalsReducer,
    budget: budgetReducer,
    categories: categoryReducer,
     user: userPreferencesReducer,
  },
});
