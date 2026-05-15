import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { HttpClientError } from '../types/api';
import { isDevModeEnabled, getMockToken, logDevModeStatus } from '../utils/devMode';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Log dev mode status
logDevModeStatus();

// Create axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token storage utilities
export const TOKEN_STORAGE_KEY = 'tlink_auth_token';
export const USER_STORAGE_KEY = 'tlink_auth_user';

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const setUser = (user: unknown): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const userStr = localStorage.getItem(USER_STORAGE_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const clearUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const clearAllAuth = (): void => {
  clearToken();
  clearUser();
};

// Request interceptor - attach JWT token to all requests
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token: string | null = null;

    // In dev mode, use mock token; otherwise use actual token
    if (isDevModeEnabled()) {
      token = getMockToken();
    } else {
      token = getToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle auth errors
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // If 401 Unauthorized, clear auth and auth state will handle redirect
    // In dev mode, skip this handling as we're using mock tokens
    if (error.response?.status === 401 && !isDevModeEnabled()) {
      clearAllAuth();
      // Dispatch a custom event to notify auth context of token expiration
      window.dispatchEvent(new CustomEvent('auth:token-expired'));
    }

    // Transform error to consistent format
    const httpError = new HttpClientError(
      error.response?.status || 0,
      error.response?.statusText || 'Unknown Error',
      error.response?.data
    );

    return Promise.reject(httpError);
  }
);

export default httpClient;
