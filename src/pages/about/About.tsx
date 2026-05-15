import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

export const About: React.FC = () => (
  <div className={styles.container}>
    <h1>About TLink</h1>
    <p>TLink is a job portal platform that connects jobseekers with recruiters.</p>
    <p>
      Our mission is to streamline the recruitment process and help jobseekers find their next
      opportunity.
    </p>
    <Link to="/">Back to Home</Link>
  </div>
);

