import React from 'react';
import { Link } from 'react-router-dom';

export const Headhunt: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Headhunt</h1>
    <p>View and manage your headhunting efforts.</p>
    <Link to="/recruiter/dashboard">Back to Dashboard</Link>
  </div>
);

export const RecruiterAnalytics: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Analytics</h1>
    <p>View analytics related to your job postings, headhunts, and applications.</p>
    <Link to="/recruiter/dashboard">Back to Dashboard</Link>
  </div>
);

export const CompanyProfile: React.FC = () => (
  <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
    <h1>Company Profile</h1>
    <p>View and edit company information.</p>
    <button>Edit Company</button>
    <Link to="/recruiter/dashboard" style={{ marginLeft: '1rem' }}>
      Back to Dashboard
    </Link>
  </div>
);

