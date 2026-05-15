/**
 * Logger utility for consistent logging across the application
 * In production, these can be configured to send to a logging service
 */

const LogLevel = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
} as const;

type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

const isDevelopment = import.meta.env.DEV;

const formatMessage = (level: LogLevel, message: string, data?: unknown): string => {
  const timestamp = new Date().toISOString();
  if (data) {
    return `[${timestamp}] ${level}: ${message} → ${JSON.stringify(data)}`;
  }
  return `[${timestamp}] ${level}: ${message}`;
};

export const logger = {
  debug: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.debug(formatMessage(LogLevel.DEBUG, message, data));
    }
  },

  info: (message: string, data?: unknown) => {
    console.info(formatMessage(LogLevel.INFO, message, data));
  },

  warn: (message: string, data?: unknown) => {
    console.warn(formatMessage(LogLevel.WARN, message, data));
  },

  error: (message: string, data?: unknown) => {
    console.error(formatMessage(LogLevel.ERROR, message, data));
  },
};

