// src/store/slices/shoppingHistorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

// Async thunk to fetch shopping history
export const fetchShoppingHistory = createAsyncThunk(
  'shoppingHistory/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/shopping-history`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch shopping history'
      );
    }
  }
);

const shoppingHistorySlice = createSlice({
  name: 'shoppingHistory',
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearShoppingHistory: (state) => {
      state.items = [];
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShoppingHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchShoppingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearShoppingHistory } = shoppingHistorySlice.actions;
export default shoppingHistorySlice.reducer;