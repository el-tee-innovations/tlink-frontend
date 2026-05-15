import httpClient from './httpClient';
import type { ApiResponse } from '../types/api';

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  totalQuestions: number;
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  createdAt: string;
  isPublished: boolean;
}

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  question: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface UserAssessmentAttempt {
  id: string;
  userId: string;
  assessmentId: string;
  startedAt: string;
  completedAt?: string;
  score?: number;
  totalPoints?: number;
  percentageScore?: number;
  passed?: boolean;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'SUBMITTED';
}

export interface AssessmentSubmission {
  attemptId: string;
  answers: {
    questionId: string;
    selectedAnswer: string;
  }[];
}

export interface AssessmentResult {
  attemptId: string;
  assessmentId: string;
  userId: string;
  score: number;
  totalPoints: number;
  percentageScore: number;
  passed: boolean;
  completedAt: string;
  answers: {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    points: number;
  }[];
}

/**
 * Get all available assessments for Job Seekers
 */
export const getAssessments = async (params?: {
  category?: string;
  difficulty?: string;
  page?: number;
  size?: number;
}): Promise<{
  assessments: Assessment[];
  totalElements: number;
  totalPages: number;
}> => {
  const response = await httpClient.get('/assessments', { params });
  return response.data;
};

/**
 * Get single assessment details (without questions for preview)
 */
export const getAssessmentById = async (id: string): Promise<Assessment> => {
  const response = await httpClient.get<Assessment>(`/assessments/${id}`);
  return response.data;
};

/**
 * Start an assessment attempt
 */
export const startAssessment = async (assessmentId: string): Promise<UserAssessmentAttempt> => {
  const response = await httpClient.post<UserAssessmentAttempt>(
    `/assessments/${assessmentId}/start`,
    {}
  );
  return response.data;
};

/**
 * Get assessment questions for current attempt
 */
export const getAssessmentQuestions = async (assessmentId: string): Promise<AssessmentQuestion[]> => {
  const response = await httpClient.get<AssessmentQuestion[]>(
    `/assessments/${assessmentId}/questions`
  );
  return response.data;
};

/**
 * Submit assessment answers
 */
export const submitAssessment = async (
  assessmentId: string,
  submission: AssessmentSubmission
): Promise<AssessmentResult> => {
  const response = await httpClient.post<AssessmentResult>(
    `/assessments/${assessmentId}/submit`,
    submission
  );
  return response.data;
};

/**
 * Get user's assessment history
 */
export const getUserAssessmentHistory = async (params?: {
  page?: number;
  size?: number;
}): Promise<{
  attempts: UserAssessmentAttempt[];
  totalElements: number;
  totalPages: number;
}> => {
  const response = await httpClient.get('/profile/assessments/history', { params });
  return response.data;
};

/**
 * Get assessment result details
 */
export const getAssessmentResult = async (attemptId: string): Promise<AssessmentResult> => {
  const response = await httpClient.get<AssessmentResult>(
    `/assessments/results/${attemptId}`
  );
  return response.data;
};

/**
 * Get user's skills based on completed assessments (for profile)
 */
export const getUserSkillsFromAssessments = async (): Promise<{
  skillId: string;
  skill: string;
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  verifiedAt: string;
}[]> => {
  const response = await httpClient.get(
    '/profile/skills-verified'
  );
  return response.data;
};

/**
 * Admin: Get all assessments
 */
export const getAllAssessmentsAdmin = async (params?: {
  page?: number;
  size?: number;
}): Promise<{
  assessments: Assessment[];
  totalElements: number;
  totalPages: number;
}> => {
  const response = await httpClient.get('/admin/assessments', { params });
  return response.data;
};

/**
 * Admin: Create assessment
 */
export const createAssessmentAdmin = async (assessment: Omit<Assessment, 'id' | 'createdAt'>): Promise<Assessment> => {
  const response = await httpClient.post<Assessment>(
    '/admin/assessments',
    assessment
  );
  return response.data;
};

/**
 * Admin: Update assessment
 */
export const updateAssessmentAdmin = async (
  id: string,
  assessment: Partial<Assessment>
): Promise<Assessment> => {
  const response = await httpClient.put<Assessment>(
    `/admin/assessments/${id}`,
    assessment
  );
  return response.data;
};

/**
 * Admin: Delete assessment
 */
export const deleteAssessmentAdmin = async (id: string): Promise<ApiResponse<void>> => {
  const response = await httpClient.delete<ApiResponse<void>>(
    `/admin/assessments/${id}`
  );
  return response.data;
};

