import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_URL as string;

axios.defaults.baseURL = baseURL + "/api";

// Attach the token to the Authorization header
axios.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
