# TLink React Frontend Implementation

## Overview

This is a React + TypeScript frontend for the TLink job portal platform. The implementation prioritizes secure authentication with JWT tokens and prevents race conditions that were present in the previous Blazor implementation.

## Key Architecture Decisions

### Authentication Flow (Race Condition Prevention)

The authentication system is designed to prevent the race conditions that plagued the Blazor implementation:

**Critical Rules:**
1. **Initialization Blocking**: Authentication state is initialized on app mount BEFORE any protected components render
2. **Loading State Guard**: All protected routes check `isLoading === false` before rendering
3. **Centralized JWT Attachment**: All HTTP requests go through a single Axios interceptor that attaches JWT tokens
4. **Token Validation**: Stored tokens are validated with the backend on app boot
5. **Explicit State Control**: No implicit lifecycle-based logic; auth state machine is explicit

**Flow:**
```
App Mount
  ↓
AuthProvider initializes
  ↓
  → Checks localStorage for token
  → Calls /auth/validate with token
  → Updates auth state
  → Sets isLoading = false
  ↓
ProtectedRoute checks isLoading
  ↓
  → If isLoading === true: render loading spinner (BLOCKS all UI)
  → If not authenticated: redirect to /login
  → If role missing: redirect to /unauthorized
  → Otherwise: render protected component
  ↓
Component can safely use useAuth() and make API calls
  → All requests automatically have JWT attached
  → Failed 401 responses clear auth and redirect to login
```

## Project Structure

```
src/
├── api/
│   ├── authApi.ts              # Auth operations (login, register, logout, validate)
│   └── httpClient.ts           # Axios instance with JWT interceptor
├── auth/
│   ├── AuthContext.tsx         # Auth state management & initialization
│   ├── useAuth.ts              # Hook to access auth state
│   └── useRequireRole.ts       # Hook to check user roles
├── components/
│   └── ProtectedRoute.tsx       # Route guard with loading state
├── pages/
│   ├── Home.tsx                # Landing page
│   ├── About.tsx               # About page
│   ├── Contact.tsx             # Contact page
│   ├── Login.tsx               # Login form
│   ├── Register.tsx            # Registration form
│   ├── Unauthorized.tsx        # 403 error page
│   ├── NotFound.tsx            # 404 error page
│   ├── Dashboard.tsx           # Job seeker dashboard
│   ├── Profile.tsx             # User profile (job seeker)
│   ├── JobApplication.tsx      # Job applications list
│   ├── recruiter/
│   │   ├── Dashboard.tsx       # Recruiter dashboard
│   │   ├── PostJob.tsx         # Create job listing
│   │   ├── Jobs.tsx            # Manage job listings
│   │   ├── Applications.tsx    # Manage applications
│   │   └── Other.tsx           # Headhunt, Analytics, Company Profile
│   └── admin/
│       ├── Dashboard.tsx       # Admin dashboard
│       └── Other.tsx           # User, Company, Job, Application management
├── types/
│   ├── roles.ts                # UserRole type definition
│   ├── auth.ts                 # Auth-related types
│   └── api.ts                  # API response/error types
├── App.tsx                     # Main app with routing
└── main.tsx                    # React entry point
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### 1. Install Dependencies
```bash
cd C:\Users\KRBMA\Documents\Projects\tlink-ui
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set the API base URL:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

For development, the default is `http://localhost:8080/api`.

### 3. Run Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173`

## API Integration

### HTTP Client (`src/api/httpClient.ts`)

All API requests use a centralized Axios instance with automatic JWT handling:

```typescript
import httpClient from './api/httpClient';

// Automatically includes Authorization: Bearer <token> header
const response = await httpClient.get('/users/me');
```

**Features:**
- Automatically attaches JWT token from localStorage to every request
- Handles 401 errors by clearing auth state
- Dispatches `auth:token-expired` event on 401 for global auth state updates
- Consistent error handling with HttpClientError class

### Auth API (`src/api/authApi.ts`)

Authentication operations:

```typescript
import { login, register, logout, validateToken } from './api/authApi';

// Login
const response = await login({ username: 'user', password: 'pass' });
// Returns: { token: string, user: User }

// Register
const response = await register({
  username: 'newuser',
  email: 'user@example.com',
  password: 'pass',
  role: UserRole.JOB_SEEKER
});

// Logout
await logout();

// Validate token (used on app boot)
const { valid, user } = await validateToken();
```

## Authentication Usage

### In Components

```typescript
import { useAuth } from './auth/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome {user?.username}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

### Role-Based Rendering

```typescript
import { useRequireRole } from './auth/useRequireRole';
import { UserRole } from './types/roles';

function RecruiterFeature() {
  const isRecruiter = useRequireRole(UserRole.RECRUITER);
  
  if (!isRecruiter) return null; // Don't render for non-recruiters
  
  return <div>Recruiter only feature</div>;
}
```

### Protected Routes

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserRole } from './types/roles';

function App() {
  return (
    <Routes>
      {/* Admin only route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole={UserRole.ADMIN}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Multiple roles allowed */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole={[UserRole.JOB_SEEKER, UserRole.RECRUITER]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

## User Roles

Three roles are supported:

1. **JOB_SEEKER**: Can search and apply for jobs, manage profile, track applications
2. **RECRUITER**: Can post jobs, manage applications, view candidate profiles, access analytics
3. **ADMIN**: Can manage all users, jobs, applications, and view platform-wide analytics

## Pages Overview

### Public Pages (No Authentication Required)
- `/` - Home page with links for authenticated/unauthenticated users
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login form (redirects to home if already authenticated)
- `/register` - Registration form with role selection

### Job Seeker Routes (Protected: JOB_SEEKER role)
- `/dashboard` - Job seeker dashboard
- `/profile` - User profile management
- `/applications` - View and track job applications

### Recruiter Routes (Protected: RECRUITER role)
- `/recruiter/dashboard` - Recruiter dashboard with quick links
- `/recruiter/post-job` - Create new job listing
- `/recruiter/jobs` - Manage existing job listings
- `/recruiter/applications` - Manage applications for current company
- `/recruiter/headhunt` - Headhunt candidates
- `/recruiter/analytics` - View job posting analytics
- `/recruiter/company` - Company profile management

### Admin Routes (Protected: ADMIN role)
- `/admin/dashboard` - Admin dashboard with platform overview
- `/admin/users` - User account management
- `/admin/companies` - Company profile management
- `/admin/jobs` - Manage all job listings
- `/admin/applications` - Manage all applications
- `/admin/analytics` - Platform-wide analytics

### Error Routes
- `/unauthorized` - 403 Forbidden (user lacks required role)
- `*` - 404 Not Found

## Building

```bash
# Development build (with watch mode)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## Type Safety

The project uses TypeScript with strict mode enabled. Key types:

```typescript
// User role enum
type UserRole = 'JOB_SEEKER' | 'RECRUITER' | 'ADMIN';

// User profile
interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

// Auth state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

// API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## Error Handling

The application handles errors at multiple levels:

1. **HTTP Client**: Interceptor catches 401 errors and clears auth
2. **API Calls**: Functions catch and re-throw errors
3. **Components**: Try-catch blocks display user-friendly messages
4. **Routes**: ProtectedRoute redirects on auth failures

Example:
```typescript
try {
  const result = await login(credentials);
  // Success
} catch (err) {
  const message = err instanceof Error ? err.message : 'Login failed';
  // Display error to user
}
```

## Token Persistence

JWT tokens are stored in `localStorage`:
- Key: `tlink_auth_token` - The JWT token
- Key: `tlink_auth_user` - User profile JSON

On app boot:
1. AuthProvider checks localStorage for stored token
2. Calls `GET /auth/validate` to verify token with backend
3. If valid: restores session, sets `isLoading = false`
4. If invalid: clears localStorage, sets `isLoading = false`

**Important**: Always validate tokens with backend on app boot. Never trust localStorage alone.

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` |

Create `.env.local` for development overrides (not committed to git).

## Comparison with Blazor Implementation

✅ **What's Different (Improved):**
- **Race Condition Prevention**: Auth initialization blocks UI rendering
- **Centralized JWT Management**: Single Axios interceptor for all requests
- **Explicit Loading States**: `isLoading` flag prevents premature rendering
- **No Implicit Lifecycle Logic**: React hooks replace C# lifecycle
- **Type Safety**: Full TypeScript with strict mode
- **Simple State Management**: Context API instead of Blazor state

⚠️ **Things to Implement Next:**
- Real API endpoints (currently using mock responses)
- Form validation and submission
- Data tables with pagination, sorting, filtering
- File upload for CVs and videos
- Real-time notifications
- Search and filtering for jobs
- Assessment functionality
- Interview scheduling

## Common Issues & Solutions

### "useAuth must be used within AuthProvider"
**Error**: You're using `useAuth()` in a component not wrapped by `<AuthProvider>`

**Solution**: Ensure `App.tsx` has `<AuthProvider>` wrapping all routes:
```typescript
<BrowserRouter>
  <AuthProvider>
    <Routes>...</Routes>
  </AuthProvider>
</BrowserRouter>
```

### Blank page on load
**Likely Cause**: Auth context is still initializing (`isLoading = true`)

**Check**: Open browser DevTools → Network tab. Should see a call to `GET /auth/validate`. If there's an error, the token validation failed.

### "Cannot GET /api/auth/..." in console
**Cause**: Backend API URL is incorrect in `.env.local`

**Solution**: Verify `VITE_API_BASE_URL` points to running backend. Default assumes backend at `http://localhost:8080`

### CORS errors
**Cause**: Backend CORS policy doesn't allow frontend origin

**Solution**: Configure backend CORS to allow `http://localhost:5173` in development and your production domain in production.

## Next Steps

1. **Connect to Real Backend**: Update API endpoints in `src/api/authApi.ts` and create additional API service files
2. **Add Form Validation**: Use a library like `react-hook-form` or `zod` for robust form validation
3. **Implement Data Pages**: Populate recruiter and admin pages with real data and management features
4. **Add Styling**: Replace inline styles with CSS modules or Tailwind CSS
5. **Error Boundaries**: Add React Error Boundary for crash handling
6. **Tests**: Add unit and integration tests with Jest/Vitest
7. **Analytics**: Add event tracking for user actions

## Support & Debugging

To debug authentication:
```typescript
// In browser console
console.log(localStorage.getItem('tlink_auth_token'));
console.log(localStorage.getItem('tlink_auth_user'));
```

Check auth context state:
```typescript
const { user, isAuthenticated, isLoading, error } = useAuth();
console.log({ user, isAuthenticated, isLoading, error });
```

