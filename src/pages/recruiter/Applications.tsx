import React from 'react';
import { Link } from 'react-router-dom';

export const RecruiterApplications: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Application Management</h1>
    <p>Manage applications for your job listings.</p>
    <Link to="/recruiter/dashboard">Back to Dashboard</Link>
  </div>
);

