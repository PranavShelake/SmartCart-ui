import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../../api/client";

// ─── Types ────────────────────────────────────────────────────

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
  // "loading" = first-time boot check (are we logged in?)
  // "idle"    = nothing happening
  // "pending" = login/logout in progress
  status: "idle" | "loading" | "pending" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

// ─── Thunks ───────────────────────────────────────────────────

/**
 * Called once on app boot (in Layout.tsx).
 * Fetches the real user profile from the backend.
 * If the access token is expired, the apiClient interceptor
 * will silently refresh it before this request completes.
 */
export const bootstrapAuth = createAsyncThunk(
  "auth/bootstrap",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return rejectWithValue("No token");

      // /users/me gives us the full profile (name, phone, etc.)
      // /auth/me is lightweight (JWT claims only — no DB call)
      // We use /users/me here because TopBar needs name + role
      const { data } = await apiClient.get("/users/me");
      return data.data as UserProfile;
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

/**
 * Called after a successful login API call.
 * We receive the access token + user object from the login response.
 */
export const loginSuccess = createAsyncThunk(
  "auth/loginSuccess",
  async (
    payload: { access_token: string; user: UserProfile },
    { rejectWithValue }
  ) => {
    try {
      localStorage.setItem("access_token", payload.access_token);
      return payload.user;
    } catch {
      return rejectWithValue("Failed to save session");
    }
  }
);

/**
 * Logs out from the current device.
 * Backend revokes the refresh token; we clear local state.
 */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Even if the API call fails, we still clear local state
      // so the user isn't stuck logged in on the frontend
    } finally {
      localStorage.removeItem("access_token");
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Use this if you need to update user fields locally after
    // a profile edit, without re-fetching everything
    updateUserLocally(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError(state) {
      state.error = null;
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
        state.status = "idle";
        state.error = null;
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
        // Don't set error here — a missing token on boot
        // is expected (user just hasn't logged in yet)
      });

    // ── loginSuccess ───────────────────────────────────────
    builder
      .addCase(loginSuccess.pending, (state) => {
        state.status = "pending";
      })
      .addCase(loginSuccess.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "idle";
        state.error = null;
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
    });
  },
});

export const { updateUserLocally, clearError } = authSlice.actions;
export default authSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────
// Always use selectors — never access state.auth directly in components

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.status;
export const selectAuthError = (state: { auth: AuthState }) =>
  state.auth.error;

// Derived: full display name
export const selectDisplayName = (state: { auth: AuthState }) => {
  const u = state.auth.user;
  if (!u) return "";
  return `${u.first_name} ${u.last_name}`.trim();
};

// Derived: primary role (your backend sends roles as an array)
export const selectPrimaryRole = (state: { auth: AuthState }) => {
  const roles = state.auth.user?.roles ?? [];
  if (roles.includes("admin")) return "Administrator";
  if (roles.includes("manager")) return "Manager";
  return "Customer";
};