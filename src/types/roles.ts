export const UserRole = {
  JOB_SEEKER: 'JOB_SEEKER',
  RECRUITER: 'RECRUITER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const isRole = (role: string | undefined): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole);
};

