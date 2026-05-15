import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, User } from '../types/auth';
import { validateToken, logout as logoutApi } from '../api/authApi';
import { clearAllAuth, getToken, setToken, setUser } from '../api/httpClient';
import { isDevModeEnabled, getMockUser, getMockToken } from '../utils/devMode';

export interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
}

// Create context with undefined default - this ensures TypeScript catches missing provider
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Action types for reducer
type AuthAction =
  | { type: 'INIT_START' }
  | { type: 'INIT_SUCCESS'; payload: User }
  | { type: 'INIT_FAILURE'; payload: string }
  | { type: 'LOGIN'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start as true to block UI until initialization completes
  error: null,
  token: null,
};

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'INIT_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'INIT_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        token: getToken(),
      };

    case 'INIT_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
        token: null,
      };

    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'LOGOUT':
      clearAllAuth();
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 *
 * CRITICAL: This provider ensures authentication state is fully initialized
 * before rendering any protected components. All protected routes check
 * isLoading === false before rendering.
 *
 * Flow:
 * 1. App mounts, useEffect triggers
 * 2. initializeAuth() is called
 * 3. Tries to validate stored JWT token
 * 4. Sets isLoading to false once done (success or failure)
 * 5. Protected routes can now safely render based on isAuthenticated
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Initialize authentication from stored token
   * This runs ONCE on app mount to restore session from localStorage
   */
  const initializeAuth = useCallback(async () => {
    dispatch({ type: 'INIT_START' });

    try {
      // In dev mode, auto-login with mock user
      if (isDevModeEnabled()) {
        const mockUser = getMockUser();
        const mockToken = getMockToken();

        // Store mock credentials for consistency
        setToken(mockToken);
        setUser(mockUser);

        dispatch({
          type: 'INIT_SUCCESS',
          payload: mockUser as User,
        });
        return;
      }

      // Normal production flow
      // Check if token exists in localStorage
      const storedToken = getToken();

      if (!storedToken) {
        // No token stored - user is not authenticated
        dispatch({
          type: 'INIT_FAILURE',
          payload: 'No stored token',
        });
        return;
      }

      // Validate token with backend
      const validation = await validateToken();

      if (validation.valid && validation.user) {
        // Token is valid and user data retrieved
        dispatch({
          type: 'INIT_SUCCESS',
          payload: validation.user,
        });
      } else {
        // Token validation failed
        clearAllAuth();
        dispatch({
          type: 'INIT_FAILURE',
          payload: 'Token validation failed',
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // In dev mode, don't clear auth on error - just fail gracefully
      if (!isDevModeEnabled()) {
        clearAllAuth();
      }
      dispatch({
        type: 'INIT_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to initialize auth',
      });
    }
  }, []);

  /**
   * Login action - called after successful login API call
   */
  const login = useCallback((user: User, token: string) => {
    dispatch({
      type: 'LOGIN',
      payload: { user, token },
    });
  }, []);

  /**
   * Logout action - clears auth state and makes logout API call
   */
  const logout = useCallback(async () => {
    try {
      // Skip API call in dev mode
      if (!isDevModeEnabled()) {
        await logoutApi();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  const setError = useCallback((error: string | null) => {
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  /**
   * CRITICAL: Initialize auth on app mount
   * This must complete before any protected routes render
   */
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /**
   * Listen for token expiration events from httpClient interceptor
   * If token expires (401), clear auth state and let user know
   */
  useEffect(() => {
    const handleTokenExpired = () => {
      console.warn('Token expired');
      dispatch({ type: 'LOGOUT' });
      dispatch({
        type: 'SET_ERROR',
        payload: 'Session expired. Please login again.',
      });
    };

    window.addEventListener('auth:token-expired', handleTokenExpired);
    return () => {
      window.removeEventListener('auth:token-expired', handleTokenExpired);
    };
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    setError,
    clearError,
    initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

