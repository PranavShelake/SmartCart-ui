import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // important for refresh cookie
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;