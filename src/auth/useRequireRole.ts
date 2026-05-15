import { useAuth } from './useAuth';
import type { UserRole } from '../types/roles';

/**
 * useRequireRole Hook
 *
 * Checks if the current user has one or more required roles.
 * Returns true only if user is authenticated and has at least one of the required roles.
 *
 * Usage:
 * const isRecruiter = useRequireRole(UserRole.RECRUITER);
 * const isAdmin = useRequireRole([UserRole.ADMIN]);
 * const isAdminOrRecruiter = useRequireRole([UserRole.ADMIN, UserRole.RECRUITER]);
 */
export const useRequireRole = (requiredRoles: UserRole | UserRole[]): boolean => {
  const { user, isAuthenticated } = useAuth();

  // Must be authenticated
  if (!isAuthenticated || !user) {
    return false;
  }

  // Convert single role to array for uniform handling
  const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  // User must have at least one of the required roles
  return rolesArray.includes(user.role);
};

