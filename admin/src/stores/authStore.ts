import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService } from '../services/auth';
import { authUtils } from '../utils/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: authUtils.getUser(),
      token: authUtils.getToken(),
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ email, password });
          set({
            user: response.user,
            token: response.token,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const errorMessage = error?.message || 'Login failed';
          set({
            isLoading: false,
            error: errorMessage,
            user: null,
            token: null,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isLoading: false,
            error: null,
          });
        }
      },

      setUser: (user: User | null) => {
        set({ user });
        if (user) {
          authUtils.setUser(user);
        } else {
          authUtils.removeUser();
        }
      },

      setToken: (token: string | null) => {
        set({ token });
        if (token) {
          authUtils.setToken(token);
        } else {
          authUtils.removeToken();
        }
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      clearError: () => set({ error: null }),

      initializeAuth: async () => {
        const token = authUtils.getToken();
        if (token) {
          set({ isLoading: true });
          try {
            const isValid = await authService.verifyToken();
            if (isValid) {
              const user = await authService.getCurrentUser();
              set({
                user,
                token,
                isLoading: false,
              });
            } else {
              set({
                user: null,
                token: null,
                isLoading: false,
              });
            }
          } catch (error) {
            set({
              user: null,
              token: null,
              isLoading: false,
            });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
