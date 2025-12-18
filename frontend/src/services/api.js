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
/**
 * Wrapper for services (used by auth.js)
 */
export const createApiCall = (apiFunction) => {
  return async (...args) => {
    try {
      const response = await apiFunction(...args);
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data?.message || "Request failed",
          status: error.response.status,
        };
      }

      return {
        success: false,
        message: "Network error. Backend unreachable.",
      };
    }
  };
};


export default api;

