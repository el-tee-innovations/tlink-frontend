import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  children?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  className = '',
  collapsed = false,
  onToggle
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const sidebarClasses = [
    styles.sidebar,
    collapsed && styles.collapsed,
    className
  ].filter(Boolean).join(' ');

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className={sidebarClasses}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🔗</span>
          {!collapsed && <span className={styles.logoText}>TLink</span>}
        </div>
        {onToggle && (
          <button
            className={styles.toggleButton}
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '→' : '←'}
          </button>
        )}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user?.firstName?.[0] || user?.username?.[0] || 'U'}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>
              {user?.firstName || user?.username}
            </div>
            <div className={styles.userRole}>
              {user?.role?.replace(/_/g, ' ')}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {items.map(item => (
            <SidebarNavItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              isActive={isActive(item.path)}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        {!collapsed && (
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              Need help? <a href="/contact" className={styles.footerLink}>Contact Support</a>
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

interface SidebarNavItemProps {
  item: SidebarItem;
  collapsed: boolean;
  isActive: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  item,
  collapsed,
  isActive
}) => {
  const [isExpanded, setIsExpanded] = React.useState(isActive);

  const handleToggle = () => {
    if (item.children) {
      setIsExpanded(!isExpanded);
    }
  };

  const itemClasses = [
    styles.navItem,
    isActive && styles.active,
    item.children && styles.hasChildren,
    isExpanded && styles.expanded
  ].filter(Boolean).join(' ');

  return (
    <li className={styles.navItemWrapper}>
      <Link
        to={item.path}
        className={itemClasses}
        onClick={handleToggle}
        title={collapsed ? item.label : undefined}
      >
        <span className={styles.navIcon}>{item.icon}</span>
        {!collapsed && (
          <>
            <span className={styles.navLabel}>{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className={styles.navBadge}>{item.badge}</span>
            )}
            {item.children && (
              <span className={styles.navArrow}>
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
          </>
        )}
        {collapsed && item.badge && item.badge > 0 && (
          <span className={styles.navBadgeCollapsed}>{item.badge}</span>
        )}
      </Link>

      {/* Submenu */}
      {item.children && !collapsed && isExpanded && (
        <ul className={styles.submenu}>
          {item.children.map(child => (
            <li key={child.id} className={styles.submenuItem}>
              <Link
                to={child.path}
                className={`${styles.navItem} ${styles.subItem} ${
                  isActive && child.path === window.location.pathname ? styles.active : ''
                }`}
              >
                <span className={styles.navIcon}>{child.icon}</span>
                <span className={styles.navLabel}>{child.label}</span>
                {child.badge && child.badge > 0 && (
                  <span className={styles.navBadge}>{child.badge}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// Pre-configured sidebar items for different user roles
export const getRecruiterSidebarItems = (): SidebarItem[] => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/recruiter/dashboard'
  },
  {
    id: 'jobs',
    label: 'My Jobs',
    icon: '💼',
    path: '/recruiter/jobs'
  },
  {
    id: 'post-job',
    label: 'Post New Job',
    icon: '➕',
    path: '/recruiter/post-job'
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: '📋',
    path: '/recruiter/applications'
  },
  {
    id: 'headhunt',
    label: 'Headhunt',
    icon: '🔍',
    path: '/recruiter/headhunt'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    path: '/recruiter/analytics'
  },
  {
    id: 'company',
    label: 'Company Profile',
    icon: '🏢',
    path: '/recruiter/company'
  }
];

export const getAdminSidebarItems = (): SidebarItem[] => [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/admin/dashboard'
  },
  {
    id: 'users',
    label: 'User Management',
    icon: '👥',
    path: '/admin/users'
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: '🏢',
    path: '/admin/companies'
  },
  {
    id: 'jobs',
    label: 'All Jobs',
    icon: '💼',
    path: '/admin/jobs'
  },
  {
    id: 'applications',
    label: 'All Applications',
    icon: '📋',
    path: '/admin/applications'
  },
  {
    id: 'analytics',
    label: 'Platform Analytics',
    icon: '📈',
    path: '/admin/analytics'
  }
];

