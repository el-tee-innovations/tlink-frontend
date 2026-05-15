import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Unauthorized.module.css';

export const Unauthorized: React.FC = () => (
  <div className={styles.container}>
    <h1>403 - Unauthorized</h1>
    <p>You don't have permission to access this resource.</p>
    <p>Your role may not have the required permissions for this action.</p>
    <Link to="/">Return to Home</Link>
  </div>
);

