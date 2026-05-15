import httpClient from './httpClient';
import type { ApiResponse } from '../types/api';

export interface VideoUploadResponse {
  id: string;
  fileName: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  url: string;
}

export interface UserVideo {
  id: string;
  userId: string;
  fileName: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
  url: string;
  duration?: number;
}

/**
 * Upload user profile video
 * Only for Job Seekers
 */
export const uploadProfileVideo = async (file: File): Promise<VideoUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await httpClient.post<VideoUploadResponse>(
    '/profile/video/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data;
};

/**
 * Get user profile video
 */
export const getUserProfileVideo = async (): Promise<UserVideo | null> => {
  try {
    const response = await httpClient.get<UserVideo>('/profile/video');
    return response.data;
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Delete user profile video
 */
export const deleteProfileVideo = async (): Promise<ApiResponse<void>> => {
  const response = await httpClient.delete<ApiResponse<void>>('/profile/video');
  return response.data;
};

/**
 * Get job seeker's profile video (viewable by recruiters)
 */
export const getCandidateProfileVideo = async (userId: string): Promise<UserVideo | null> => {
  try {
    const response = await httpClient.get<UserVideo>(`/candidates/${userId}/video`);
    return response.data;
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
};

