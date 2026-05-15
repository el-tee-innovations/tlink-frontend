import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from './AuthContext';

/**
 * useAuth Hook
 *
 * Provides access to authentication state and actions throughout the app.
 * Must be used within AuthProvider.
 *
 * RULE: Never use without AuthProvider - TypeScript will catch missing provider
 *
 * Usage:
 * const { user, isAuthenticated, isLoading, login, logout } = useAuth();
 *
 * IMPORTANT: Always check isLoading in protected components before rendering sensitive UI
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider. Wrap your app with <AuthProvider>.'
    );
  }

  return context;
};

