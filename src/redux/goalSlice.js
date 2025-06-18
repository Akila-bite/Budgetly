import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://budgetly-backend-jan0.onrender.com/api/goals"; 

// Async thunks
export const fetchGoals = createAsyncThunk("goals/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const createGoal = createAsyncThunk("goals/create", async (budgetData) => {
  const res = await axios.post(API_URL, budgetData);
  return res.data;
});

export const updateGoal = createAsyncThunk("goals/update", async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
});

export const deleteGoal = createAsyncThunk("goals/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const goalslice = createSlice({
  name: "goals",
  initialState: {
    goals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchgoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchgoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchgoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export default goalslice.reducer;
