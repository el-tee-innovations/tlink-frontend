import React from 'react';
import { Link } from 'react-router-dom';

export const RecruiterJobs: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Manage Jobs</h1>
    <p>View and manage your job listings.</p>
    <button>Create New Job</button>
    <Link to="/recruiter/dashboard" style={{ marginLeft: '1rem' }}>
      Back to Dashboard
    </Link>
  </div>
);

