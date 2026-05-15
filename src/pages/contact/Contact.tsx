import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';

export const Contact: React.FC = () => (
  <div className={styles.container}>
    <h1>Contact Us</h1>
    <p>Have questions? Get in touch with our team.</p>
    <p>Email: support@tlink.com</p>
    <p>Phone: +1 (555) 123-4567</p>
    <Link to="/">Back to Home</Link>
  </div>
);

