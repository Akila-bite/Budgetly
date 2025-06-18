import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://budgetly-backend-jan0.onrender.com/api/budget"; 

// Async thunks
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

const budgetlice = createSlice({
  name: "budget",
  initialState: {
    budget: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchbudget.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchbudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budget = action.payload;
      })
      .addCase(fetchbudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Repeat similar handlers for createBudget, updateBudget, deleteBudget
  },
});

export default budgetlice.reducer;
