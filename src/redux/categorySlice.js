// features/category/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://budgetly-backend-jan0.onrender.com/api/categories";

// Fetch categories
export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add category
export const createCategory = createAsyncThunk("categories/create", async (categoryData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(API_URL, categoryData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

// Delete category
export const deleteCategory = createAsyncThunk("categories/delete", async (id) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

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
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
