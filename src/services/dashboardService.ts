// services/dashboardService.ts

import { apiClient } from "../api/client";

export const fetchDashboardData = async () => {
  console.log("Fetching dashboard data...");

  const response = await apiClient.get("/auth/me");

  return response.data.data; 
  
};

export const logout = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch (err) {
    console.error("Logout API error:", err);
  } finally {
    localStorage.removeItem("access_token");
  }
};