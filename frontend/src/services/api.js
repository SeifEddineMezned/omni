import axios from "axios";

/**
 * IMPORTANT:
 * - No localhost fallback in production
 * - CRA injects env vars at BUILD TIME
 * - If this is undefined, frontend MUST fail loudly
 */
const API_BASE_URL = process.env.REACT_APP_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "❌ REACT_APP_API_URL is not defined. Set it in Render → Frontend → Environment"
  );
}

/**
 * Axios instance
 * - withCredentials REQUIRED for HttpOnly cookies
 * - baseURL MUST be backend Render URL
 */
const api = axios.create({
  baseURL: API_BASE_URL, // e.g. https://omnibackend-0oc7.onrender.com
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Global response interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error (backend unreachable)
    if (error.request && !error.response) {
      console.error("❌ Network error:", {
        baseURL: api.defaults.baseURL,
        message: "Backend unreachable or CORS blocked",
      });
    }

    // Unauthorized → clear session
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
 * API endpoints
 * NOTE: No full URLs, only relative paths
 */
export const apiEndpoints = {
  auth: {
    login: (credentials) => api.post("/auth/login", credentials),
    register: (userData) => api.post("/auth/register", userData),
    logout: () => api.post("/auth/logout"),
    getCurrentUser: () => api.get("/protected/profile"),
  },

  user: {
    getProfile: () => api.get("/protected/profile"),
    updateProfile: (data) => api.put("/user/profile", data),
    deleteAccount: () => api.delete("/user/account"),
  },

  tasks: {
    getAll: (params) => api.get("/tasks", { params }),
    getById: (id) => api.get(`/tasks/${id}`),
    create: (task) => api.post("/tasks", task),
    update: (id, task) => api.put(`/tasks/${id}`, task),
    delete: (id) => api.delete(`/tasks/${id}`),
    markComplete: (id) => api.patch(`/tasks/${id}/complete`),
  },

  habits: {
    getAll: () => api.get("/habits"),
    getById: (id) => api.get(`/habits/${id}`),
    create: (habit) => api.post("/habits", habit),
    update: (id, habit) => api.put(`/habits/${id}`, habit),
    delete: (id) => api.delete(`/habits/${id}`),
    logEntry: (id, entry) => api.post(`/habits/${id}/entries`, entry),
    getStreak: (id) => api.get(`/habits/${id}/streak`),
  },

  goals: {
    getAll: () => api.get("/goals"),
    getById: (id) => api.get(`/goals/${id}`),
    create: (goal) => api.post("/goals", goal),
    update: (id, goal) => api.put(`/goals/${id}`, goal),
    delete: (id) => api.delete(`/goals/${id}`),
    updateProgress: (id, progress) =>
      api.patch(`/goals/${id}/progress`, { progress }),
  },

  finance: {
    getTransactions: (params) => api.get("/finance/transactions", { params }),
    addTransaction: (transaction) =>
      api.post("/finance/transactions", transaction),
    updateTransaction: (id, transaction) =>
      api.put(`/finance/transactions/${id}`, transaction),
    deleteTransaction: (id) =>
      api.delete(`/finance/transactions/${id}`),
    getBudgets: () => api.get("/finance/budgets"),
    createBudget: (budget) => api.post("/finance/budgets", budget),
    getInsights: () => api.get("/finance/insights"),
  },

  health: {
    getMetrics: () => api.get("/health/metrics"),
    addMetric: (metric) => api.post("/health/metrics", metric),
    getWorkouts: () => api.get("/health/workouts"),
    addWorkout: (workout) => api.post("/health/workouts", workout),
    getNutrition: () => api.get("/health/nutrition"),
    addNutritionEntry: (entry) =>
      api.post("/health/nutrition", entry),
  },

  analytics: {
    getDashboard: () => api.get("/analytics/dashboard"),
    getInsights: (type, period) =>
      api.get(`/analytics/insights/${type}?period=${period}`),
    getReports: () => api.get("/analytics/reports"),
  },

  notifications: {
    getAll: () => api.get("/notifications"),
    markRead: (id) => api.patch(`/notifications/${id}/read`),
    markAllRead: () => api.patch("/notifications/mark-all-read"),
    delete: (id) => api.delete(`/notifications/${id}`),
  },
};

/**
 * Error normalizer
 */
export const handleApiError = (error) => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.message || "Request failed",
      status: error.response.status,
    };
  }

  if (error.request) {
    return {
      success: false,
      message: "Network error. Backend unreachable.",
    };
  }

  return {
    success: false,
    message: error.message || "Unexpected error",
  };
};

/**
 * Wrapper for services (used by auth.js)
 */
export const createApiCall = (apiFunction) => {
  return async (...args) => {
    try {
      const response = await apiFunction(...args);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  };
};

export default api;
