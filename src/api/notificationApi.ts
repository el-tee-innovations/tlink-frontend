import httpClient from './httpClient';

export interface Notification {
  id: string;
  userId: string;
  type: 'JOB_MATCH' | 'APPLICATION_STATUS' | 'INTERVIEW_SCHEDULED' | 'ASSESSMENT_RESULT' | 'GENERAL';
  title: string;
  message: string;
  relatedId?: string; // Job ID, Application ID, etc.
  relatedType?: 'JOB' | 'APPLICATION' | 'INTERVIEW' | 'ASSESSMENT';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface NotificationPreferences {
  userId: string;
  jobMatchNotifications: boolean;
  applicationStatusNotifications: boolean;
  interviewNotifications: boolean;
  assessmentNotifications: boolean;
  emailNotifications: boolean;
}

/**
 * Get user's notifications
 */
export const getNotifications = async (params?: {
  unreadOnly?: boolean;
  page?: number;
  size?: number;
}): Promise<{
  notifications: Notification[];
  totalElements: number;
  unreadCount: number;
}> => {
  const response = await httpClient.get('/notifications', { params });
  return response.data;
};

/**
 * Mark notification as read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<Notification> => {
  const response = await httpClient.patch<Notification>(
    `/notifications/${notificationId}/read`,
    {}
  );
  return response.data;
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async (): Promise<{ count: number }> => {
  const response = await httpClient.patch<{ count: number }>(
    '/notifications/read-all',
    {}
  );
  return response.data;
};

/**
 * Delete notification
 */
export const deleteNotification = async (notificationId: string): Promise<void> => {
  await httpClient.delete(`/notifications/${notificationId}`);
};

/**
 * Delete all read notifications
 */
export const deleteAllReadNotifications = async (): Promise<{ count: number }> => {
  const response = await httpClient.delete<{ count: number }>(
    '/notifications/read'
  );
  return response.data;
};

/**
 * Get notification preferences
 */
export const getNotificationPreferences = async (): Promise<NotificationPreferences> => {
  const response = await httpClient.get<NotificationPreferences>(
    '/profile/notification-preferences'
  );
  return response.data;
};

/**
 * Update notification preferences
 */
export const updateNotificationPreferences = async (
  preferences: Partial<NotificationPreferences>
): Promise<NotificationPreferences> => {
  const response = await httpClient.put<NotificationPreferences>(
    '/profile/notification-preferences',
    preferences
  );
  return response.data;
};

/**
 * Get unread notification count
 */
export const getUnreadNotificationCount = async (): Promise<number> => {
  const response = await httpClient.get<{ count: number }>(
    '/notifications/unread-count'
  );
  return response.data.count;
};

