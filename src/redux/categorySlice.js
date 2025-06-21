
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://budgetly-backend-jan0.onrender.com/api/categories";

// Fetch categories (protected route)
export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Early reject if no token
      return thunkAPI.rejectWithValue("No auth token found");
    }
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return res.data;
    } catch (err) {
      // Extract a useful error message
      const message =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Add a new category
export const createCategory = createAsyncThunk(
  "categories/create",
  async (categoryData) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(API_URL, categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// Delete a category by ID
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id; // Return the deleted category ID so we can remove it from state
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH CATEGORIES
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;  // Start loading spinner or similar UI
        state.error = null;    // Clear previous errors
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Set categories from response
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store error message
      })

      // CREATE CATEGORY
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload); // Add new category to list
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE CATEGORY
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Remove category with matching _id from state.categories
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;

