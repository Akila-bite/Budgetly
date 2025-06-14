import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://budgetly-backend-jan0.onrender.com/api/transactions";

// Create transaction
export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (transactionData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(API_URL, transactionData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create transaction"
      );
    }
  }
);

// Delete transaction
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete transaction"
      );
    }
  }
);

// Update transaction
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update transaction"
      );
    }
  }
);

// Slice
const transactionSlice = createSlice({
  name: "transactions",
 initialState: {
  transactions: [],
  loading: false,
  error: null,
  totals: {
    income: 0,
    expenses: 0,
    balance: 0,
  },
},

  reducers: {
    resetTransactionState: (state) => {
      state.loading = false;
      state.error = null;
    },

      setTotals: (state, action) => {
  state.totals = action.payload;
},
  },


  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (tx) => tx._id !== action.payload
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.map((tx) =>
          tx._id === action.payload._id ? action.payload : tx
        );
      })
      .addCase(updateTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransactionState, setTotals } = transactionSlice.actions;
export default transactionSlice.reducer;

