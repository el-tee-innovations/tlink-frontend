import type React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { useRequireRole } from '../auth/useRequireRole';
import type { UserRole } from '../types/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute Component
 *
 * CRITICAL: This component implements the race condition prevention logic.
 *
 * Rendering hierarchy:
 * 1. If isLoading === true: render loading spinner (MUST BLOCK all other rendering)
 * 2. If not authenticated: redirect to /login
 * 3. If role required and not granted: redirect to /unauthorized
 * 4. Otherwise: render children
 *
 * This ensures:
 * - No components render before auth state is known
 * - No API requests made without valid JWT
 * - No role-based content renders for unauthorized users
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallback,
}) => {
  const { isLoading, isAuthenticated } = useAuth();
  const hasRequiredRole = requiredRole ? useRequireRole(requiredRole) : true;

  // CRITICAL: Block all rendering while initializing auth
  if (isLoading) {
    return fallback || <LoadingSpinner />;
  }

  // Step 1: Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Step 2: Check role authorization
  if (requiredRole && !hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Step 3: Render protected content
  return <>{children}</>;
};

/**
 * Default loading spinner component
 * Can be customized or replaced by passing fallback prop
 */
const LoadingSpinner: React.FC = () => (
  <div style={loadingStyles}>
    <div style={spinnerStyles}></div>
    <p>Loading...</p>
  </div>
);

const loadingStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
  backgroundColor: '#f5f5f5',
};

const spinnerStyles: React.CSSProperties = {
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  marginBottom: '16px',
};

// Add keyframes animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(styleSheet);
}

