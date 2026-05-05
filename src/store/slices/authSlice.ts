import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../../api/client";

export interface UserProfile {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  roles: string[];
  avatar_url?: string | null;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  // ✅ isBootstrapped: true once we've checked localStorage on app load
  // This is what ProtectedRoute waits for — NOT status
  isBootstrapped: boolean;
  status: "idle" | "loading" | "pending" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isBootstrapped: false,
  status: "idle",
  error: null,
};

export const bootstrapAuth = createAsyncThunk(
  "auth/bootstrap",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      // ✅ No token = not logged in. Don't hit the API at all.
      if (!token) return rejectWithValue("No token");

      const { data } = await apiClient.get("/users/me");
      return data.data as UserProfile;
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

export const loginSuccess = createAsyncThunk(
  "auth/loginSuccess",
  async (payload: { access_token: string; user: UserProfile }, { rejectWithValue }) => {
    try {
      localStorage.setItem("access_token", payload.access_token);
      return payload.user;
    } catch {
      return rejectWithValue("Failed to save session");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // Even if API fails, clear local state
  } finally {
    localStorage.removeItem("access_token");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserLocally(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    clearError(state) {
      state.error = null;
    },
    // ✅ Called by the session-expired event listener in App.tsx
    sessionExpired(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isBootstrapped = true;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // ── bootstrapAuth ──────────────────────────────────────
    builder
      .addCase(bootstrapAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBootstrapped = true; // ✅ done checking
        state.status = "idle";
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isBootstrapped = true; // ✅ done checking (user just isn't logged in)
        state.status = "idle";
      });

    // ── loginSuccess ───────────────────────────────────────
    builder
      .addCase(loginSuccess.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginSuccess.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isBootstrapped = true;
        state.status = "idle";
      })
      .addCase(loginSuccess.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // ── logout ─────────────────────────────────────────────
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      // isBootstrapped stays true — no need to re-check
    });
  },
});

export const { updateUserLocally, clearError, sessionExpired } = authSlice.actions;
export default authSlice.reducer;

export const selectUser             = (s: { auth: AuthState }) => s.auth.user;
export const selectIsAuthenticated  = (s: { auth: AuthState }) => s.auth.isAuthenticated;
export const selectAuthStatus       = (s: { auth: AuthState }) => s.auth.status;
export const selectIsBootstrapped   = (s: { auth: AuthState }) => s.auth.isBootstrapped;

export const selectDisplayName = (s: { auth: AuthState }) => {
  const u = s.auth.user;
  if (!u) return "";
  return `${u.first_name} ${u.last_name}`.trim();
};

export const selectPrimaryRole = (s: { auth: AuthState }) => {
  const roles = s.auth.user?.roles ?? [];
  if (roles.includes("admin")) return "Administrator";
  if (roles.includes("manager")) return "Manager";
  return "Customer";
};