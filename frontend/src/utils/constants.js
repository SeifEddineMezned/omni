// App Configuration Constants
export const APP_NAME = 'Life Management Hub';
export const APP_VERSION = '1.0.0';
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Route Constants
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',
  HABITS: '/habits',
  FINANCE: '/finance',
  HEALTH: '/health',
  GOALS: '/goals',
  RELATIONSHIPS: '/relationships',
  HOME_LIFESTYLE: '/home',
  KNOWLEDGE: '/knowledge',
  ANALYTICS: '/analytics',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
};

// Navigation Menu Items
export const MENU_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'Dashboard',
    description: 'Overview of your life management'
  },
  {
    id: 'tasks',
    label: 'Tasks',
    path: ROUTES.TASKS,
    icon: 'Assignment',
    description: 'Manage your tasks and projects'
  },
  {
    id: 'habits',
    label: 'Habits',
    path: ROUTES.HABITS,
    icon: 'FitnessCenter',
    description: 'Track daily habits and routines'
  },
  {
    id: 'goals',
    label: 'Goals',
    path: ROUTES.GOALS,
    icon: 'EmojiEvents',
    description: 'Set and track your goals'
  },
  {
    id: 'finance',
    label: 'Finance',
    path: ROUTES.FINANCE,
    icon: 'AttachMoney',
    description: 'Manage budget and expenses'
  },
  {
    id: 'health',
    label: 'Health',
    path: ROUTES.HEALTH,
    icon: 'LocalHospital',
    description: 'Track health metrics and workouts'
  },
  {
    id: 'relationships',
    label: 'Relationships',
    path: ROUTES.RELATIONSHIPS,
    icon: 'People',
    description: 'Manage personal connections'
  },
  {
    id: 'home',
    label: 'Home & Lifestyle',
    path: ROUTES.HOME_LIFESTYLE,
    icon: 'Home',
    description: 'Home management and lifestyle'
  },
  {
    id: 'knowledge',
    label: 'Knowledge Base',
    path: ROUTES.KNOWLEDGE,
    icon: 'MenuBook',
    description: 'Store and organize information'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: 'BarChart',
    description: 'Insights and analytics'
  },
  {
    id: 'notifications',
    label: 'Smart Insights',
    path: ROUTES.NOTIFICATIONS,
    icon: 'NotificationsActive',
    description: 'AI-powered notifications and insights',
    isNew: true
  }
];

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

// Status Types
export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PAUSED: 'paused'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INSIGHT: 'insight',
  ACHIEVEMENT: 'achievement',
  SUGGESTION: 'suggestion',
  PROGRESS: 'progress'
};

// Theme Settings
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'life_management_user',
  THEME_MODE: 'life_management_themeMode',
  TASKS: 'life_management_tasks',
  HABITS: 'life_management_habits',
  GOALS: 'life_management_goals',
  FINANCE: 'life_management_finance',
  HEALTH: 'life_management_health',
  SYNC_STATUS: 'life_management_sync_status',
  APP_VERSION: 'life_management_app_version'
};

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd',
  MEDIUM: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  WITH_TIME: 'MMM dd, yyyy at h:mm a',
  TIME_ONLY: 'h:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
  IDLE: 'idle'
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#4caf50',
  WARNING: '#ff9800',
  ERROR: '#f44336',
  INFO: '#2196f3',
  NEUTRAL: '#9e9e9e'
};

// File Upload Settings
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/csv'],
  MAX_FILES: 10
};

// Pagination Settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100]
};

// Feature Flags
export const FEATURES = {
  SMART_NOTIFICATIONS: true,
  DARK_MODE: true,
  OFFLINE_MODE: true,
  ANALYTICS: true,
  EXPORT_DATA: true,
  VOICE_COMMANDS: false, // Coming soon
  AI_SUGGESTIONS: true,
  SOCIAL_FEATURES: false // Coming soon
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  TASK_TITLE_MAX_LENGTH: 100,
  GOAL_TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[(]?[\d\s\-\(\)\+]{10,}$/
};
