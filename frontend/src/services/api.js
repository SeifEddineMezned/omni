import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid session
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Authentication
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    refreshToken: (token) => api.post('/auth/refresh', { token }),
  },

  // User
  user: {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
    deleteAccount: () => api.delete('/user/account'),
  },

  // Tasks
  tasks: {
    getAll: (params) => api.get('/tasks', { params }),
    getById: (id) => api.get(`/tasks/${id}`),
    create: (task) => api.post('/tasks', task),
    update: (id, task) => api.put(`/tasks/${id}`, task),
    delete: (id) => api.delete(`/tasks/${id}`),
    markComplete: (id) => api.patch(`/tasks/${id}/complete`),
  },

  // Habits
  habits: {
    getAll: () => api.get('/habits'),
    getById: (id) => api.get(`/habits/${id}`),
    create: (habit) => api.post('/habits', habit),
    update: (id, habit) => api.put(`/habits/${id}`, habit),
    delete: (id) => api.delete(`/habits/${id}`),
    logEntry: (id, entry) => api.post(`/habits/${id}/entries`, entry),
    getStreak: (id) => api.get(`/habits/${id}/streak`),
  },

  // Goals
  goals: {
    getAll: () => api.get('/goals'),
    getById: (id) => api.get(`/goals/${id}`),
    create: (goal) => api.post('/goals', goal),
    update: (id, goal) => api.put(`/goals/${id}`, goal),
    delete: (id) => api.delete(`/goals/${id}`),
    updateProgress: (id, progress) => api.patch(`/goals/${id}/progress`, { progress }),
  },

  // Finance
  finance: {
    getTransactions: (params) => api.get('/finance/transactions', { params }),
    addTransaction: (transaction) => api.post('/finance/transactions', transaction),
    updateTransaction: (id, transaction) => api.put(`/finance/transactions/${id}`, transaction),
    deleteTransaction: (id) => api.delete(`/finance/transactions/${id}`),
    getBudgets: () => api.get('/finance/budgets'),
    createBudget: (budget) => api.post('/finance/budgets', budget),
    getInsights: () => api.get('/finance/insights'),
  },

  // Health
  health: {
    getMetrics: () => api.get('/health/metrics'),
    addMetric: (metric) => api.post('/health/metrics', metric),
    getWorkouts: () => api.get('/health/workouts'),
    addWorkout: (workout) => api.post('/health/workouts', workout),
    getNutrition: () => api.get('/health/nutrition'),
    addNutritionEntry: (entry) => api.post('/health/nutrition', entry),
  },

  // Analytics
  analytics: {
    getDashboard: () => api.get('/analytics/dashboard'),
    getInsights: (type, period) => api.get(`/analytics/insights/${type}?period=${period}`),
    getReports: () => api.get('/analytics/reports'),
  },

  // Notifications
  notifications: {
    getAll: () => api.get('/notifications'),
    markRead: (id) => api.patch(`/notifications/${id}/read`),
    markAllRead: () => api.patch('/notifications/mark-all-read'),
    delete: (id) => api.delete(`/notifications/${id}`),
  },
};

// Utility functions
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || 'An error occurred';
    return { success: false, message, status: error.response.status };
  } else if (error.request) {
    // Network error
    return { success: false, message: 'Network error. Please check your connection.' };
  } else {
    // Other error
    return { success: false, message: error.message || 'An unexpected error occurred' };
  }
};

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
