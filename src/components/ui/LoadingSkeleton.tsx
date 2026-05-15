import React from 'react';
import styles from './LoadingSkeleton.module.css';

export interface LoadingSkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'card' | 'table';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: boolean;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  animation = true
}) => {
  const skeletonClasses = [
    styles.skeleton,
    styles[variant],
    animation && styles.animated,
    className
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {};

  if (width) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }

  if (height) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  return <div className={skeletonClasses} style={style} />;
};

// Pre-built skeleton components
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = ''
}) => (
  <div className={className}>
    {Array.from({ length: lines }, (_, i) => (
      <LoadingSkeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? '60%' : '100%'}
        className={styles.textLine}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`${styles.cardSkeleton} ${className}`}>
    <LoadingSkeleton variant="rectangular" height={200} className={styles.cardImage} />
    <div className={styles.cardContent}>
      <LoadingSkeleton variant="text" width="80%" height={24} className={styles.cardTitle} />
      <SkeletonText lines={3} />
      <div className={styles.cardActions}>
        <LoadingSkeleton variant="rectangular" width={80} height={32} />
        <LoadingSkeleton variant="rectangular" width={60} height={32} />
      </div>
    </div>
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({
  rows = 5,
  columns = 4,
  className = ''
}) => (
  <div className={`${styles.tableSkeleton} ${className}`}>
    {/* Table Header */}
    <div className={styles.tableHeader}>
      {Array.from({ length: columns }, (_, i) => (
        <LoadingSkeleton
          key={`header-${i}`}
          variant="text"
          width="100%"
          height={16}
          className={styles.tableCell}
        />
      ))}
    </div>

    {/* Table Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={`row-${rowIndex}`} className={styles.tableRow}>
        {Array.from({ length: columns }, (_, colIndex) => (
          <LoadingSkeleton
            key={`cell-${rowIndex}-${colIndex}`}
            variant="text"
            width="100%"
            height={14}
            className={styles.tableCell}
          />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = ''
}) => (
  <LoadingSkeleton
    variant="circular"
    width={size}
    height={size}
    className={`${styles.avatar} ${className}`}
  />
);

export const SkeletonButton: React.FC<{ width?: string | number; className?: string }> = ({
  width = 120,
  className = ''
}) => (
  <LoadingSkeleton
    variant="rectangular"
    width={width}
    height={36}
    className={`${styles.button} ${className}`}
  />
);

