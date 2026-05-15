import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  size = 'md',
  fullWidth = false,
  variant = 'outlined',
  className = '',
  id,
  disabled,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const containerClasses = [
    styles.container,
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.input,
    styles[variant],
    styles[size],
    error && styles.error,
    startIcon && styles.hasStartIcon,
    endIcon && styles.hasEndIcon,
    disabled && styles.disabled
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        {startIcon && (
          <div className={styles.startIcon}>
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />

        {endIcon && (
          <div className={styles.endIcon}>
            {endIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <div className={styles.helperText}>
          {error && <span className={styles.errorText}>{error}</span>}
          {helperText && !error && <span className={styles.helperTextContent}>{helperText}</span>}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

