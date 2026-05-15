# Front End Stack

- React + TypeScript
- Vite
- React Router
- Axios
- JWT Authentication

# Back End Stack

- DDD Module Monolith (Preparation for Microservices)
- Spring Boot Rest API
- Spring Security with JWT
- Local Database -> H2
- Remote Database -> PostgreSQL

---

# tlink project requirements

We are building a job portal platform that connects jobseekers with recruiters. The platform will have the following features:

### We have three types of users:
1. Job Seekers (role = "JOB_SEEKER"): 
   - Can:
     - create profiles
     - search and apply for jobs
     - take assessments to showcase their skills
     - view their application history and status
     - upload introductory videos to enhance their profiles (optional)
     - track and manage their applications.
     - Can also receive notifications about job matches and application status updates.
   - Cannot:
     - post job listings
     - view others' profiles
     - manage company profiles
     - view analytics related to job postings.
2. Recruiters (role = "RECRUITER"): 
   - Can:
     - post job listings
     - manage applications
     - View candidate profiles (headhunt purpose)
     - view candidates introductory videos (if provided by candidates)
     - Schedule interviews
     - manage assessments
     - view analytics related to their job postings, headhunts and company.
   - Cannot:
     - view other recruiters' job listings
     - manage company profiles (except their own)
     - view platform-wide analytics.
3. Admins role = "ADMIN"):
   - Can:
     - manage users
     - manage company accounts
     - manages all job listings
     - manage all applications
     - manage assessments
     - view platform-wide analytics.
   - Cannot:
     - post job listings
     - apply for jobs
     - take part in recruitment flow

---

# Project Structure (Core)

```
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── auth
│   │   ├── components
│   │   ├── docs
│   │   ├── pages
│   │   ├── types
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── main.tsx
│   ├── public
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
└── backend (Modules follow the same structure as the analytics module shown below)
    ├── ...
    ├── modules
    │   ├── analytics
    │   │   ├── pom.xml
    │   │   ├── src
    │   │   │   ├── main
    │   │   │   │   └── java
    │   │   │   │       └── za.co.tlinkportal.analytics
    │   │   │   │           ├── api
    │   │   │   │           │   ├── api  
    │   │   │   │           ├── dto
    │   │   │   │           │   ├── request
    │   │   │   │           │   └── response  
    │   │   │   │           ├── domain
    │   │   │   │           ├── application
    │   │   │   │           └── infrastructure
    │   ├── auth
    │   ├── assessment
    │   ├── common
    │   ├── company
    │   ├── config
    │   ├── cv
    │   ├── job
    │   ├── job-application
    │   ├── orders
    │   ├── notification
    │   ├── recruitment
    │   ├── scheduler
    │   ├── skill
    │   ├── user
    ├── tlink-bootstrap
    │   ├── src
    │   │   ├── main
    │   │   │   ├── java
    │   │   │   │   └── za.co.tlinkportal.tlinkbootstrap
    │   │   │   │       └── TlinkBootstrapApplication.java
    │   │   │   └── resources
    │   │   │       ├── application.yaml
    │   │   │       └── ...
    │   │   └── test
    │   │       └── java
    │   │           └── za.co.tlinkportal.tlinkbootstrap
    │   │               └── TlinkBootstrapApplicationTests.java
    ├── pom.xml
    └── HELP.md
```

---

# JWT Authentication Flow
1. User submits login credentials (username and password) to the backend API.
2. Backend validates the credentials against the user database.
3. If valid, backend generates a JWT token containing user information and permissions.
4. Backend sends the JWT token back to the frontend.
5. Frontend stores the JWT token securely using localStorage, sessionStorage.
6. For subsequent API requests, frontend includes the JWT token in the Authorization header (e.g., `Authorization: Bearer <token>`).
7. Backend verifies the JWT token on each request to ensure it is valid and not expired.
8. If the token is valid, backend processes the request and returns the appropriate response.
9. If the token is invalid, backend returns an authentication error, prompting the frontend to redirect the user to the login page or display an error message.
10. User can log out by clearing the stored JWT token on the frontend, effectively ending the session.

---

# UI Pages

### Common Pages (No need for authentication)
- Home Page
- About Page
- Contact Page
- Login Page
- Registration Page

### User Pages (Require authentication)
- User Dashboard (listing of jobs tailored to the user)
- User Profile (view and edit profile information)
- Job Application Page (apply for a job and track application status)

### Recruiter Pages (Require authentication and recruiter role)
- Recruiter Dashboard (listing of posted jobs, applications, headhunts and analytics)
- Post Job Page (form to create a new job listing)
- Headhunt Page (view and manage headhunting efforts for potential candidates)
- Manage Job Page (view and edit existing job listings)
- Application Management Page (view and manage applications for posted jobs)
- Analytics Page (view analytics related to job postings, headhunts and applications)
- Company Profile Page (view and edit company information)

### Admin Pages (Require authentication and admin role)
- Admin Dashboard (overview of platform metrics and user management)
- User Management Page (view, edit, and delete user accounts)
- Company Management Page (view, edit, and delete company profiles)
- Job Management Page (view and manage all job listings)
- Application Management Page (view and manage all job applications)
- Analytics Page (view platform-wide analytics and reports)

---

# API RULES (GLOBAL)

- DO NOT invent endpoints
- All endpoints follow REST conventions
- All secured endpoints require JWT
- Role validation is enforced in backend
- Frontend only controls UI visibility

---

# Routing Rules

- Unauthenticated → only public routes
- Authenticated → role-based access
- Unauthorized access → redirect

---

# UI/UX Rules

- Role-based UI rendering
- No data leakage across roles
- Loading states for all API calls
- Error handling for all requests

---

# Feature Expansion Rules

When adding a new feature:

1. Create `/docs/features/{Module-name}-feature-name.md`
2. Define new:
    - endpoints
    - roles
    - request/response
3. Update this file (`system-spec.md`)
4. Then implement it