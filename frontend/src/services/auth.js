import { apiEndpoints, createApiCall } from './api';

// Authentication service class
class AuthService {
  constructor() {
    this.user = null;
    this.token = null;
    this.refreshTimer = null;
    this.init();
  }

  init() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        this.user = userData;
        this.token = userData.token;
        this.scheduleTokenRefresh();
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }
  }

  async login(credentials) {
    const apiCall = createApiCall(apiEndpoints.auth.login);
    const result = await apiCall(credentials);
    
    if (result.success) {
      const { user, token, refreshToken } = result.data;
      const userData = { ...user, token, refreshToken };
      
      this.user = userData;
      this.token = token;
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Schedule token refresh
      this.scheduleTokenRefresh();
      
      return { success: true, user: userData };
    }
    
    return result;
  }

  async register(userData) {
    const apiCall = createApiCall(apiEndpoints.auth.register);
    const result = await apiCall(userData);
    
    if (result.success) {
      // Auto-login after registration
      return this.login({
        email: userData.email,
        password: userData.password
      });
    }
    
    return result;
  }

  async logout() {
    if (this.token) {
      const apiCall = createApiCall(apiEndpoints.auth.logout);
      await apiCall(); // Don't wait for response
    }
    
    this.user = null;
    this.token = null;
    
    // Clear stored data
    localStorage.removeItem('user');
    
    // Clear refresh timer
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    
    return { success: true };
  }

  async refreshToken() {
    if (!this.user?.refreshToken) {
      return this.logout();
    }
    
    const apiCall = createApiCall(apiEndpoints.auth.refreshToken);
    const result = await apiCall(this.user.refreshToken);
    
    if (result.success) {
      const { token, refreshToken } = result.data;
      
      this.token = token;
      this.user = { ...this.user, token, refreshToken };
      
      localStorage.setItem('user', JSON.stringify(this.user));
      this.scheduleTokenRefresh();
      
      return { success: true };
    } else {
      // Refresh failed, logout user
      return this.logout();
    }
  }

  scheduleTokenRefresh() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    
    // Refresh token 5 minutes before expiry (default: 50 minutes)
    const refreshTime = (50 * 60 - 5 * 60) * 1000; // 45 minutes
    
    this.refreshTimer = setTimeout(() => {
      this.refreshToken();
    }, refreshTime);
  }

  getCurrentUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  hasRole(role) {
    return this.user?.roles?.includes(role) || false;
  }

  hasPermission(permission) {
    return this.user?.permissions?.includes(permission) || false;
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;

// Helper functions for components
export const useAuth = () => {
  return {
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    login: authService.login.bind(authService),
    register: authService.register.bind(authService),
    logout: authService.logout.bind(authService),
    hasRole: authService.hasRole.bind(authService),
    hasPermission: authService.hasPermission.bind(authService),
  };
};
