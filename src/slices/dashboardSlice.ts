import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardData } from "../services/dashboardService";

interface DashboardState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const getDashboardData = createAsyncThunk(
  "dashboard/getData",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDashboardData();
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;