# JWT Auth Bypass - Getting Started (2 Minutes)

## 🎯 Goal
Test your frontend without needing a backend server or login credentials.

---

## ⚡ Quick Setup

### Step 1️⃣: Edit `.env`

```bash
# Open .env file in your project root
# Add or modify these lines:

VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=JOB_SEEKER
```

### Step 2️⃣: Restart Server

```bash
# Stop current server (Ctrl+C)
# Then run:

npm run dev
```

### Step 3️⃣: Check Browser

- Look for **orange ⚙️ Dev Mode button** in bottom-right corner
- You should see the console message: `⚠️ DEVELOPMENT MODE ENABLED`
- ✅ You're done! Automatically logged in.

---

## 🧪 Test Different Roles

### Option A: Change `.env` and Restart

```env
# For Job Seeker features:
VITE_DEV_USER_ROLE=JOB_SEEKER

# For Recruiter features:
VITE_DEV_USER_ROLE=RECRUITER

# For Admin features:
VITE_DEV_USER_ROLE=ADMIN
```

### Option B: Switch in Browser Console (No Restart!)

```javascript
// Open DevTools Console (F12)
// Copy and paste:

import { switchDevModeRole } from '@/utils/devMode'
switchDevModeRole('RECRUITER')
// Page reloads with recruiter role
```

---

## 🧭 Navigation by Role

### Job Seeker Routes
```
/dashboard              - Job seeker dashboard
/job-search            - Search and apply for jobs
/assessments           - Take skill assessments
/profile               - Edit profile & upload video
/applications          - Track applications
```

### Recruiter Routes
```
/recruiter/dashboard   - Recruiter dashboard
/recruiter/post-job    - Create new job listing
/recruiter/manage-jobs - Edit/delete job listings
/recruiter/jobs        - View your posted jobs
/recruiter/analytics   - View job statistics
```

### Admin Routes
```
/admin/dashboard       - Admin dashboard
/admin/users           - Manage user accounts
/admin/companies       - Manage companies
/admin/jobs            - Manage all jobs
/admin/applications    - Manage applications
```

---

## 🔍 Debug Information

### Check Current User
```javascript
import { getMockUser } from '@/utils/devMode'
getMockUser()  // Logs current user object
```

### Check Mock Token
```javascript
import { getMockToken } from '@/utils/devMode'
console.log(getMockToken())  // Shows mock JWT token
```

### Verify Dev Mode is Enabled
```javascript
import { isDevModeEnabled } from '@/utils/devMode'
console.log(isDevModeEnabled())  // true or false
```

---

## ✋ Before Committing Code

**IMPORTANT:** Turn off dev mode before committing!

```env
# Change this:
VITE_DEV_MODE=true

# To this:
VITE_DEV_MODE=false
```

Or just comment it out:
```env
# VITE_DEV_MODE=true  ← Commented out = disabled
```

---

## 📚 Learn More

- **[DEV_MODE_CHEATSHEET.md](./DEV_MODE_CHEATSHEET.md)** - Quick reference (2 min read)
- **[DEV_MODE_GUIDE.md](./DEV_MODE_GUIDE.md)** - Full documentation (10 min read)
- **[JWT_BYPASS_IMPLEMENTATION_SUMMARY.md](./JWT_BYPASS_IMPLEMENTATION_SUMMARY.md)** - Technical details (5 min read)

---

## ⚠️ What This DOESN'T Do

- ❌ Mock API responses (you still need a backend for that)
- ❌ Skip all validation (role validation still works)
- ❌ Work in production (code is stripped at build time)

---

## ✅ What This DOES Do

- ✅ Skip JWT token requirement
- ✅ Auto-login as mock user
- ✅ Enable all routes immediately
- ✅ Switch roles without logout
- ✅ Test frontend independently
- ✅ No code in production bundle

---

## 🚨 Troubleshooting

### Dev Mode Button Not Showing?
- Make sure `VITE_DEV_MODE=true` (capital letters!)
- Restart dev server
- Check browser console for "DEVELOPMENT MODE ENABLED" message

### Still Need to Login?
- Check `.env` file (might be using old version)
- Refresh page (Ctrl+R or Cmd+R)
- Check console for errors

### Role Switch Not Working?
- Make sure you're in console devtools (F12)
- Use exact import: `from '@/utils/devMode'`
- Check browser console for errors

---

## 🎉 You're Ready!

Go to `http://localhost:5173` and start testing!

No backend needed. No login required. Just code! 🚀

---

**Questions?** See the guides above or check inline code comments in:
- `src/utils/devMode.ts`
- `src/api/httpClient.ts`  
- `src/auth/AuthContext.tsx`

