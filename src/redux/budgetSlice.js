import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://budgetly-backend-jan0.onrender.com/api/budget";

// Thunks
export const fetchBudget = createAsyncThunk("budget/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const createBudget = createAsyncThunk("budget/create", async (budgetData) => {
  const res = await axios.post(API_URL, budgetData);
  return res.data;
});

export const updateBudget = createAsyncThunk("budget/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
});

export const deleteBudget = createAsyncThunk("budget/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budget: [], // this should be a list if you're expecting multiple budgets
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBudget.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budget = action.payload;
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createBudget.fulfilled, (state, action) => {
        state.budget.push(action.payload);
      })

      // Update
      .addCase(updateBudget.fulfilled, (state, action) => {
        const index = state.budget.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.budget[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.budget = state.budget.filter(b => b._id !== action.payload);
      });
  },
});

export default budgetSlice.reducer;

