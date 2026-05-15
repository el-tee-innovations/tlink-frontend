/**
 * Development Mode Utilities
 *
 * Provides mock authentication and token bypass for development/testing.
 * This is completely isolated and can be safely removed for production.
 *
 * Enable by setting: VITE_DEV_MODE=true in .env
 */

const DEV_MODE_ENABLED = import.meta.env.VITE_DEV_MODE === 'true';
const MOCK_TOKEN = 'dev-mock-token-' + Date.now();

/**
 * Mock user data for development
 * Switch between different roles by changing the VITE_DEV_USER_ROLE environment variable
 */
export const getMockUser = () => {
  const role = (import.meta.env.VITE_DEV_USER_ROLE || 'JOB_SEEKER') as 'JOB_SEEKER' | 'RECRUITER' | 'ADMIN';

  const mockUsers = {
    JOB_SEEKER: {
      id: 'dev-user-1',
      username: 'jobseeker.dev',
      email: 'jobseeker@dev.local',
      firstName: 'Dev',
      lastName: 'Seeker',
      role: 'JOB_SEEKER',
      createdAt: new Date().toISOString(),
    },
    RECRUITER: {
      id: 'dev-recruiter-1',
      username: 'recruiter.dev',
      email: 'recruiter@dev.local',
      firstName: 'Dev',
      lastName: 'Recruiter',
      role: 'RECRUITER',
      createdAt: new Date().toISOString(),
    },
    ADMIN: {
      id: 'dev-admin-1',
      username: 'admin.dev',
      email: 'admin@dev.local',
      firstName: 'Dev',
      lastName: 'Admin',
      role: 'ADMIN',
      createdAt: new Date().toISOString(),
    },
  };

  return mockUsers[role];
};

/**
 * Get mock token for development
 */
export const getMockToken = (): string => {
  return MOCK_TOKEN;
};

/**
 * Check if development mode is enabled
 */
export const isDevModeEnabled = (): boolean => {
  return DEV_MODE_ENABLED;
};

/**
 * Log dev mode status
 */
export const logDevModeStatus = (): void => {
  if (DEV_MODE_ENABLED) {
    const user = getMockUser();
    console.warn(
      `%c⚠️  DEVELOPMENT MODE ENABLED ⚠️`,
      'color: orange; font-weight: bold; font-size: 14px;'
    );
    console.warn(
      `%cJWT Authentication is BYPASSED. Current mock user role: ${user.role}`,
      'color: orange; font-weight: bold;'
    );
    console.warn(
      `%cTo disable: Set VITE_DEV_MODE=false in .env and restart dev server`,
      'color: orange;'
    );
  }
};

/**
 * Switch user role in dev mode (for testing)
 * @example
 * // In browser console:
 * import { switchDevModeRole } from '@/utils/devMode'
 * switchDevModeRole('RECRUITER') // Switch to recruiter
 */
export const switchDevModeRole = (role: 'JOB_SEEKER' | 'RECRUITER' | 'ADMIN'): void => {
  if (!DEV_MODE_ENABLED) {
    console.error('Dev mode is not enabled');
    return;
  }

  // Store in sessionStorage for quick testing
  sessionStorage.setItem('__DEV_OVERRIDE_ROLE', role);
  console.log(`User role switched to: ${role}. Reload page to apply.`);
};

/**
 * Get override role from sessionStorage (if set)
 */
export const getDevModeRoleOverride = (): string | null => {
  return sessionStorage.getItem('__DEV_OVERRIDE_ROLE');
};

/**
 * Clear dev mode role override
 */
export const clearDevModeRoleOverride = (): void => {
  sessionStorage.removeItem('__DEV_OVERRIDE_ROLE');
};

/**
 * Simulate API delay for more realistic testing
 * Useful for testing loading states
 */
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

