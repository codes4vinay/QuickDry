import axios from "axios";

function resolveApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const trimmedUrl = configuredUrl.replace(/\/+$/, "");

  return trimmedUrl.endsWith("/api") ? trimmedUrl : `${trimmedUrl}/api`;
}

const api = axios.create({
  baseURL: resolveApiBaseUrl()
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("laundrypro_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
