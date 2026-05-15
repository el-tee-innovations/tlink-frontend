import httpClient, { setToken, setUser } from './httpClient';
import type { AuthResponse, LoginRequest, RegisterRequest, User, ValidationResponse, LoginResponse } from '../types/auth';

/**
 * Login with username and password
 * Returns JWT token and user information
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await httpClient.post<LoginResponse>('/auth/login', credentials);
    const { accessToken, user } = response.data;

    // Store token and user info
    setToken(accessToken);
    setUser(user);

    return {
      token: accessToken,
      user,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Register a new user
 * Returns JWT token and user information
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await httpClient.post<LoginResponse>('/auth/register', data);
    const { accessToken, user } = response.data;

    // Store token and user info
    setToken(accessToken);
    setUser(user);

    return {
      token: accessToken,
      user,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Validate the current JWT token
 * Used during app initialization to restore session from localStorage
 */
export const validateToken = async (): Promise<ValidationResponse> => {
  try {
    const response = await httpClient.get<User>('/auth/validate');
    return {
      valid: true,
      user: response.data,
    };
  } catch {
    return {
      valid: false,
    };
  }
};

/**
 * Logout - clears token from backend and frontend
 */
export const logout = async (): Promise<void> => {
  try {
    await httpClient.post('/auth/logout');
  } catch (error) {
    // Logout should clear auth even if the request fails
    console.error('Logout request failed:', error);
  }
};

/**
 * Get current authenticated user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await httpClient.get<User>('/auth/me');
  return response.data;
};

/**
 * Refresh the JWT token
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const response = await httpClient.post<LoginResponse>('/auth/refresh');
    const { accessToken, user } = response.data;

    // Store new token
    setToken(accessToken);
    setUser(user);

    return {
      token: accessToken,
      user,
    };
  } catch (error) {
    throw error;
  }
};

