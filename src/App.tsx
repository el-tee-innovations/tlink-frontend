import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ToastProvider } from './components/Toast';
import { ProtectedRoute } from './components/ProtectedRoute';
// import { DevModeIndicator } from './components/DevModeIndicator';
import { UserRole } from './types/roles';

// Public pages
import { Home } from './pages/home';
import { About } from './pages/about';
import { Contact } from './pages/contact';
import { Login } from './pages/login';
import { Register } from './pages/register';

// Error pages
import { Unauthorized } from './pages/unauthorized';
import { NotFound } from './pages/notfound';

// Authenticated user pages
import { Dashboard } from './pages/dashboard';
import { Profile } from './pages/profile';
import { JobApplication } from './pages/jobapplication';
import { JobSearch } from './pages/jobsearch';
import { Assessments } from './pages/assessments';

// Recruiter pages
import { RecruiterDashboard } from './pages/recruiter/Dashboard';
import { PostJob } from './pages/recruiter/PostJob';
import { ManageJobs } from './pages/recruiter/ManageJobs';
import { RecruiterJobs } from './pages/recruiter/Jobs';
import { RecruiterApplications } from './pages/recruiter/Applications';
import { Headhunt, RecruiterAnalytics, CompanyProfile } from './pages/recruiter/Other';

// Admin pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminUsers, AdminCompanies, AdminJobs, AdminApplications, AdminAnalytics } from './pages/admin/Other';

import './App.css';

/**
 * App Component
 *
 * CRITICAL: The entire app is wrapped with:
 * 1. BrowserRouter - enables client-side routing
 * 2. AuthProvider - manages global authentication state
 *
 * Authentication initialization happens in AuthProvider:
 * - On mount, it attempts to restore session from localStorage
 * - Sets isLoading = false once done (success or failure)
 * - All ProtectedRoute components check isLoading before rendering
 *
 * This prevents the race conditions seen in the Blazor implementation:
 * - No components render before auth state is known
 * - No API requests execute without valid JWT
 * - No role-based UI renders incorrectly
 * - Navigation doesn't occur before login state is established
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* ==================== PUBLIC ROUTES ==================== */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ==================== ERROR ROUTES ==================== */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* ==================== AUTHENTICATED USER ROUTES ==================== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole={[UserRole.JOB_SEEKER]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute requiredRole={[UserRole.JOB_SEEKER]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute requiredRole={[UserRole.JOB_SEEKER]}>
                  <JobApplication />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-search"
              element={
                <ProtectedRoute requiredRole={[UserRole.JOB_SEEKER]}>
                  <JobSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessments"
              element={
                <ProtectedRoute requiredRole={[UserRole.JOB_SEEKER]}>
                  <Assessments />
                </ProtectedRoute>
              }
            />

            {/* ==================== RECRUITER ROUTES ==================== */}
            <Route
              path="/recruiter/dashboard"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/post-job"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/manage-jobs"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <ManageJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/jobs"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <RecruiterJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/applications"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <RecruiterApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/headhunt"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <Headhunt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/analytics"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <RecruiterAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/company"
              element={
                <ProtectedRoute requiredRole={UserRole.RECRUITER}>
                  <CompanyProfile />
                </ProtectedRoute>
              }
            />

            {/* ==================== ADMIN ROUTES ==================== */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/companies"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminCompanies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />

            {/* ==================== 404 ROUTE (MUST BE LAST) ==================== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/*<DevModeIndicator />*/}
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
