import axios from "axios";

/**
 * SAME-ORIGIN API
 * Frontend calls /api → proxied to backend
 * NO CORS
 */
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Global interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.request && !error.response) {
      console.error("❌ Network error (backend down)");
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
 * ✅ API ENDPOINTS (YOU WERE MISSING THIS)
 */
export const apiEndpoints = {
  auth: {
    login: (data) => api.post("/auth/login", data),
    register: (data) => api.post("/auth/register", data),
    logout: () => api.post("/auth/logout"),
    getCurrentUser: () => api.get("/protected/profile"),
  },
};

/**
 * Wrapper used by auth.js
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
