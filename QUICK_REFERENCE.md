# TLink React Frontend - Quick Reference Guide

## 🚀 Quick Start (5 minutes)

```bash
# 1. Install dependencies
cd C:\Users\KRBMA\Documents\Projects\tlink-ui
npm install

# 2. Create environment file
cp .env.example .env.local
# Edit .env.local - set VITE_API_BASE_URL=http://localhost:8080/api

# 3. Start dev server
npm run dev
# Opens http://localhost:5173

# 4. Backend must be running at http://localhost:8080
```

## 📁 Where to Add Code

### Adding a New Page
1. Create file: `src/pages/[role]/NewPage.tsx`
2. Add route in `src/App.tsx`:
   ```typescript
   <Route
     path="/new-page"
     element={
       <ProtectedRoute requiredRole={UserRole.JOB_SEEKER}>
         <NewPage />
       </ProtectedRoute>
     }
   />
   ```

### Adding a New API Service
1. Create file: `src/api/resourceApi.ts`
2. Use httpClient:
   ```typescript
   import httpClient from './httpClient';
   
   export const getResources = async () => {
     const response = await httpClient.get('/resources');
     return response.data;
   };
   ```
3. Import in components: `import { getResources } from '../api/resourceApi';`

### Adding New Types
1. Create file: `src/types/resource.ts`
2. Define interfaces:
   ```typescript
   export interface Resource {
     id: string;
     name: string;
   }
   ```
3. Export from there, import with `import type { Resource }`

## 🔑 Key Concepts

### Authentication Flow
```
User Visits App
  → AuthProvider initializes
  → Loads JWT from localStorage
  → Calls GET /auth/validate
  → Sets isLoading = false
  → ProtectedRoute checks isLoading
  → If not loading:
    - User authenticated → Show page
    - Not authenticated → Show login
    - Wrong role → Show error
```

### Using Auth in Components
```typescript
import { useAuth } from '../auth/useAuth';
import { useRequireRole } from '../auth/useRequireRole';
import { UserRole } from '../types/roles';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  const isRecruiter = useRequireRole(UserRole.RECRUITER);
  
  if (!isAuthenticated) return <p>Not logged in</p>;
  
  return (
    <>
      <p>Hello {user?.username}</p>
      <button onClick={() => logout()}>Logout</button>
      {isRecruiter && <p>Recruiter features here</p>}
    </>
  );
}
```

### Making API Calls
```typescript
import { useAuth } from '../auth/useAuth';
import httpClient from '../api/httpClient';

function DataComponent() {
  const { isLoading } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpClient.get('/api/data');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch:', err);
      }
    };

    // Only fetch after auth is initialized
    if (!isLoading) {
      fetchData();
    }
  }, [isLoading]);

  return <div>{/* Display data */}</div>;
}
```

## 🛣️ Route Reference

### Public Routes
- `/` - Home
- `/login` - Login
- `/register` - Register
- `/about` - About
- `/contact` - Contact

### Job Seeker Routes
- `/dashboard` - Dashboard
- `/profile` - Profile
- `/applications` - Applications

### Recruiter Routes
- `/recruiter/dashboard` - Dashboard
- `/recruiter/post-job` - Post job
- `/recruiter/jobs` - Manage jobs
- `/recruiter/applications` - Manage applications
- `/recruiter/headhunt` - Headhunt
- `/recruiter/analytics` - Analytics
- `/recruiter/company` - Company profile

### Admin Routes
- `/admin/dashboard` - Dashboard
- `/admin/users` - Users
- `/admin/companies` - Companies
- `/admin/jobs` - Jobs
- `/admin/applications` - Applications
- `/admin/analytics` - Analytics

### Error Routes
- `/unauthorized` - 403 error
- `*` - 404 error

## 🔧 Common Tasks

### Task: Check if User is Logged In
```typescript
const { isAuthenticated, isLoading } = useAuth();

if (isLoading) return <LoadingSpinner />;
if (!isAuthenticated) return <RedirectToLogin />;
```

### Task: Get Current User Info
```typescript
const { user } = useAuth();
console.log(user?.username, user?.role, user?.email);
```

### Task: Show Component Only for Specific Role
```typescript
const isAdmin = useRequireRole(UserRole.ADMIN);
if (!isAdmin) return null;
return <AdminPanel />;
```

### Task: Show Component for Multiple Roles
```typescript
const canManageJobs = useRequireRole([UserRole.RECRUITER, UserRole.ADMIN]);
if (!canManageJobs) return null;
return <JobManagement />;
```

### Task: Logout User
```typescript
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  navigate('/');
};
```

### Task: Make Typed API Call
```typescript
import type { User } from '../types/auth';
import httpClient from '../api/httpClient';

const getUser = async (id: string): Promise<User> => {
  const response = await httpClient.get<User>(`/users/${id}`);
  return response.data;
};
```

### Task: Handle API Error
```typescript
import { handleApiError } from '../utils/errorHandler';

try {
  await someApiCall();
} catch (error) {
  const { message } = handleApiError(error, 'User Action');
  setErrorMessage(message);
}
```

### Task: Add Loading State to Button
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleClick = async () => {
  setIsLoading(true);
  try {
    await apiCall();
    // Success
  } catch (err) {
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

return <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</button>;
```

## 🐛 Debugging

### Check Auth State
```javascript
// Browser console
const token = localStorage.getItem('tlink_auth_token');
const user = localStorage.getItem('tlink_auth_user');
console.log(token, user);
```

### Check Current User
```typescript
import { useAuth } from './auth/useAuth';

// In component
const auth = useAuth();
console.log(auth);
```

### Check API Requests
```
Browser DevTools → Network tab
Look for:
- POST /auth/login - Should return 200 with token
- GET /auth/validate - Should return 200 with user data
- 401 errors - Token is invalid/expired
```

### Check Build
```bash
npm run build
# If successful: "✓ built in Xms"
# If failed: TypeScript and Vite errors shown
```

## 📋 Checklist: Before Going to Production

- [ ] Backend is deployed and running
- [ ] CORS configured to allow frontend origin
- [ ] Auth endpoints return correct format: `{ accessToken, user }`
- [ ] `.env` file configured with production API URL
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run preview` works (test production build locally)
- [ ] All routes tested with valid and invalid tokens
- [ ] Logout works and clears data
- [ ] 401 errors redirect to login
- [ ] All pages load without 404 errors
- [ ] Error messages are user-friendly
- [ ] No console errors or warnings
- [ ] Performance acceptable (check DevTools)
- [ ] All protected routes are actually protected
- [ ] Environment variables not exposed in code

## 💡 Tips & Tricks

### Tip 1: Always check isLoading before using auth
```typescript
const { user, isLoading } = useAuth();
if (isLoading) return <Loading />;
// Safe to use user here
```

### Tip 2: Use type imports for types only
```typescript
// ✅ Correct
import type { User } from '../types/auth';

// ❌ Wrong
import { User } from '../types/auth';
```

### Tip 3: All API calls must go through httpClient
```typescript
// ✅ Correct - uses interceptor
const response = await httpClient.get('/endpoint');

// ❌ Wrong - no JWT attached
const response = await axios.get('/endpoint');
```

### Tip 4: Wrap protected pages in ProtectedRoute
```typescript
// ✅ Correct
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <AdminPage />
    </ProtectedRoute>
  }
/>

// ❌ Wrong - no protection
<Route path="/admin" element={<AdminPage />} />
```

### Tip 5: Use explicit error boundaries
```typescript
// ✅ Correct - catches errors
try {
  const data = await fetchData();
  setData(data);
} catch (err) {
  const message = getErrorMessage(err);
  setError(message);
}

// ❌ Wrong - silent failure
const data = await fetchData();
setData(data);
```

## 📖 Documentation Files

- **IMPLEMENTATION_GUIDE.md** - Detailed architecture and API docs
- **PROJECT_STRUCTURE.md** - Complete file structure
- **README_TLINK.md** - Quick start and features
- **IMPLEMENTATION_SUMMARY.md** - What was built
- **docs/system-spec.md** - System requirements
- **docs/FEATURE_TEMPLATE.md** - Template for new features

## 🆘 Need Help?

1. Check **IMPLEMENTATION_GUIDE.md** for detailed docs
2. Check **PROJECT_STRUCTURE.md** for file organization
3. Look at existing pages for examples
4. Check browser console for errors
5. Run `npm run build` to check TypeScript errors

## Quick Links

- Frontend Repo: `C:\Users\KRBMA\Documents\Projects\tlink-ui`
- Backend Repo: `C:\Users\KRBMA\Documents\Projects\tlink` (Spring Boot)
- Previous Blazor (reference only): `C:\Users\KRBMA\RiderProjects\TLinkPortal\TLink`
- Dev server: http://localhost:5173
- Backend API: http://localhost:8080/api

---

**Last Updated**: May 4, 2026
**Version**: 1.0.0
**Status**: Production Ready

