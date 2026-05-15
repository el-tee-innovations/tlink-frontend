import httpClient from './httpClient';
import type { ApiResponse } from '../types/api';

// Job-related types
export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  salary?: string; // For display purposes
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE';
  experienceLevel: 'ENTRY' | 'MID' | 'SENIOR' | 'EXECUTIVE';
  skills: string[];
  requirements: string[];
  benefits?: string[];
  postedBy: string; // User ID
  postedDate: string;
  applicationDeadline?: string;
  isActive: boolean;
  applicationsCount?: number;
}

export interface JobCreateRequest {
  title: string;
  description: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: Job['jobType'];
  experienceLevel: Job['experienceLevel'];
  skills: string[];
  requirements: string[];
  benefits?: string[];
  applicationDeadline?: string;
}

export interface JobUpdateRequest extends Partial<JobCreateRequest> {
  isActive?: boolean;
}

export interface JobSearchParams {
  query?: string;
  location?: string;
  jobType?: Job['jobType'];
  experienceLevel?: Job['experienceLevel'];
  skills?: string[];
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  size?: number;
  sortBy?: 'postedDate' | 'salaryMin' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface JobSearchResponse {
  jobs: Job[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

/**
 * Get all jobs with optional filtering and pagination
 */
export const getJobs = async (params?: JobSearchParams): Promise<JobSearchResponse> => {
  const response = await httpClient.get<JobSearchResponse>('/jobs', { params });
  return response.data;
};

/**
 * Get a single job by ID
 */
export const getJobById = async (id: string): Promise<Job> => {
  const response = await httpClient.get<Job>(`/jobs/${id}`);
  return response.data;
};

/**
 * Create a new job (Recruiter only)
 */
export const createJob = async (jobData: JobCreateRequest): Promise<Job> => {
  const response = await httpClient.post<Job>('/jobs', jobData);
  return response.data;
};

/**
 * Update an existing job (Recruiter only - must own the job)
 */
export const updateJob = async (id: string, jobData: JobUpdateRequest): Promise<Job> => {
  const response = await httpClient.put<Job>(`/jobs/${id}`, jobData);
  return response.data;
};

/**
 * Delete a job (Recruiter only - must own the job)
 */
export const deleteJob = async (id: string): Promise<ApiResponse<void>> => {
  const response = await httpClient.delete<ApiResponse<void>>(`/jobs/${id}`);
  return response.data;
};

/**
 * Get jobs posted by the current recruiter
 */
export const getMyJobs = async (params?: Omit<JobSearchParams, 'query'>): Promise<JobSearchResponse> => {
  const response = await httpClient.get<JobSearchResponse>('/jobs/my-jobs', { params });
  return response.data;
};

/**
 * Get recommended jobs for the current job seeker
 */
export const getRecommendedJobs = async (limit: number = 10): Promise<Job[]> => {
  const response = await httpClient.get<Job[]>('/jobs/recommended', { params: { limit } });
  return response.data;
};

/**
 * Search jobs with advanced filters
 */
export const searchJobs = async (searchParams: JobSearchParams): Promise<JobSearchResponse> => {
  const response = await httpClient.get<JobSearchResponse>('/jobs/search', { params: searchParams });
  return response.data;
};

/**
 * Get job statistics for recruiter dashboard
 */
export const getJobStats = async (): Promise<{
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  averageApplicationsPerJob: number;
  recentApplications: number; // Last 30 days
}> => {
  const response = await httpClient.get('/jobs/stats');
  return response.data;
};

/**
 * Get all jobs for admin management
 */
export const getAllJobsAdmin = async (params?: JobSearchParams): Promise<JobSearchResponse> => {
  const response = await httpClient.get<JobSearchResponse>('/admin/jobs', { params });
  return response.data;
};

/**
 * Admin: Update job status (activate/deactivate)
 */
export const updateJobStatusAdmin = async (id: string, isActive: boolean): Promise<Job> => {
  const response = await httpClient.patch<Job>(`/admin/jobs/${id}/status`, { isActive });
  return response.data;
};

/**
 * Admin: Delete job (force delete)
 */
export const deleteJobAdmin = async (id: string): Promise<ApiResponse<void>> => {
  const response = await httpClient.delete<ApiResponse<void>>(`/admin/jobs/${id}`);
  return response.data;
};

