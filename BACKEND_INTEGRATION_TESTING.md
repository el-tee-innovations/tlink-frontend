# Backend Integration Testing Guide

## Overview

This guide helps you verify that the React frontend works correctly with your Spring Boot backend. Follow these steps to ensure proper integration.

## Prerequisites

1. ✅ React frontend running: `npm run dev` (http://localhost:5173)
2. ✅ Spring Boot backend running: (http://localhost:8080)
3. ✅ `.env.local` configured: `VITE_API_BASE_URL=http://localhost:8080/api`
4. ✅ Backend CORS configured to allow http://localhost:5173

## Step 1: Verify Backend Endpoints

### Check Backend Health
```bash
# In browser or terminal
curl http://localhost:8080/api/health
# Should return 200 OK or similar
```

### Check Authentication Endpoints Exist
```bash
# Test login endpoint exists (will fail without credentials, but should not 404)
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d '{"username":"test","password":"test"}'
# Should NOT return 404. May return 401 if credentials wrong (that's ok)

# Test validate endpoint with dummy token
curl -X GET http://localhost:8080/api/auth/validate -H "Authorization: Bearer dummy_token"
# May return 401, but should not return 404
```

## Step 2: Test Login Flow

### Test 1: Successful Login
1. Start frontend: `npm run dev`
2. Navigate to http://localhost:5173/login
3. Enter valid credentials (create a test user in backend if needed)
4. Click Login
5. **Verify**:
   - ✅ No error message appears
   - ✅ Page redirects to home or dashboard
   - ✅ Browser DevTools → Application → localStorage shows `tlink_auth_token`
   - ✅ Browser DevTools → Network shows successful `POST /auth/login` (HTTP 200)

### Test 2: Failed Login
1. Navigate to http://localhost:5173/login
2. Enter invalid credentials
3. Click Login
4. **Verify**:
   - ✅ Error message displays
   - ✅ Page does NOT redirect
   - ✅ No token in localStorage
   - ✅ Browser Console shows error (not blank)

### Test 3: Login Already Authenticated
1. Login successfully
2. Navigate to http://localhost:5173/login
3. **Verify**:
   - ✅ You're redirected away from login page (to home or dashboard)
   - ✅ Not stuck on login page

## Step 3: Test Registration Flow

### Test 1: Successful Registration
1. Navigate to http://localhost:5173/register
2. Fill form:
   - Username: `testuser123`
   - Email: `test@example.com`
   - Password: `password123`
   - First Name: `Test`
   - Last Name: `User`
   - Role: `Job Seeker`
3. Click Register
4. **Verify**:
   - ✅ No error message
   - ✅ Page redirects to home or dashboard
   - ✅ `tlink_auth_token` in localStorage
   - ✅ User is logged in

### Test 2: Duplicate Username
1. Try registering with same username as Test 1
2. **Verify**:
   - ✅ Error message appears
   - ✅ Page does NOT redirect
   - ✅ No token created

### Test 3: Invalid Email Format
1. Fill form with invalid email (e.g., `notanemail`)
2. Try to submit
3. **Verify**:
   - ✅ Error appears (frontend or backend validation)

## Step 4: Test Token Validation

### Test 1: Login and Token Validation on Page Reload
1. Login successfully
2. Open DevTools → Application → Storage → JWT token visible
3. Refresh the page (F5)
4. **Verify**:
   - ✅ Page doesn't show loading spinner forever
   - ✅ User stays logged in (no redirect to login)
   - ✅ DevTools Network shows `GET /auth/validate` call
   - ✅ Request includes Authorization header with token
   - ✅ Response returns 200 with user data

### Test 2: Invalid Token Rejection
1. Login successfully
2. Open DevTools → Application → Storage
3. Edit `tlink_auth_token` to `invalid_token_xyz`
4. Refresh page
5. **Verify**:
   - ✅ Redirected to login page
   - ✅ Token cleared from localStorage
   - ✅ Error message about session or login required

### Test 3: Expired Token
1. Login successfully
2. Set token expiry in backend to past time (manual token expiration)
3. Try to navigate to protected page
4. **Verify**:
   - ✅ Redirected to login
   - ✅ Token cleared

## Step 5: Test Protected Routes

### Test 1: Job Seeker Routes
1. Login as job seeker
2. Navigate to `/dashboard`
3. **Verify**:
   - ✅ Dashboard loads successfully
   - ✅ User name and role displayed

4. Navigate to `/profile`
5. **Verify**:
   - ✅ Profile page loads

6. Navigate to `/applications`
7. **Verify**:
   - ✅ Applications page loads

### Test 2: Recruiter-Only Routes
1. Login as job seeker
2. Navigate to `/recruiter/dashboard`
3. **Verify**:
   - ✅ Redirected to `/unauthorized` page
   - ✅ Error message about insufficient permissions

4. Logout and login as recruiter
5. Navigate to `/recruiter/dashboard`
6. **Verify**:
   - ✅ Dashboard loads successfully

### Test 3: Admin-Only Routes
1. Login as recruiter
2. Navigate to `/admin/dashboard`
3. **Verify**:
   - ✅ Redirected to `/unauthorized`

4. Logout and login as admin
5. Navigate to `/admin/dashboard`
6. **Verify**:
   - ✅ Dashboard loads successfully

## Step 6: Test Logout Flow

### Test 1: Successful Logout
1. Login successfully
2. Look for logout button (typically on dashboard or page footer)
3. Click logout
4. **Verify**:
   - ✅ Redirected to home page
   - ✅ localStorage cleared (no `tlink_auth_token`)
   - ✅ Can't access protected pages anymore

### Test 2: Try Protected Page After Logout
1. Logout
2. Try to navigate to `/dashboard`
3. **Verify**:
   - ✅ Redirected to `/login`

## Step 7: Test API Request Headers

### Verify JWT Token Attached Automatically

1. Login successfully
2. Open DevTools → Network tab
3. Click on any API request that should require auth (e.g., `GET /auth/me`)
4. Click "Headers" tab
5. **Verify**:
   - ✅ Authorization header exists
   - ✅ Format: `Authorization: Bearer <token>`
   - ✅ Token matches `tlink_auth_token` in localStorage

## Step 8: Test Error Handling

### Test 1: 401 Unauthorized
1. Login successfully
2. Manually clear `tlink_auth_token` from localStorage
3. Try to access protected page
4. **Verify**:
   - ✅ Redirected to login
   - ✅ Error message or explanation

### Test 2: CORS Error (Backend CORS Not Configured)
1. If backend CORS doesn't allow frontend origin
2. Try to login
3. **Verify** in DevTools Console:
   - ✅ CORS error should NOT appear
   - ✅ If it does, backend CORS needs reconfiguration

### Test 3: Backend Offline
1. Stop backend server
2. Try to login on frontend
3. **Verify**:
   - ✅ Error message appears (not blank page)
   - ✅ User can see what went wrong

## Test Data Setup (Backend)

To test properly, create test users in your backend:

### Test User 1 (Job Seeker)
```
Username: jobseeker
Password: password123
Email: jobseeker@example.com
Role: JOB_SEEKER
```

### Test User 2 (Recruiter)
```
Username: recruiter
Password: password123
Email: recruiter@example.com
Role: RECRUITER
```

### Test User 3 (Admin)
```
Username: admin
Password: password123
Email: admin@example.com
Role: ADMIN
```

## Network Monitoring Checklist

### During Login
- [ ] `POST /auth/login` - Returns 200 with `{ accessToken, user }`
- [ ] Response time < 500ms
- [ ] Token in response matches localStorage value
- [ ] User object contains: id, email, username, role, firstName, lastName

### During Validation
- [ ] `GET /auth/validate` - Returns 200 with User object
- [ ] Authorization header: `Bearer <token>`
- [ ] No Authorization header for public endpoints

### During API Calls
- [ ] All protected endpoints include JWT in header
- [ ] 401 responses trigger logout
- [ ] 403 responses show permission denied
- [ ] 500 responses show error message

## Browser Console Issues to Watch For

### ✅ Good (No Issues)
- Clean console (no errors)
- Maybe some warnings about React DevTools
- Maybe some deprecation warnings

### ❌ Bad (Fix These)
- `Uncaught TypeError` - JavaScript error in page
- `[object Object]` errors - Generic error, need more info
- `Cannot read property X of undefined` - Null check issue
- `useAuth must be used within AuthProvider` - Component outside provider
- CORS errors - Backend CORS misconfigured

## Integration Test Checklist

- [ ] Backend health check passes
- [ ] All backend endpoints respond (no 404)
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials shows error
- [ ] Registration creates new user
- [ ] Token stored in localStorage after login
- [ ] Token sent in Authorization header for API calls
- [ ] Token validation works on page refresh
- [ ] Invalid token redirects to login
- [ ] Job seeker can access job seeker routes
- [ ] Recruiter cannot access admin routes
- [ ] Admin can access all routes
- [ ] Logout clears token and redirects
- [ ] Protected routes redirect to login when unauthorized
- [ ] Role-based access control works
- [ ] 401 errors handled properly
- [ ] No CORS errors in console
- [ ] No TypeScript errors
- [ ] No JavaScript errors
- [ ] Performance acceptable (< 1s login)

## Troubleshooting

### Issue: "Cannot GET /api/auth/login"
**Solution**: Backend auth endpoint doesn't exist at that path. Verify path matches backend.

### Issue: CORS error in console
**Solution**: Add `http://localhost:5173` to backend CORS whitelist.

### Issue: Login succeeds but page blank
**Solution**: Check if dashboard/home page exists and is wired up.

### Issue: Token not in Authorization header
**Solution**: Check `src/api/httpClient.ts` request interceptor is working.

### Issue: Stuck on loading spinner forever
**Solution**: Token validation is failing. Check `/auth/validate` endpoint implementation.

### Issue: "useAuth must be used within AuthProvider"
**Solution**: Auth hook used in component outside AuthProvider. Check component tree.

## Debug Commands

### Check Current Auth State
```javascript
// In browser console
const token = localStorage?.getItem('tlink_auth_token');
const user = localStorage?.getItem('tlink_auth_user');
console.log({token, user: user ? JSON.parse(user) : null});
```

### Test API Endpoint Manually
```javascript
// In browser console
fetch('http://localhost:8080/api/auth/validate', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('tlink_auth_token')}`
  }
}).then(r => r.json()).then(console.log);
```

### Simulate 401 Error
```javascript
// In browser console - simulate token expiration
localStorage.removeItem('tlink_auth_token');
window.location.reload();
```

## Next Steps After Integration

Once all tests pass:
1. Create actual API service functions (not just auth)
2. Implement data loading in pages
3. Add form submissions
4. Test with real data
5. Performance profiling
6. Security audit

---

**Integration Status**: Ready to Test
**Test Date**: [Your Date]
**Tester**: [Your Name]
**Backend Version**: [Backend Version]
**Frontend Version**: v0.0.0

All integration tests ✅ PASS → Ready for Phase 2 (Feature Development)

