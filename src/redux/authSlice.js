
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://budgetly-backend-jan0.onrender.com/api/users';

// REGISTER USER
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, formData);
      localStorage.setItem('token', res.data.token); // optional
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://budgetly-backend-jan0.onrender.com/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to load user profile"
    );
  }
});


// SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CURRENT USER
.addCase(fetchCurrentUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchCurrentUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
})
.addCase(fetchCurrentUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
