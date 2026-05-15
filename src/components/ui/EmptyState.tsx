import React from 'react';
import { Button } from './Button';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  action,
  secondaryAction,
  className = '',
  size = 'md'
}) => {
  const emptyStateClasses = [
    styles.emptyState,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={emptyStateClasses}>
      <div className={styles.icon}>
        {icon}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {(action || secondaryAction) && (
          <div className={styles.actions}>
            {action && (
              <Button
                variant={action.variant || 'primary'}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}

            {secondaryAction && (
              <Button
                variant="ghost"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Pre-built empty states for common scenarios
export const EmptyJobs: React.FC<{ onCreateJob?: () => void }> = ({ onCreateJob }) => (
  <EmptyState
    icon="💼"
    title="No jobs posted yet"
    description="Create your first job posting to start attracting top talent."
    action={onCreateJob ? {
      label: 'Post Your First Job',
      onClick: onCreateJob
    } : undefined}
  />
);

export const EmptyApplications: React.FC<{ onBrowseJobs?: () => void }> = ({ onBrowseJobs }) => (
  <EmptyState
    icon="📋"
    title="No applications yet"
    description="Start applying to jobs to see your applications here."
    action={onBrowseJobs ? {
      label: 'Browse Jobs',
      onClick: onBrowseJobs
    } : undefined}
  />
);

export const EmptySearchResults: React.FC<{ onClearFilters?: () => void }> = ({ onClearFilters }) => (
  <EmptyState
    icon="🔍"
    title="No results found"
    description="Try adjusting your search criteria or filters."
    action={onClearFilters ? {
      label: 'Clear Filters',
      onClick: onClearFilters
    } : undefined}
  />
);

export const EmptyAnalytics: React.FC = () => (
  <EmptyState
    icon="📊"
    title="No data available"
    description="Analytics will appear here once you have some activity."
  />
);

export const EmptyUsers: React.FC<{ onInviteUsers?: () => void }> = ({ onInviteUsers }) => (
  <EmptyState
    icon="👥"
    title="No users found"
    description="Users will appear here once they register or are invited."
    action={onInviteUsers ? {
      label: 'Invite Users',
      onClick: onInviteUsers
    } : undefined}
  />
);

export const EmptyNotifications: React.FC = () => (
  <EmptyState
    icon="🔔"
    title="No notifications"
    description="You're all caught up! New notifications will appear here."
  />
);

export const EmptyFavorites: React.FC<{ onBrowseJobs?: () => void }> = ({ onBrowseJobs }) => (
  <EmptyState
    icon="⭐"
    title="No favorites yet"
    description="Save jobs you're interested in to see them here."
    action={onBrowseJobs ? {
      label: 'Browse Jobs',
      onClick: onBrowseJobs
    } : undefined}
  />
);

