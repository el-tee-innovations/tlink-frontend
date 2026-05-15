import React from 'react';
import { Navbar } from './ui/Navbar';
import styles from './Layout.module.css';

export interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  navbarProps?: React.ComponentProps<typeof Navbar>;
  className?: string;
  maxWidth?: string;
  padding?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showNavbar = true,
  navbarProps,
  className = '',
  maxWidth = '1200px',
  padding = '2rem 1rem'
}) => {
  const layoutClasses = [
    styles.layout,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={layoutClasses}>
      {showNavbar && <Navbar {...navbarProps} />}

      <main
        className={styles.main}
        style={{
          maxWidth,
          padding
        }}
      >
        {children}
      </main>
    </div>
  );
};

// Specialized layouts for different user roles
export const DashboardLayout: React.FC<{
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}> = ({ children, sidebar, className = '' }) => {
  const layoutClasses = [
    styles.dashboardLayout,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={layoutClasses}>
      <Navbar />

      <div className={styles.dashboardContent}>
        {sidebar && (
          <aside className={styles.sidebar}>
            {sidebar}
          </aside>
        )}

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

// Public page layout (no navbar)
export const PublicLayout: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  padding?: string;
}> = ({ children, className = '', maxWidth, padding }) => (
  <Layout
    showNavbar={false}
    className={className}
    maxWidth={maxWidth}
    padding={padding}
  >
    {children}
  </Layout>
);

// Auth page layout (centered content)
export const AuthLayout: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}> = ({ children, title, subtitle }) => (
  <PublicLayout
    maxWidth="400px"
    padding="4rem 1rem"
    className={styles.authLayout}
  >
    {(title || subtitle) && (
      <div className={styles.authHeader}>
        {title && <h1 className={styles.authTitle}>{title}</h1>}
        {subtitle && <p className={styles.authSubtitle}>{subtitle}</p>}
      </div>
    )}
    {children}
  </PublicLayout>
);

