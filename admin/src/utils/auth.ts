const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

export const authUtils = {
  // Token management
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // User management
  setUser: (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  // Clear all auth data
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
