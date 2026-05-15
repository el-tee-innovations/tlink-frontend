# TLink - Job Portal Frontend

React + TypeScript + Vite frontend for the TLink job portal platform connecting jobseekers with recruiters.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm

### Installation
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 📋 Features

### Authentication & Authorization
✅ JWT-based authentication with token validation  
✅ Centralized Axios interceptor for automatic JWT attachment  
✅ Role-based access control (JOB_SEEKER, RECRUITER, ADMIN)  
✅ Session persistence with localStorage  
✅ Automatic logout on token expiration  

### User Roles & Pages
**Job Seekers:**
- Browse and apply for jobs
- Manage profile and applications
- Track application status

**Recruiters:**
- Post and manage job listings
- Manage incoming applications
- Headhunt candidates
- View job posting analytics
- Manage company profile

**Admins:**
- Manage users and companies
- Monitor all jobs and applications
- Platform-wide analytics

### User Experience
✅ Loading states prevent race conditions  
✅ Role-based UI rendering  
✅ Protected routes with automatic redirection  
✅ Error boundaries and error pages  
✅ Responsive error messages  

## 📁 Project Structure

```
src/
├── api/              # API services and HTTP client
├── auth/             # Authentication context and hooks
├── components/       # Reusable components
├── pages/            # Page components by role
├── types/            # TypeScript type definitions
└── App.tsx           # Main app with routing
```

See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for detailed documentation.

## 🔐 Architecture Highlights

### Race Condition Prevention
Unlike the previous Blazor implementation, this React app prevents authentication race conditions:

1. **Initialization Blocking**: Auth state initializes on app mount before any protected components render
2. **Loading State Guard**: Protected routes check `isLoading === false` before rendering
3. **Centralized JWT**: All HTTP requests automatically include JWT token
4. **Explicit State**: No implicit lifecycle logic; auth state machine is deterministic

**Flow**: `App Start` → `AuthProvider Init` → `Token Validation` → `UI Renders` (never the other way around)

### Type Safety
- Full TypeScript with strict mode
- Discriminated unions for type safety
- Proper API response/error typing

### Separation of Concerns
- **Authentication**: AuthContext manages user state
- **Authorization**: Protected routes check roles
- **HTTP**: Centralized Axios interceptor
- **Routing**: React Router with explicit route hierarchy

## 🛠 Development

### Available Scripts

```bash
npm run dev      # Start dev server with HMR
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Environment Variables
Create `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### TypeScript
- Located in `src/**/*.ts(x)` files
- Check with: `npx tsc -b`
- Strict mode enabled

## 🧪 Testing Authentication Flow

### Manual Login Flow
1. Visit `http://localhost:5173`
2. Click "Login" 
3. Enter credentials (from your backend)
4. Should redirect to role-based dashboard
5. Token stored in `localStorage` as `tlink_auth_token`

### Manual Logout Flow
1. Click logout (available on protected pages)
2. Should redirect to home page
3. `localStorage` cleared

### Debug Token
```javascript
// In browser console
localStorage.getItem('tlink_auth_token');
localStorage.getItem('tlink_auth_user');
```

## 📚 API Integration

### Expected Backend Endpoints

The frontend expects these endpoints from the Spring Boot backend:

**Authentication:**
- `POST /auth/login` → `{ accessToken, user }`
- `POST /auth/register` → `{ accessToken, user }`
- `GET /auth/validate` → `User` (requires JWT header)
- `POST /auth/logout` → `{ success: true }`

**User:**
- `GET /auth/me` → `User` (requires JWT header)

See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md#api-integration) for details on expected response formats.

## 🚨 Common Issues

**"Blank page on load"**
- Check if backend is running at `VITE_API_BASE_URL`
- Check browser console for errors
- Verify `isLoading` status in React DevTools

**"Cannot login"**
- Verify backend endpoint at `POST /auth/login`
- Check CORS configuration in backend
- Ensure backend returns `{ accessToken, user }` format

**"useAuth must be used within AuthProvider"**
- Ensure component is inside routes wrapped by `<AuthProvider>`
- Check App.tsx structure

## 🔄 Migration from Blazor

**What's New:**
- Simpler auth flow without race conditions
- React Hooks instead of C# lifecycle methods
- Centralized state management with Context API
- Type-safe API integration

**What to Copy:**
- UI/UX layouts and styling
- Business logic from page components
- API endpoint paths (update to match backend)
- Form validation logic

## 📖 Documentation

- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Detailed architecture and API docs
- [docs/system-spec.md](docs/SYSTEM_SPEC.md) - System requirements and specs

## 🤝 Contributing

Follow these patterns when adding features:
1. Create feature in `docs/features/` with endpoint definitions
2. Add types in `src/types/`
3. Create API service in `src/api/`
4. Create page components in `src/pages/`
5. Add routes in `src/App.tsx`
6. Update `docs/system-spec.md`

See [docs/system-spec.md](docs/SYSTEM_SPEC.md#feature-expansion-rules) for full process.

## 📝 License

Internal project for TLink portal

