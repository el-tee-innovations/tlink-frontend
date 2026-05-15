export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export class HttpClientError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly data?: unknown;

  constructor(status: number, statusText: string, data?: unknown) {
    super(`HTTP ${status}: ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.name = 'HttpClientError';
  }
}

