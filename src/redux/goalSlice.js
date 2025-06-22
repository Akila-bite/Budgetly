import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://budgetly-backend-jan0.onrender.com/api/goals";

// Thunks
export const fetchGoals = createAsyncThunk("goals/fetch", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://budgetly-backend-jan0.onrender.com/api/goals", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch goals"
    );
  }
});

export const createGoal = createAsyncThunk("goals/create", async (goalData, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("https://budgetly-backend-jan0.onrender.com/api/goals", goalData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to create goal"
    );
  }
});

export const updateGoal = createAsyncThunk("goals/update", async ({ id, data }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`https://budgetly-backend-jan0.onrender.com/api/goals/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update goal"
    );
  }
});

export const deleteGoal = createAsyncThunk("goals/delete", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`https://budgetly-backend-jan0.onrender.com/api/goals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to delete goal"
    );
  }
});







const goalSlice = createSlice({
  name: "goals",
  initialState: {
    goals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch goals
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create goal
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })

      // Update goal
      .addCase(updateGoal.fulfilled, (state, action) => {
        const index = state.goals.findIndex((goal) => goal._id === action.payload._id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })

      // Delete goal
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((goal) => goal._id !== action.payload);
      });
  },
});

export default goalSlice.reducer;

