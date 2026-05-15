import httpClient from './httpClient';
import type { ApiResponse } from '../types/api';

// Application-related types
export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'INTERVIEWING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
  appliedDate: string;
  lastUpdated: string;
  coverLetter?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  notes?: string; // Recruiter notes
  interviewDate?: string;
  interviewNotes?: string;
}

export interface ApplicationCreateRequest {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface ApplicationUpdateRequest {
  status?: JobApplication['status'];
  notes?: string;
  interviewDate?: string;
  interviewNotes?: string;
}

export interface ApplicationSearchParams {
  status?: JobApplication['status'];
  jobId?: string;
  applicantId?: string;
  page?: number;
  size?: number;
  sortBy?: 'appliedDate' | 'lastUpdated' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ApplicationSearchResponse {
  applications: JobApplication[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

/**
 * Apply for a job (Job Seeker only)
 */
export const applyForJob = async (applicationData: ApplicationCreateRequest): Promise<JobApplication> => {
  const response = await httpClient.post<JobApplication>('/applications', applicationData);
  return response.data;
};

/**
 * Get applications for the current job seeker
 */
export const getMyApplications = async (params?: ApplicationSearchParams): Promise<ApplicationSearchResponse> => {
  const response = await httpClient.get<ApplicationSearchResponse>('/applications/my-applications', { params });
  return response.data;
};

/**
 * Get a single application by ID
 */
export const getApplicationById = async (id: string): Promise<JobApplication> => {
  const response = await httpClient.get<JobApplication>(`/applications/${id}`);
  return response.data;
};

/**
 * Withdraw an application (Job Seeker only - must own the application)
 */
export const withdrawApplication = async (id: string): Promise<JobApplication> => {
  const response = await httpClient.patch<JobApplication>(`/applications/${id}/withdraw`);
  return response.data;
};

/**
 * Get applications for jobs posted by the current recruiter
 */
export const getApplicationsForMyJobs = async (params?: ApplicationSearchParams): Promise<ApplicationSearchResponse> => {
  const response = await httpClient.get<ApplicationSearchResponse>('/applications/for-my-jobs', { params });
  return response.data;
};

/**
 * Update application status (Recruiter only - must own the job)
 */
export const updateApplicationStatus = async (id: string, updateData: ApplicationUpdateRequest): Promise<JobApplication> => {
  const response = await httpClient.patch<JobApplication>(`/applications/${id}`, updateData);
  return response.data;
};

/**
 * Schedule interview for an application (Recruiter only)
 */
export const scheduleInterview = async (id: string, interviewDate: string, notes?: string): Promise<JobApplication> => {
  const response = await httpClient.patch<JobApplication>(`/applications/${id}/schedule-interview`, {
    interviewDate,
    interviewNotes: notes
  });
  return response.data;
};

/**
 * Get application statistics for recruiter dashboard
 */
export const getApplicationStats = async (): Promise<{
  totalApplications: number;
  pendingApplications: number;
  underReviewApplications: number;
  interviewingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  recentApplications: number; // Last 7 days
  averageResponseTime: number; // In days
}> => {
  const response = await httpClient.get('/applications/stats');
  return response.data;
};

/**
 * Get all applications for admin management
 */
export const getAllApplicationsAdmin = async (params?: ApplicationSearchParams): Promise<ApplicationSearchResponse> => {
  const response = await httpClient.get<ApplicationSearchResponse>('/admin/applications', { params });
  return response.data;
};

/**
 * Admin: Update application status (force update)
 */
export const updateApplicationStatusAdmin = async (id: string, updateData: ApplicationUpdateRequest): Promise<JobApplication> => {
  const response = await httpClient.patch<JobApplication>(`/admin/applications/${id}`, updateData);
  return response.data;
};

/**
 * Admin: Delete application (force delete)
 */
export const deleteApplicationAdmin = async (id: string): Promise<ApiResponse<void>> => {
  const response = await httpClient.delete<ApiResponse<void>>(`/admin/applications/${id}`);
  return response.data;
};

/**
 * Export applications to CSV (Recruiter/Admin)
 */
export const exportApplicationsToCsv = async (params?: ApplicationSearchParams): Promise<Blob> => {
  const response = await httpClient.get('/applications/export', {
    params,
    responseType: 'blob'
  });
  return response.data;
};

/**
 * Bulk update application statuses (Recruiter only)
 */
export const bulkUpdateApplications = async (updates: { id: string; status: JobApplication['status'] }[]): Promise<ApiResponse<void>> => {
  const response = await httpClient.patch<ApiResponse<void>>('/applications/bulk-update', { updates });
  return response.data;
};

