import React from 'react';
import { Link } from 'react-router-dom';

export const AdminUsers: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>User Management</h1>
    <p>View, edit, and delete user accounts.</p>
    <Link to="/admin/dashboard">Back to Dashboard</Link>
  </div>
);

export const AdminCompanies: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Company Management</h1>
    <p>View, edit, and delete company profiles.</p>
    <Link to="/admin/dashboard">Back to Dashboard</Link>
  </div>
);

export const AdminJobs: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Job Management</h1>
    <p>View and manage all job listings.</p>
    <Link to="/admin/dashboard">Back to Dashboard</Link>
  </div>
);

export const AdminApplications: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Application Management</h1>
    <p>View and manage all job applications.</p>
    <Link to="/admin/dashboard">Back to Dashboard</Link>
  </div>
);

export const AdminAnalytics: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Platform Analytics</h1>
    <p>View platform-wide analytics and reports.</p>
    <Link to="/admin/dashboard">Back to Dashboard</Link>
  </div>
);

