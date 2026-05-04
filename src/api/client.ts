// src/api/client.ts
import axios from "axios";
import { config } from "../config";

export const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
        
      localStorage.removeItem("access_token");
      
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);