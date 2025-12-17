import { apiEndpoints, createApiCall } from './api';

// Authentication service class
// Uses HttpOnly cookies - no localStorage tokens needed
class AuthService {
  constructor() {
    this.user = null;
    this.init();
  }

  async init() {
    // Try to get current user from backend (validates cookie)
    try {
      const apiCall = createApiCall(apiEndpoints.auth.getCurrentUser);
      const result = await apiCall();
      
      if (result.success && result.data?.user) {
        this.user = result.data.user;
        // Store minimal user info in localStorage for UI state
        localStorage.setItem('user', JSON.stringify({
          id: this.user.id,
          email: this.user.email,
          role: this.user.role,
        }));
      } else {
        // No valid session, clear localStorage
        localStorage.removeItem('user');
        this.user = null;
      }
    } catch (error) {
      // Network error or not authenticated - silently fail
      // This is expected if backend is not running or user is not logged in
      console.log('Auth init: No valid session found');
      localStorage.removeItem('user');
      this.user = null;
    }
  }

  async login(credentials) {
    const apiCall = createApiCall(apiEndpoints.auth.login);
    const result = await apiCall(credentials);
    
    if (result.success) {
      const { user } = result.data;
      
      this.user = user;
      
      // Store minimal user info in localStorage for UI state
      // JWT is stored in HttpOnly cookie automatically
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
      }));
      
      return { success: true, user };
    }
    
    return result;
  }

  async register(userData) {
    const apiCall = createApiCall(apiEndpoints.auth.register);
    const result = await apiCall(userData);
    
    if (result.success) {
      const { user } = result.data;
      
      this.user = user;
      
      // Store minimal user info in localStorage for UI state
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
      }));
      
      return { success: true, user };
    }
    
    return result;
  }

  async logout() {
    try {
      const apiCall = createApiCall(apiEndpoints.auth.logout);
      await apiCall(); // Clear cookie on backend
    } catch (error) {
      // Continue even if logout fails
      console.error('Logout error:', error);
    }
    
    this.user = null;
    localStorage.removeItem('user');
    
    return { success: true };
  }

  async getCurrentUser() {
    // If we have cached user, return it
    if (this.user) {
      return this.user;
    }
    
    // Otherwise, fetch from backend
    try {
      const apiCall = createApiCall(apiEndpoints.auth.getCurrentUser);
      const result = await apiCall();
      
      if (result.success && result.data?.user) {
        this.user = result.data.user;
        return this.user;
      }
    } catch (error) {
      // Not authenticated
      this.user = null;
    }
    
    return null;
  }

  isAuthenticated() {
    // Check if we have user data (cookie validation happens on backend)
    return !!this.user;
  }

  hasRole(role) {
    return this.user?.role === role;
  }
}

// Create singleton instance
const authService = new AuthService();

export default authService;

// Helper functions for components
export const useAuth = () => {
  return {
    user: authService.user,
    isAuthenticated: authService.isAuthenticated(),
    login: authService.login.bind(authService),
    register: authService.register.bind(authService),
    logout: authService.logout.bind(authService),
    hasRole: authService.hasRole.bind(authService),
    getCurrentUser: authService.getCurrentUser.bind(authService),
  };
};
