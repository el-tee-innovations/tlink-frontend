# TLink React Frontend - Project Structure

## Complete Directory Tree

```
tlink-ui/
├── .env.example                    # Environment variables template
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── tsconfig.app.json               # TypeScript config (app code)
├── tsconfig.json                   # TypeScript root config
├── tsconfig.node.json              # TypeScript config (build files)
├── vite.config.ts                  # Vite build configuration
│
├── docs/
│   ├── system-spec.md              # Complete system requirements and specifications
│   └── FEATURE_TEMPLATE.md         # Template for new feature requests
│
├── public/
│   ├── favicon.svg                 # Favicon
│   └── icons.svg                   # Icon sprite
│
└── src/
    ├── main.tsx                    # React entry point
    ├── App.tsx                     # Main app component with routing (211 lines)
    ├── App.css                     # App styles
    ├── index.css                   # Global styles
    │
    ├── api/
    │   ├── httpClient.ts           # Axios instance with JWT interceptor (85 lines)
    │   └── authApi.ts              # Authentication API service (92 lines)
    │
    ├── auth/
    │   ├── AuthContext.tsx         # Auth state management & initialization (245 lines)
    │   ├── useAuth.ts              # Hook for auth context (24 lines)
    │   └── useRequireRole.ts       # Hook for role checking (20 lines)
    │
    ├── components/
    │   └── ProtectedRoute.tsx      # Route guard with loading state (94 lines)
    │
    ├── pages/
    │   ├── Home.tsx                # Landing page (66 lines)
    │   ├── About.tsx               # About page (8 lines)
    │   ├── Contact.tsx             # Contact page (8 lines)
    │   ├── Login.tsx               # Login form (147 lines)
    │   ├── Register.tsx            # Registration form (170 lines)
    │   ├── Unauthorized.tsx        # 403 error page (7 lines)
    │   ├── NotFound.tsx            # 404 error page (7 lines)
    │   ├── Dashboard.tsx           # Job seeker dashboard (22 lines)
    │   ├── Profile.tsx             # User profile page (11 lines)
    │   ├── JobApplication.tsx      # Applications list page (24 lines)
    │   │
    │   ├── recruiter/
    │   │   ├── Dashboard.tsx       # Recruiter dashboard (30 lines)
    │   │   ├── PostJob.tsx         # Create job listing form (36 lines)
    │   │   ├── Jobs.tsx            # Manage job listings (16 lines)
    │   │   ├── Applications.tsx    # Manage applications (12 lines)
    │   │   └── Other.tsx           # Headhunt, Analytics, Company Profile (45 lines)
    │   │
    │   └── admin/
    │       ├── Dashboard.tsx       # Admin dashboard (30 lines)
    │       └── Other.tsx           # User/Company/Job/App/Analytics management (57 lines)
    │
    ├── types/
    │   ├── roles.ts                # UserRole type definition (12 lines)
    │   ├── auth.ts                 # Auth-related types (41 lines)
    │   └── api.ts                  # API response/error types (47 lines)
    │
    ├── utils/
    │   ├── logger.ts               # Logging utility (44 lines)
    │   └── errorHandler.ts         # Error handling utility (55 lines)
    │
    └── assets/
        ├── react.svg               # React logo
        ├── vite.svg                # Vite logo
        └── hero.png                # Hero image

├── dist/                           # Production build output (generated)
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].css
│   │   └── index-[hash].js
│   └── favicon.svg
│
├── README.md                       # Default Vite README
├── README_TLINK.md                 # TLink project README (150+ lines)
├── IMPLEMENTATION_GUIDE.md         # Detailed documentation (350+ lines)
└── IMPLEMENTATION_SUMMARY.md       # This implementation summary
```

## File Categories

### Core Application
- **App.tsx** - Main app component with BrowserRouter, AuthProvider, and all routes
- **main.tsx** - React DOM render entry point
- **index.html** - HTML template

### Authentication (3 files, ~290 lines)
- **AuthContext.tsx** - Global auth state with initialization logic
- **useAuth.ts** - Hook for accessing auth state
- **useRequireRole.ts** - Hook for checking user roles

### API Layer (2 files, ~180 lines)
- **httpClient.ts** - Axios instance with JWT interceptor
- **authApi.ts** - Auth API operations (login, register, logout, validate)

### Routing & Components (1 file, 94 lines)
- **ProtectedRoute.tsx** - Route guard with loading state

### Page Components (18 files, ~600 lines)
- **Public Pages**: Home, About, Contact, Login, Register
- **Error Pages**: Unauthorized (403), NotFound (404)
- **Job Seeker Pages**: Dashboard, Profile, JobApplication
- **Recruiter Pages**: Dashboard, PostJob, Jobs, Applications, Headhunt, Analytics, CompanyProfile
- **Admin Pages**: Dashboard, UserManagement, CompanyManagement, JobManagement, ApplicationManagement, Analytics

### Type Definitions (3 files, 100 lines)
- **roles.ts** - UserRole type (JOB_SEEKER | RECRUITER | ADMIN)
- **auth.ts** - User, AuthState, LoginRequest, AuthResponse, etc.
- **api.ts** - ApiResponse, ApiError, HttpClientError, etc.

### Utilities (2 files, 100 lines)
- **logger.ts** - Logging with levels (DEBUG, INFO, WARN, ERROR)
- **errorHandler.ts** - Error processing and user-friendly messages

### Configuration (7 files)
- **package.json** - Dependencies and npm scripts
- **tsconfig.json** - TypeScript configuration
- **tsconfig.app.json** - App-specific TypeScript config
- **tsconfig.node.json** - Build-time TypeScript config
- **vite.config.ts** - Vite build configuration
- **eslint.config.js** - ESLint rules
- **.env.example** - Environment variable template

### Documentation (4 files, 1000+ lines)
- **IMPLEMENTATION_GUIDE.md** - Detailed architecture (350+ lines)
- **README_TLINK.md** - Quick start guide (150+ lines)
- **IMPLEMENTATION_SUMMARY.md** - Summary (300+ lines)
- **docs/FEATURE_TEMPLATE.md** - Feature template (150+ lines)
- **docs/system-spec.md** - System spec (219 lines)

## Code Statistics

### By Category
| Category | Files | Lines |
|----------|-------|-------|
| Core App | 1 | 211 |
| Auth System | 3 | 289 |
| API Layer | 2 | 180 |
| Components | 1 | 94 |
| Pages | 18 | 600+ |
| Types | 3 | 100 |
| Utilities | 2 | 100 |
| **Total** | **30** | **~1600** |

### By Type
| Type | Count |
|------|-------|
| TypeScript Components (.tsx) | 21 |
| TypeScript Modules (.ts) | 9 |
| Configuration Files | 7 |
| Documentation Files | 5 |
| Public Assets | 3 |
| **Total** | **45** |

## Design Patterns Used

### 1. Context API for State Management
- `AuthContext` provides global auth state
- `useAuth` hook for component access
- Reducer pattern for state transitions

### 2. Composition & Hooks
- Functional components with React Hooks
- Custom hooks: `useAuth()`, `useRequireRole()`
- Compound components: `<ProtectedRoute>`

### 3. Route Guard Pattern
- `ProtectedRoute` wraps sensitive routes
- Multi-level guards: loading → auth → role
- Explicit error pages for failures

### 4. Interceptor Pattern
- Axios request interceptor adds JWT
- Response interceptor handles 401 errors
- Custom error class for typing

### 5. Utility Functions
- `logger` for consistent logging
- `errorHandler` for error processing
- Token management helpers

## Dependency Graph

```
App
├── BrowserRouter
├── AuthProvider
│   ├── AuthContext.Provider
│   ├── useReducer (authReducer)
│   └── useEffect (initializeAuth)
└── Routes
    ├── Route (public: Home, About, Contact, Login, Register)
    ├── Route (error: Unauthorized, NotFound)
    └── Route (protected)
        ├── ProtectedRoute
        │   ├── useAuth
        │   └── useRequireRole
        └── Page Component
            ├── useAuth (access user data)
            ├── httpClient (fetch data)
            └── Forms (login/register)

httpClient
├── axios.create()
├── Request Interceptor
│   └── getToken() + Authorization header
└── Response Interceptor
    ├── 401 check
    ├── clearAllAuth()
    └── dispatch('auth:token-expired')

authApi
├── login()
├── register()
├── validateToken()
├── logout()
├── getCurrentUser()
└── refreshToken()
```

## Import Structure

### Type Imports
```typescript
import type { User, AuthState } from '../types/auth';
import type { UserRole } from '../types/roles';
```

### API Imports
```typescript
import httpClient, { getToken, setToken } from '../api/httpClient';
import { login, logout } from '../api/authApi';
```

### Auth Imports
```typescript
import { AuthProvider } from '../auth/AuthContext';
import { useAuth } from '../auth/useAuth';
import { useRequireRole } from '../auth/useRequireRole';
```

### Component Imports
```typescript
import { ProtectedRoute } from '../components/ProtectedRoute';
```

### Utility Imports
```typescript
import { logger } from '../utils/logger';
import { getErrorMessage, handleApiError } from '../utils/errorHandler';
```

## Environment Variables

### .env.local (Development)
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### .env.production (Production)
```
VITE_API_BASE_URL=https://api.example.com/api
```

## Build Output Structure

```
dist/
├── index.html                  # Main HTML file
├── favicon.svg                 # Favicon
└── assets/
    ├── index-[hash].css       # Minified CSS
    ├── index-[hash].js        # Minified JS
    └── [assets]/              # Images, fonts, etc.

Size: ~300KB gzipped
Version: v0.0.0
Built with: Vite + React + TypeScript
```

## Scripts Available

```bash
npm run dev      # Start dev server (Vite HMR)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Key Metrics

| Metric | Value |
|--------|-------|
| TypeScript Files | 26 |
| React Components | 21 |
| Total Lines of Code | ~1,600 |
| Total Lines of Documentation | 1,000+ |
| Build Size (gzipped) | 93.83 KB |
| Build Time | ~400ms |
| Number of Routes | 26 |
| Role Types | 3 (JOB_SEEKER, RECRUITER, ADMIN) |
| API Services | 2 (httpClient, authApi) |
| Custom Hooks | 3 (useAuth, useRequireRole, + others) |
| Utility Functions | 10+ |

## File Organization Principles

1. **Co-location**: Related files stay together
2. **Feature-based**: Pages organized by role
3. **Clear separation**: API, auth, types, utils separate
4. **Scalability**: Easy to add new pages/routes
5. **Maintainability**: Clear naming and structure
6. **Type safety**: All types in dedicated files
7. **No deep nesting**: Max 3 levels deep

## Architecture Flow

```
User requests page
    ↓
Route matched in App.tsx
    ↓
ProtectedRoute checks auth
    ↓
  ├─ isLoading? → LoadingSpinner (BLOCKS UI)
  ├─ Not authenticated? → Redirect to /login
  ├─ Role missing? → Redirect to /unauthorized
  └─ OK? → Render page
    ↓
Page component uses useAuth() + httpClient
    ↓
API request made through httpClient interceptor
    ↓
  ├─ JWT token attached automatically
  └─ Response handles 401 errors
    ↓
Data displayed in component
```

---

This structure provides a solid foundation for the TLink job portal platform, with clear separation of concerns, type safety, and race condition prevention.

