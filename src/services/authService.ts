import { apiClient } from "../api/client";

// ─── Types ────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    roles: string[];
  };
}

// ─── Service ──────────────────────────────────────────────────

export const authService = {

  /**
   * POST /auth/login
   * Returns access token (body) + sets refresh token (HTTP-only cookie)
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post("/auth/login", payload);
  const raw = data.data;

  // Backend sends "id" but frontend expects "user_id" everywhere
  return {
    ...raw,
    user: {
      ...raw.user,
      user_id: String(raw.user.id),
    },
  };
},

  /**
   * POST /auth/register
   */
  async register(payload: RegisterPayload): Promise<{ user_id: string; message: string }> {
    const { data } = await apiClient.post("/auth/register", payload);
    return data.data;
  },

  /**
   * POST /auth/logout
   * Revokes current device refresh token
   */
  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  },

  /**
   * POST /auth/logout-all
   * Revokes ALL refresh tokens for this user
   */
  async logoutAll(): Promise<void> {
    await apiClient.post("/auth/logout-all");
  },

  /**
   * POST /auth/forgot-password
   * Always returns same message (backend prevents email enumeration)
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await apiClient.post("/auth/forgot-password", { email });
    return { message: data.message };
  },

  /**
   * POST /auth/reset-password
   */
  async resetPassword(payload: {
    token: string;
    new_password: string;
    confirm_password: string;
  }): Promise<{ message: string }> {
    const { data } = await apiClient.post("/auth/reset-password", payload);
    return { message: data.message };
  },

  /**
   * POST /auth/verify-email
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    const { data } = await apiClient.post("/auth/verify-email", { token });
    return { message: data.message };
  },
};