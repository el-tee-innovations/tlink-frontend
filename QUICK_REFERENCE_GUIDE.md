# Implementation Quick Reference Guide

## Where to Find Each Feature

### 🎯 Job Seeker Features

#### 1. Job Search & Apply
- **Page:** `src/pages/JobSearch.tsx`
- **Route:** `/job-search`
- **Features:**
  - Search jobs by title, skills, location
  - Filter by job type and experience level
  - Salary range filtering
  - Pagination support
  - Apply to job functionality

#### 2. Assessments
- **Page:** `src/pages/Assessments.tsx`
- **Route:** `/assessments`
- **Features:**
  - Browse available assessments
  - Filter by category and difficulty
  - Take assessment exams
  - View assessment history
  - See scores and passing status
- **API:** `src/api/assessmentApi.ts`

#### 3. Profile with Video Upload
- **Page:** `src/pages/Profile.tsx`
- **Route:** `/profile`
- **Features:**
  - Edit profile information
  - Upload introductory video (10MB max)
  - Delete uploaded video
  - View upload status and metadata
- **API:** `src/api/videoApi.ts`

#### 4. View Applications
- **Page:** `src/pages/JobApplication.tsx`
- **Route:** `/applications`
- **Features:**
  - Track application status
  - View application history
  - See job details for applications

#### 5. Dashboard
- **Page:** `src/pages/Dashboard.tsx`
- **Route:** `/dashboard`
- **Features:**
  - Overview of recommended jobs
  - Quick links to job search, applications, assessments, profile

---

### 💼 Recruiter Features

#### 1. Post New Job
- **Page:** `src/pages/recruiter/PostJob.tsx`
- **Route:** `/recruiter/post-job`
- **Features:**
  - Complete job posting form
  - Dynamic skill/requirement/benefit inputs
  - Job type and experience level selection
  - Salary range setup
  - Application deadline configuration
  - API Integration: `createJob()` from `jobApi.ts`

#### 2. Manage Jobs (NEW)
- **Page:** `src/pages/recruiter/ManageJobs.tsx`
- **Route:** `/recruiter/manage-jobs`
- **Features:**
  - View all posted jobs in table format
  - Edit job details via modal
  - Delete job listings
  - Search and sort jobs
  - Track application counts
  - Toggle job active/inactive status
  - API Integration: `updateJob()`, `deleteJob()` from `jobApi.ts`

#### 3. View Applications
- **Page:** `src/pages/recruiter/Applications.tsx`
- **Route:** `/recruiter/applications`
- **Features:**
  - View all applications for recruiter's jobs
  - Manage application status
  - Contact candidates

#### 4. Headhunt
- **Page:** `src/pages/recruiter/Other.tsx`
- **Route:** `/recruiter/headhunt`
- **Features:**
  - View and manage headhunting efforts
  - Search candidate profiles (with video preview capability)

#### 5. Analytics
- **Page:** `src/pages/recruiter/Other.tsx` - `RecruiterAnalytics`
- **Route:** `/recruiter/analytics`
- **Features:**
  - Job posting analytics
  - Application analytics
  - Headhunt performance metrics

#### 6. Company Profile
- **Page:** `src/pages/recruiter/Other.tsx` - `CompanyProfile`
- **Route:** `/recruiter/company`
- **Features:**
  - View company information
  - Edit company details

#### 7. Recruiter Dashboard
- **Page:** `src/pages/recruiter/Dashboard.tsx`
- **Route:** `/recruiter/dashboard`
- **Features:**
  - Overview of job postings, applications, analytics

---

### 👨‍💼 Admin Features

#### 1. User Management
- **Page:** `src/pages/admin/Other.tsx` - `AdminUsers`
- **Route:** `/admin/users`
- **Features:**
  - View all users
  - Edit user details
  - Delete user accounts
  - Manage user roles

#### 2. Company Management
- **Page:** `src/pages/admin/Other.tsx` - `AdminCompanies`
- **Route:** `/admin/companies`
- **Features:**
  - View all company profiles
  - Edit company information
  - Delete company accounts

#### 3. Job Management
- **Page:** `src/pages/admin/Other.tsx` - `AdminJobs`
- **Route:** `/admin/jobs`
- **Features:**
  - View all job listings
  - Manage job status
  - Delete jobs if needed

#### 4. Application Management
- **Page:** `src/pages/admin/Other.tsx` - `AdminApplications`
- **Route:** `/admin/applications`
- **Features:**
  - View all job applications
  - Manually manage application status

#### 5. Admin Analytics
- **Page:** `src/pages/admin/Other.tsx` - `AdminAnalytics`
- **Route:** `/admin/analytics`
- **Features:**
  - Platform-wide analytics
  - User statistics
  - Job posting statistics
  - Application statistics

#### 6. Admin Dashboard
- **Page:** `src/pages/admin/Dashboard.tsx`
- **Route:** `/admin/dashboard`
- **Features:**
  - Platform overview
  - Quick metrics
  - Links to all management pages

---

## 🔗 Routing Structure (App.tsx)

```
/                           Public - Home
/about                      Public - About
/contact                    Public - Contact
/login                      Public - Login
/register                   Public - Register

/dashboard                  Protected (JOB_SEEKER) - Job Seeker Dashboard
/profile                    Protected (JOB_SEEKER) - Profile
/applications               Protected (JOB_SEEKER) - Applications
/job-search                 Protected (JOB_SEEKER) - Job Search [NEW]
/assessments                Protected (JOB_SEEKER) - Assessments [NEW]

/recruiter/dashboard        Protected (RECRUITER) - Recruiter Dashboard
/recruiter/post-job         Protected (RECRUITER) - Post Job
/recruiter/manage-jobs      Protected (RECRUITER) - Manage Jobs [NEW]
/recruiter/jobs             Protected (RECRUITER) - Jobs List
/recruiter/applications     Protected (RECRUITER) - Applications
/recruiter/headhunt         Protected (RECRUITER) - Headhunt
/recruiter/analytics        Protected (RECRUITER) - Analytics
/recruiter/company          Protected (RECRUITER) - Company Profile

/admin/dashboard            Protected (ADMIN) - Admin Dashboard
/admin/users                Protected (ADMIN) - User Management
/admin/companies            Protected (ADMIN) - Company Management
/admin/jobs                 Protected (ADMIN) - Job Management
/admin/applications         Protected (ADMIN) - Application Management
/admin/analytics            Protected (ADMIN) - Analytics

/unauthorized               Error - 403 Unauthorized
/*                          Error - 404 Not Found
```

---

## 📁 New API Modules

### Video API (`src/api/videoApi.ts`)
```typescript
uploadProfileVideo(file: File)          // POST /profile/video/upload
getUserProfileVideo()                   // GET /profile/video
deleteProfileVideo()                    // DELETE /profile/video
getCandidateProfileVideo(userId)        // GET /candidates/{userId}/video
```

### Assessment API (`src/api/assessmentApi.ts`)
```typescript
getAssessments(params?)                 // GET /assessments
getAssessmentById(id)                   // GET /assessments/{id}
startAssessment(assessmentId)           // POST /assessments/{id}/start
getAssessmentQuestions(id)              // GET /assessments/{id}/questions
submitAssessment(id, submission)        // POST /assessments/{id}/submit
getUserAssessmentHistory(params?)       // GET /profile/assessments/history
getAssessmentResult(attemptId)          // GET /assessments/results/{attemptId}
getUserSkillsFromAssessments()          // GET /profile/skills-verified

// Admin
getAllAssessmentsAdmin(params?)         // GET /admin/assessments
createAssessmentAdmin(data)             // POST /admin/assessments
updateAssessmentAdmin(id, data)         // PUT /admin/assessments/{id}
deleteAssessmentAdmin(id)               // DELETE /admin/assessments/{id}
```

### Notification API (`src/api/notificationApi.ts`)
```typescript
getNotifications(params?)               // GET /notifications
markNotificationAsRead(id)              // PATCH /notifications/{id}/read
markAllNotificationsAsRead()            // PATCH /notifications/read-all
deleteNotification(id)                  // DELETE /notifications/{id}
deleteAllReadNotifications()            // DELETE /notifications/read

getNotificationPreferences()            // GET /profile/notification-preferences
updateNotificationPreferences(prefs)    // PUT /profile/notification-preferences
getUnreadNotificationCount()            // GET /notifications/unread-count
```

---

## 🎨 Key Components Used

- **FileUpload:** `src/components/FileUpload.tsx` - Drag & drop file upload
- **DataTable:** `src/components/DataTable.tsx` - Sortable, searchable, paginated tables
- **Layout:** `src/components/Layout.tsx` - Main page layout
- **Navbar:** `src/components/ui/Navbar.tsx` - Navigation
- **Sidebar:** `src/components/ui/Sidebar.tsx` - Role-based menu
- **Toast:** `src/components/Toast.tsx` - Notifications/alerts

---

## 🔐 Authentication & Authorization

**File:** `src/auth/AuthContext.tsx`
- JWT token management
- User session persistence
- Role-based access control

**File:** `src/components/ProtectedRoute.tsx`
- Route-level access control
- Redirects unauthorized users to login
- Redirects to /unauthorized for wrong roles

**File:** `src/api/httpClient.ts`
- Automatic JWT token injection in headers
- Token refresh handling
- API error handling

---

## 🧪 Testing Checklist

### Job Seeker Features
- [ ] Job search filters work correctly
- [ ] Can apply to jobs
- [ ] Video upload validates file type and size
- [ ] Can see assessment list and take tests
- [ ] Application history displays correctly

### Recruiter Features
- [ ] Post job form validates all fields
- [ ] Posted jobs appear in manage jobs
- [ ] Can edit job details
- [ ] Can delete job listings
- [ ] Can view applications for their jobs

### Admin Features
- [ ] Can view all users/companies/jobs/applications
- [ ] Can manage user roles
- [ ] Can create, edit, delete assessments
- [ ] Analytics page loads correctly

---

## 📝 Notes for Backend Integration

1. **Video Endpoints** need to support:
   - Multipart form data for uploads
   - Video URL generation for streaming
   - Size and type validation

2. **Assessment Endpoints** need to support:
   - Timed exams with countdown
   - Multiple question types
   - Automatic scoring
   - Result storage and retrieval

3. **Notification Endpoints** need to support:
   - Real-time updates (consider WebSocket/Server-Sent Events)
   - User preference persistence
   - Email notification integration

4. **Job Endpoints** already have:
   - Advanced search/filter parameters
   - Pagination support
   - Full CRUD operations

---

## 🚀 Deployment Checklist

- [ ] All routes configured in App.tsx
- [ ] API base URL set in .env (VITE_API_BASE_URL)
- [ ] JWT token storage configured
- [ ] Error pages configured
- [ ] Loading states functional
- [ ] Response validators working
- [ ] CORS settings configured on backend

