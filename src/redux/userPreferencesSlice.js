// src/redux/slices/userPreferencesSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "Student", // default
  budgetingStyle: "I track every cent", // default
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setBudgetingStyle: (state, action) => {
      state.budgetingStyle = action.payload;
    },
  },
});

export const { setUserType, setBudgetingStyle } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
