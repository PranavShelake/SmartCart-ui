//C:\Users\PranavShelake\Desktop\project\forntend\smart-cart\src\services\authService.js
import { API_BASE_URL } from '../utils/constants';

const authService = {
  signup: async (email, password, fullName) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Signup failed');
    }
    return res.json();
  },

  verifySignup: async (email, otp) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/verify-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Verification failed');
    }
    return res.json();
  },

  resendVerification: async (email) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to resend code');
    }
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    return res.json();
  },

  sendOTP: async (email) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to send OTP');
    }
    return res.json();
  },

  verifyOTP: async (email, otp) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'OTP verification failed');
    }
    return res.json();
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to send reset instructions');
    }
    return res.json();
  },

  resetPassword: async (email, resetToken, newPassword) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, reset_token: resetToken, new_password: newPassword })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Password reset failed');
    }
    return res.json();
  },

  getProfile: async (token) => {
    const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to fetch profile');
    }
    return res.json();
  }
};

export default authService;
