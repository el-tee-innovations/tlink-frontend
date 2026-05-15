import httpClient from './httpClient';

// Analytics-related types
export interface AnalyticsData {
  period: string; // e.g., "2026-05", "last-30-days"
  metrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    totalJobs: number;
    activeJobs: number;
    newJobs: number;
    totalApplications: number;
    newApplications: number;
    acceptedApplications: number;
    rejectedApplications: number;
    averageResponseTime: number; // in days
    topSkills: Array<{ skill: string; count: number }>;
    topLocations: Array<{ location: string; count: number }>;
    jobTypeDistribution: Record<string, number>;
    applicationStatusDistribution: Record<string, number>;
  };
  trends: {
    userGrowth: Array<{ date: string; count: number }>;
    jobPostings: Array<{ date: string; count: number }>;
    applications: Array<{ date: string; count: number }>;
  };
}

export interface RecruiterAnalytics {
  period: string;
  metrics: {
    totalJobsPosted: number;
    activeJobs: number;
    totalApplications: number;
    averageApplicationsPerJob: number;
    responseRate: number; // percentage
    acceptanceRate: number; // percentage
    averageTimeToResponse: number; // in days
    topPerformingJobs: Array<{
      jobId: string;
      jobTitle: string;
      applicationsCount: number;
      acceptedCount: number;
    }>;
    applicationTrends: Array<{ date: string; count: number }>;
    skillDemands: Array<{ skill: string; count: number }>;
  };
}

export interface JobSeekerAnalytics {
  period: string;
  metrics: {
    totalApplications: number;
    applicationsThisMonth: number;
    responseRate: number; // percentage
    interviewRate: number; // percentage
    acceptanceRate: number; // percentage
    averageResponseTime: number; // in days
    topSkills: string[];
    applicationStatusBreakdown: Record<string, number>;
    applicationTrends: Array<{ date: string; count: number }>;
    recommendedJobsCount: number;
  };
}

export interface AnalyticsParams {
  period?: 'last-7-days' | 'last-30-days' | 'last-90-days' | 'last-year' | 'all-time';
  startDate?: string; // ISO date string
  endDate?: string;   // ISO date string
}

/**
 * Get platform-wide analytics (Admin only)
 */
export const getPlatformAnalytics = async (params?: AnalyticsParams): Promise<AnalyticsData> => {
  const response = await httpClient.get<AnalyticsData>('/analytics/platform', { params });
  return response.data;
};

/**
 * Get recruiter-specific analytics
 */
export const getRecruiterAnalytics = async (params?: AnalyticsParams): Promise<RecruiterAnalytics> => {
  const response = await httpClient.get<RecruiterAnalytics>('/analytics/recruiter', { params });
  return response.data;
};

/**
 * Get job seeker analytics
 */
export const getJobSeekerAnalytics = async (params?: AnalyticsParams): Promise<JobSeekerAnalytics> => {
  const response = await httpClient.get<JobSeekerAnalytics>('/analytics/job-seeker', { params });
  return response.data;
};

/**
 * Get job posting analytics for a specific job (Recruiter only)
 */
export const getJobAnalytics = async (jobId: string, params?: AnalyticsParams): Promise<{
  jobId: string;
  jobTitle: string;
  totalApplications: number;
  applicationsOverTime: Array<{ date: string; count: number }>;
  applicationSources: Record<string, number>; // e.g., { "direct": 10, "search": 25 }
  demographics: {
    locations: Array<{ location: string; count: number }>;
    experienceLevels: Record<string, number>;
    skills: Array<{ skill: string; count: number }>;
  };
  conversionFunnel: {
    applied: number;
    reviewed: number;
    interviewed: number;
    accepted: number;
  };
}> => {
  const response = await httpClient.get(`/analytics/jobs/${jobId}`, { params });
  return response.data;
};

/**
 * Export analytics data to CSV/Excel (Admin only)
 */
export const exportAnalyticsData = async (
  type: 'users' | 'jobs' | 'applications' | 'platform',
  format: 'csv' | 'excel' = 'csv',
  params?: AnalyticsParams
): Promise<Blob> => {
  const response = await httpClient.get(`/analytics/export/${type}`, {
    params: { ...params, format },
    responseType: 'blob'
  });
  return response.data;
};

/**
 * Get real-time dashboard metrics (Admin only)
 */
export const getRealtimeMetrics = async (): Promise<{
  activeUsers: number;
  jobsPostedToday: number;
  applicationsToday: number;
  serverStatus: 'healthy' | 'warning' | 'error';
  uptime: string;
  responseTime: number; // in ms
}> => {
  const response = await httpClient.get('/analytics/realtime');
  return response.data;
};

/**
 * Get user engagement metrics (Admin only)
 */
export const getUserEngagementMetrics = async (params?: AnalyticsParams): Promise<{
  dailyActiveUsers: Array<{ date: string; count: number }>;
  sessionDuration: {
    average: number; // in minutes
    distribution: Record<string, number>; // e.g., { "0-5min": 100, "5-15min": 250 }
  };
  pageViews: Array<{ page: string; views: number }>;
  userRetention: {
    day1: number; // percentage
    day7: number;
    day30: number;
  };
}> => {
  const response = await httpClient.get('/analytics/engagement', { params });
  return response.data;
};

/**
 * Get conversion funnel analytics (Admin only)
 */
export const getConversionFunnel = async (params?: AnalyticsParams): Promise<{
  visitors: number;
  signups: number;
  jobSeekers: number;
  recruiters: number;
  jobPostings: number;
  applications: number;
  interviews: number;
  hires: number;
  rates: {
    signupRate: number; // visitors to signups
    jobSeekerRate: number; // signups to job seekers
    recruiterRate: number; // signups to recruiters
    applicationRate: number; // job seekers to applications
    interviewRate: number; // applications to interviews
    hireRate: number; // interviews to hires
  };
}> => {
  const response = await httpClient.get('/analytics/funnel', { params });
  return response.data;
};

/**
 * Get geographic analytics (Admin only)
 */
export const getGeographicAnalytics = async (params?: AnalyticsParams): Promise<{
  usersByCountry: Array<{ country: string; count: number }>;
  usersByCity: Array<{ city: string; count: number }>;
  jobsByLocation: Array<{ location: string; count: number }>;
  applicationsByLocation: Array<{ location: string; count: number }>;
  topJobMarkets: Array<{ location: string; jobCount: number; applicationCount: number }>;
}> => {
  const response = await httpClient.get('/analytics/geographic', { params });
  return response.data;
};

/**
 * Get skill demand analytics
 */
export const getSkillDemandAnalytics = async (params?: AnalyticsParams): Promise<{
  trendingSkills: Array<{ skill: string; growth: number; demand: number }>;
  skillGapAnalysis: Array<{ skill: string; supply: number; demand: number; gap: number }>;
  emergingSkills: Array<{ skill: string; mentions: number; growth: number }>;
  skillSalaryCorrelation: Array<{ skill: string; averageSalary: number; demand: number }>;
}> => {
  const response = await httpClient.get('/analytics/skills', { params });
  return response.data;
};

