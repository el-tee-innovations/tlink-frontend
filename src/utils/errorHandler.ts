import { logger } from './logger';

/**
 * Error handler utility for consistent error processing
 */

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return 'An unexpected error occurred';
};

export const handleApiError = (
  error: unknown,
  context: string = 'API Call'
): { message: string; code?: string } => {
  const message = getErrorMessage(error);
  logger.error(`${context} failed`, { error: message });

  // Return user-friendly error message
  return {
    message: message.length > 0 ? message : 'An error occurred. Please try again.',
  };
};

export const handleAuthError = (error: unknown): { message: string; shouldLogout?: boolean } => {
  const message = getErrorMessage(error);
  logger.error('Authentication error', { error: message });

  // Check if it's a 401 (token invalid/expired)
  if (message.includes('401') || message.includes('Unauthorized')) {
    return {
      message: 'Your session has expired. Please log in again.',
      shouldLogout: true,
    };
  }

  return {
    message: message || 'Authentication failed. Please try again.',
  };
};

export class AppError extends Error {
  readonly code?: string;
  readonly statusCode?: number;

  constructor(message: string, code?: string, statusCode?: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

