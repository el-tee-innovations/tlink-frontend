# Development Mode Guide - JWT Authentication Bypass

This guide explains how to temporarily disable JWT authentication for development and testing purposes.

---

## ⚡ Quick Start

### 1. Create or Update `.env` file

Copy the contents of `.env.example`, and enable dev mode:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# ⚠️ DEVELOPMENT MODE - DISABLES JWT AUTHENTICATION
# Set to 'true' to enable, 'false' to disable
VITE_DEV_MODE=true

# Optional: Set the default user role for development
# Values: JOB_SEEKER, RECRUITER, ADMIN
# Default: JOB_SEEKER
VITE_DEV_USER_ROLE=JOB_SEEKER
```

### 2. Restart Development Server

After updating `.env`, restart your dev server:

```bash
npm run dev
```

### 3. You're Done!

The app will now:
- Automatically log you in as a mock user
- Use a mock JWT token for all API calls
- Skip actual token validation

---

## 📋 Environment Variables

### `VITE_DEV_MODE`
- **Type:** `boolean` (string: 'true' or 'false')
- **Default:** `'false'`
- **Description:** Enable/disable development mode
- **Effect:** 
  - When `true`: Bypasses JWT validation, auto-logs in mock user
  - When `false`: Normal production behavior (requires valid JWT)

### `VITE_DEV_USER_ROLE`
- **Type:** `enum`
- **Values:** `'JOB_SEEKER'` | `'RECRUITER'` | `'ADMIN'`
- **Default:** `'JOB_SEEKER'`
- **Description:** Default user role for development
- **Usage:** Test role-based features without logging in/out

---

## 🔄 Switching User Roles at Runtime

Dev mode supports quick role switching without restarting the server:

### In Browser Console:

```javascript
// Import the utility
import { switchDevModeRole } from '@/utils/devMode'

// Switch to different roles
switchDevModeRole('RECRUITER')  // Switch to recruiter
switchDevModeRole('ADMIN')       // Switch to admin
switchDevModeRole('JOB_SEEKER')  // Switch to job seeker

// Page reloads with new role automatically
```

### Or Directly in Code:

```typescript
// In any component
import { switchDevModeRole } from '@/utils/devMode'

const handleSwitchRole = (role: 'JOB_SEEKER' | 'RECRUITER' | 'ADMIN') => {
  switchDevModeRole(role)
}
```

---

## 🧪 Testing Different Scenarios

### Test Job Seeker Features

```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=JOB_SEEKER
```

Then navigate to:
- `/dashboard` - Job seeker dashboard
- `/job-search` - Search jobs
- `/assessments` - Take assessments
- `/profile` - Edit profile and upload video
- `/applications` - View applications

### Test Recruiter Features

```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=RECRUITER
```

Then navigate to:
- `/recruiter/dashboard` - Recruiter dashboard
- `/recruiter/post-job` - Post new jobs
- `/recruiter/manage-jobs` - Manage posted jobs
- `/recruiter/applications` - View applications
- `/recruiter/analytics` - View analytics

### Test Admin Features

```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=ADMIN
```

Then navigate to:
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - Manage users
- `/admin/companies` - Manage companies
- `/admin/jobs` - Manage jobs
- `/admin/applications` - Manage applications

---

## 🔐 Security Notes

⚠️ **IMPORTANT - NEVER USE IN PRODUCTION**

1. **Dev mode is disabled by default** - You must explicitly enable it
2. **Only affects development** - Build-time variables are stripped
3. **Clear warning in console** - Orange warning message when enabled
4. **Easy to disable** - Just set `VITE_DEV_MODE=false`

### Before Deploying:

```bash
# Verify dev mode is disabled
cat .env | grep VITE_DEV_MODE  # Should be 'false' or commented out

# Build for production
npm run build

# Verify no dev code in build
grep -r "VITE_DEV_MODE" dist/  # Should return nothing
```

---

## 🛠️ Technical Details

### How It Works

1. **Dev Mode Detection**: `isDevModeEnabled()` checks `import.meta.env.VITE_DEV_MODE`
2. **Mock User**: `getMockUser()` returns a mock user object with selected role
3. **Mock Token**: `getMockToken()` generates a consistent mock JWT token
4. **Request Interceptor**: Uses mock token instead of real JWT
5. **Auth Context**: Auto-logs in on app mount
6. **Response Handling**: Ignores 401 errors (since we're using mock token)

### Mock User Structure

```typescript
{
  id: 'dev-user-1',
  username: 'jobseeker.dev',
  email: 'jobseeker@dev.local',
  firstName: 'Dev',
  lastName: 'Seeker',
  role: 'JOB_SEEKER',
  createdAt: '2026-05-12T...'
}
```

### Files Modified

- `src/api/httpClient.ts` - Conditional token injection
- `src/auth/AuthContext.tsx` - Auto-login in dev mode
- `src/utils/devMode.ts` - Dev mode utilities (NEW)

---

## 📝 Workflow Examples

### Example 1: Test Job Search Feature

```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=JOB_SEEKER
```

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:5173/job-search`
3. You're automatically logged in as a job seeker
4. Test search filters without needing to authenticate

### Example 2: Test Role-Based Access

```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=JOB_SEEKER
```

1. Open browser console
2. Run: `switchDevModeRole('RECRUITER')`
3. Navigate to `/recruiter/dashboard`
4. Quickly test all recruiter features

### Example 3: Backend Integration Testing

```env
VITE_DEV_MODE=true
VITE_API_BASE_URL=http://localhost:3001/api
```

- Frontend uses mock JWT token
- API requests go to your backend
- Backend can return mock data or test data
- No need to build user authentication in backend first

---

## 🐛 Troubleshooting

### Dev Mode Not Working?

1. **Check environment variable is set:**
   ```bash
   echo $VITE_DEV_MODE
   # Should output: true
   ```

2. **Look for warning in console:**
   - If you see orange "⚠️ DEVELOPMENT MODE ENABLED" warning, it's working
   - If no warning, dev mode might be disabled

3. **Check .env file:**
   - Ensure file is named exactly `.env` (not `.env.local` or `.env.dev`)
   - Ensure `VITE_DEV_MODE=true` (no spaces)

4. **Restart dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

### Still Getting 401 Errors?

If API returns 401 errors in dev mode:

1. Backend still validates JWT tokens
2. Use the mock token from console: `getMockToken()`
3. Ask backend team to accept mock token in dev environment
4. Or mock API responses in dev (see next section)

---

## 🔌 Mocking API Responses (Advanced)

For complete isolation, you can mock API responses:

```typescript
// src/utils/devMode.ts - Add this function

export const setupApiMocks = () => {
  if (!isDevModeEnabled()) return;

  // Example: Mock job search
  const originalGet = httpClient.get;
  httpClient.get = async (url, config) => {
    if (url.includes('/jobs/search')) {
      return Promise.resolve({
        data: {
          jobs: [
            // ... mock job data
          ],
          totalElements: 10,
          totalPages: 1,
        },
      });
    }
    return originalGet(url, config);
  };
};
```

---

## 📚 Additional Resources

- **Environment Variables**: See `.env.example`
- **Dev Utils**: `src/utils/devMode.ts`
- **Auth Context**: `src/auth/AuthContext.tsx`
- **HTTP Client**: `src/api/httpClient.ts`

---

## ✅ Checklist

Before committing code:

- [ ] `VITE_DEV_MODE` is set to `false` or commented out
- [ ] No dev-only code left in components
- [ ] `.env` file is not committed (use `.env.example`)
- [ ] Production build works without dev mode
- [ ] Team knows how to enable dev mode if needed

---

## Questions?

If you need to test features without a running backend:

1. Enable dev mode
2. Use environment variable to point to mock API
3. Or run a mock API server using tools like:
   - [json-server](https://github.com/typicode/json-server)
   - [MSW (Mock Service Worker)](https://mswjs.io/)
   - [PostMan](https://www.postman.com/)

Happy testing! 🚀

