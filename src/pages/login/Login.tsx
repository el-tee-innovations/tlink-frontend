import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { login as loginApi } from '../../api/authApi';
import styles from './Login.module.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, setError, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!formData.email || !formData.password) {
        setFormError('Username and password are required');
        return;
      }

      // Call login API
      const response = await loginApi(formData);

      // Update auth context - this automatically stores token and user
      login(response.user, response.token);

      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Login failed. Please try again.';
      setFormError(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>

      {formError && (
        <div className={styles.errorAlert}>
          {formError}
        </div>
      )}

      {error && (
        <div className={styles.warningAlert}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
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

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className={styles.centerText}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      <p className={styles.centerText}>
        <Link to="/">Back to Home</Link>
      </p>
    </div>
  );
};

