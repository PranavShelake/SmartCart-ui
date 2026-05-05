import { apiClient } from "../api/client";
import type { UserProfile } from "../store/slices/authSlice";

// ─── Types ────────────────────────────────────────────────────

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
}

export interface Address {
  address_id: number;
  label: string;           // e.g. "Home", "Office"
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface AddressPayload {
  label: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

// ─── Service ──────────────────────────────────────────────────

export const userService = {

  /**
   * GET /users/me
   * Full profile — name, phone, etc.
   * Used by bootstrapAuth on app load
   */
  async getProfile(): Promise<UserProfile> {
    const { data } = await apiClient.get("/users/me");
    return data.data;
  },

  /**
   * PATCH /users/me
   */
  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    const { data } = await apiClient.patch("/users/me", payload);
    return data.data;
  },

  // ── Addresses ──────────────────────────────────────────────

  /**
   * GET /users/me/addresses
   */
  async getAddresses(): Promise<Address[]> {
    const { data } = await apiClient.get("/users/me/addresses");
    return data.data;
  },

  /**
   * POST /users/me/addresses
   */
  async addAddress(payload: AddressPayload): Promise<Address> {
    const { data } = await apiClient.post("/users/me/addresses", payload);
    return data.data;
  },

  /**
   * PUT /users/me/addresses/:id
   */
  async updateAddress(addressId: number, payload: AddressPayload): Promise<Address> {
    const { data } = await apiClient.put(
      `/users/me/addresses/${addressId}`,
      payload
    );
    return data.data;
  },

  /**
   * DELETE /users/me/addresses/:id
   */
  async deleteAddress(addressId: number): Promise<void> {
    await apiClient.delete(`/users/me/addresses/${addressId}`);
  },

  /**
   * PATCH /users/me/addresses/:id/default
   */
  async setDefaultAddress(addressId: number): Promise<void> {
    await apiClient.patch(`/users/me/addresses/${addressId}/default`);
  },
};