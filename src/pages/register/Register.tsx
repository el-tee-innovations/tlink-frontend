import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { register as registerApi } from '../../api/authApi';
import { UserRole } from '../../types/roles';
import styles from './Register.module.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: UserRole.JOB_SEEKER,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    try {
      // Validate inputs
      if (!formData.username || !formData.email || !formData.password) {
        setFormError('Username, email, and password are required');
        return;
      }

      // Call register API
      const response = await registerApi(formData);

      // Update auth context - this automatically stores token and user
      login(response.user, response.token);

      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.';
      setFormError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>

      {formError && (
        <div className={styles.errorAlert}>
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            disabled={isLoading}
            className={styles.input}
          >
            <option value={UserRole.JOB_SEEKER}>Job Seeker</option>
            <option value={UserRole.RECRUITER}>Recruiter</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className={styles.centerText}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>

      <p className={styles.centerText}>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
};

