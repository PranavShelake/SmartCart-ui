//C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\store\slices\authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Async Thunks
export const signupAsync = createAsyncThunk('auth/signup', async ({ email, password, fullName }) => {
  return await authService.signup(email, password, fullName);
});

export const verifySignupAsync = createAsyncThunk('auth/verifySignup', async ({ email, otp }) => {
  return await authService.verifySignup(email, otp);
});

export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }) => {
  return await authService.login(email, password);
});

export const sendOTPAsync = createAsyncThunk('auth/sendOTP', async (email) => {
  return await authService.sendOTP(email);
});

export const verifyOTPAsync = createAsyncThunk('auth/verifyOTP', async ({ email, otp }) => {
  return await authService.verifyOTP(email, otp);
});

export const forgotPasswordAsync = createAsyncThunk('auth/forgotPassword', async (email) => {
  return await authService.forgotPassword(email);
});

export const resetPasswordAsync = createAsyncThunk('auth/resetPassword', async ({ email, resetToken, newPassword }) => {
  return await authService.resetPassword(email, resetToken, newPassword);
});

export const getProfileAsync = createAsyncThunk('auth/getProfile', async (token) => {
  return await authService.getProfile(token);
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    pendingVerification: null,
    pendingOTPLogin: null,
    pendingPasswordReset: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.pendingVerification = null;
      state.pendingOTPLogin = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    setPendingVerification: (state, action) => {
      state.pendingVerification = action.payload;
    },
    setPendingOTPLogin: (state, action) => {
      state.pendingOTPLogin = action.payload;
    },
    setPendingPasswordReset: (state, action) => {
      state.pendingPasswordReset = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingVerification = action.meta.arg.email;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Verify Signup
      .addCase(verifySignupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySignupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.pendingVerification = null;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(verifySignupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Send OTP
      .addCase(sendOTPAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTPAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingOTPLogin = action.meta.arg;
      })
      .addCase(sendOTPAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Verify OTP
      .addCase(verifyOTPAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTPAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.pendingOTPLogin = null;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(verifyOTPAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Forgot Password
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingPasswordReset = action.meta.arg;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Reset Password
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.pendingPasswordReset = null;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Get Profile
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const { logout, clearError, setPendingVerification, setPendingOTPLogin, setPendingPasswordReset } = authSlice.actions;
export default authSlice.reducer;