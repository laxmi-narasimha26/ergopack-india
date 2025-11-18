import api from './api';
import { User, AuthResponse, LoginRequest } from '../types';
import { authUtils } from '../utils/auth';

export const authService = {
  // Login with email and password
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { token, user } = response.data;

      // Store token and user
      authUtils.setToken(token);
      authUtils.setUser(user);

      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Get current authenticated user
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/me');
      const user = response.data;
      authUtils.setUser(user);
      return user;
    } catch (error: any) {
      throw error.response?.data || { message: 'Failed to fetch user' };
    }
  },

  // Logout and clear local storage
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      authUtils.clear();
    }
  },

  // Verify if token is still valid
  verifyToken: async (): Promise<boolean> => {
    try {
      await api.get('/auth/verify');
      return true;
    } catch (error) {
      authUtils.clear();
      return false;
    }
  },
};
