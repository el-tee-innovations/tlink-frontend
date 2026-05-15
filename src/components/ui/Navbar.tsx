import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Button } from './Button';
import styles from './Navbar.module.css';

export interface NavbarProps {
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  className = '',
  sticky = false,
  transparent = false
}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navbarClasses = [
    styles.navbar,
    sticky && styles.sticky,
    transparent && styles.transparent,
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={navbarClasses}>
      <div className={styles.container}>
        {/* Logo/Brand */}
        <Link to="/" className={styles.brand} onClick={closeMobileMenu}>
          <div className={styles.logo}>
            🔗 <span className={styles.brandText}>TLink</span>
          </div>
          <span className={styles.tagline}>Job Portal Platform</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link to="/about" className={styles.navLink}>
            About
          </Link>
          <Link to="/contact" className={styles.navLink}>
            Contact
          </Link>

          {isAuthenticated ? (
            <div className={styles.authSection}>
              <div className={styles.userInfo}>
                <span className={styles.userName}>
                  {user?.firstName || user?.username}
                </span>
                <span className={styles.userRole}>
                  {user?.role?.replace(/_/g, ' ')}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginLink}>
                Login
              </Link>
              <Link to="/register">
                <Button
                  variant="primary"
                  size="sm"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileNavContent}>
          <Link to="/about" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            About
          </Link>
          <Link to="/contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Contact
          </Link>

          {isAuthenticated ? (
            <>
              <div className={styles.mobileUserInfo}>
                <div className={styles.mobileUserName}>
                  {user?.firstName || user?.username}
                </div>
                <div className={styles.mobileUserRole}>
                  {user?.role?.replace(/_/g, ' ')}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <div className={styles.mobileAuthButtons}>
              <Link
                to="/login"
                className={styles.mobileLoginLink}
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link to="/register" onClick={closeMobileMenu}>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};
