import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

export const RecruiterDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const postedJobs = [
    { id: 1, title: 'Senior Developer', applications: 15, posted: '2026-04-01' },
    { id: 2, title: 'UX Designer', applications: 8, posted: '2026-04-15' },
  ];

  const recentApplications = [
    { id: 1, candidate: 'John Doe', job: 'Senior Developer', received: '2026-05-03', status: 'New' },
    { id: 2, candidate: 'Jane Smith', job: 'Senior Developer', received: '2026-05-02', status: 'Reviewed' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Recruiter Dashboard</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>Welcome, {user?.firstName || user?.username}!</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <Link 
            to="/recruiter/post-job"
            style={{ 
              backgroundColor: '#3498db', 
              color: 'white', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>➕</div>
            <strong>Post New Job</strong>
          </Link>
          
          <Link 
            to="/recruiter/jobs"
            style={{ 
              backgroundColor: '#27ae60', 
              color: 'white', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#229954'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💼</div>
            <strong>My Jobs</strong>
          </Link>

          <Link 
            to="/recruiter/applications"
            style={{ 
              backgroundColor: '#e74c3c', 
              color: 'white', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📋</div>
            <strong>Applications</strong>
          </Link>

          <Link 
            to="/recruiter/analytics"
            style={{ 
              backgroundColor: '#9b59b6', 
              color: 'white', 
              padding: '1.5rem', 
              borderRadius: '8px', 
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8e44ad'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9b59b6'}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
            <strong>Analytics</strong>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>2</div>
            <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>Active Jobs</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>23</div>
            <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>Total Applications</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>15</div>
            <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>Profile Views</p>
          </div>
        </div>

        {/* Posted Jobs */}
        <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 1.5rem 0' }}>Your Posted Jobs</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {postedJobs.map(job => (
              <div key={job.id} style={{ border: '1px solid #ecf0f1', borderRadius: '6px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{job.title}</h3>
                    <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>Posted: {job.posted}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>{job.applications}</div>
                    <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>Applications</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Applications */}
        <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: '0 0 1.5rem 0' }}>Recent Applications</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ecf0f1' }}>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Candidate</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Job Applied</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Received</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map(app => (
                <tr key={app.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                  <td style={{ padding: '1rem', color: '#2c3e50' }}>{app.candidate}</td>
                  <td style={{ padding: '1rem', color: '#2c3e50' }}>{app.job}</td>
                  <td style={{ padding: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>{app.received}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      backgroundColor: app.status === 'New' ? '#e74c3c' : '#3498db',
                      color: 'white'
                    }}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

