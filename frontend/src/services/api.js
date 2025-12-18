import axios from "axios";

/**
 * ✅ SAME-ORIGIN API
 * Browser calls /api → frontend server proxies to backend
 * NO CORS. NO ENV VARS. NO COOKIES ISSUES.
 */
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request && !error.response) {
      console.error("❌ Network error (proxy/backend down)");
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
