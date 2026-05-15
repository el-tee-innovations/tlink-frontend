# Dev Mode Cheat Sheet

## 🚀 Quick Start (30 seconds)

### 1. Edit `.env`
```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=JOB_SEEKER
```

### 2. Restart dev server
```bash
npm run dev
```

### 3. Done! 
You're now logged in as a mock Job Seeker. No authentication needed! 🎉

---

## 🔨 Common Tasks

### Test Job Seeker Features
```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=JOB_SEEKER
```
- Navigate to `/job-search`, `/assessments`, `/profile`, `/applications`

### Test Recruiter Features
```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=RECRUITER
```
- Navigate to `/recruiter/post-job`, `/recruiter/manage-jobs`, `/recruiter/analytics`

### Test Admin Features
```env
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=ADMIN
```
- Navigate to `/admin/dashboard`, `/admin/users`, `/admin/jobs`

### Switch Roles Without Restarting
Open browser console and run:
```javascript
import { switchDevModeRole } from '@/utils/devMode'
switchDevModeRole('RECRUITER')  // Changes role, page reloads
```

---

## 🐛 Debugging

### Check Dev Mode Status
Look for orange ⚠️ warning in browser console when page loads

### Get Current User
```javascript
import { getMockUser } from '@/utils/devMode'
console.log(getMockUser())
```

### Get Mock Token
```javascript
import { getMockToken } from '@/utils/devMode'
console.log(getMockToken())
```

### Check if Dev Mode Enabled
```javascript
import { isDevModeEnabled } from '@/utils/devMode'
console.log(isDevModeEnabled())  // true or false
```

---

## ✅ Before Committing

```bash
# 1. Check dev mode is disabled
grep "VITE_DEV_MODE" .env  # Should show 'false' or be commented

# 2. Test production build
npm run build

# 3. Check no dev code in bundle
grep -r "VITE_DEV_MODE" dist/  # Should return nothing
```

---

## 📚 Full Documentation
See `DEV_MODE_GUIDE.md` for complete documentation and troubleshooting

---

## 🎯 GUI Control

When dev mode is enabled, a button appears in the **bottom-right corner**:

- **⚙️ Dev Mode** button - Click to open menu
- Shows current user role
- Quick role switching buttons
- Links to documentation

---

## 🔐 Security Reminders

- ✅ Safe to enable in development
- ✅ Build strips dev mode (safe to forget to disable)
- ❌ Never merge with `VITE_DEV_MODE=true`
- ❌ Never deploy to production with dev mode
- ⚠️ Always verify before committing: `grep VITE_DEV_MODE .env`

---

## Keyboard Shortcuts

No keyboard shortcuts built in, but you can add this to your `.env.development`:

```env
# Workflow: Edit .env, save, dev server auto-reloads
VITE_DEV_MODE=true
VITE_DEV_USER_ROLE=JOB_SEEKER
```

---

## 💡 Tips & Tricks

### Tip 1: Quick Role Testing
```
1. Ctrl+` (open terminal in VS Code)
2. Type: switchDevModeRole('RECRUITER')
3. Test recruiter page
4. Switch back: switchDevModeRole('JOB_SEEKER')
```

### Tip 2: API Debugging
Mock token is logged when app starts:
```
Check console → Look for mock token
Use in Postman to test backend directly
```

### Tip 3: Backend Integration
```
1. Enable dev mode: VITE_DEV_MODE=true
2. Point to real backend: VITE_API_BASE_URL=http://localhost:8080/api
3. Backend receives valid mock JWT token
4. Backend can mock responses or test data
```

---

## Network Inspector

When testing API calls with dev mode:

1. Open DevTools → Network tab
2. Every request includes: `Authorization: Bearer dev-mock-token-...`
3. Backend can validate this or mock the response

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Dev mode not working | Restart dev server after `.env` change |
| Still seeing login page | Check console for orange warning |
| Role switch not working | Import from correct path: `@/utils/devMode` |
| API still fails | Backend might validate JWT - use mock token |

---

## Next Steps

1. ✅ Enable dev mode
2. ✅ Test all role-based pages
3. ✅ Report issues to team
4. ✅ Disable before committing
5. ✅ Merge to main branch

Happy coding! 🚀

