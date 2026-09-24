import type { UserRole } from './roles';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn?: number;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
  tokenType?: string;
}

export interface ValidationResponse {
  valid: boolean;
  user?: User;
}

