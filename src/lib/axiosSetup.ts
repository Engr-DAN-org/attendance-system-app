import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: baseURL + "/api",
});

// Attach the token to the Authorization header
api.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
