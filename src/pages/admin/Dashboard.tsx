import React from 'react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {

  // Mock analytics data
  const platformStats = [
    { label: 'Total Users', value: 1250, color: '#3498db' },
    { label: 'Active Jobs', value: 342, color: '#27ae60' },
    { label: 'Applications', value: 4582, color: '#e74c3c' },
    { label: 'Companies', value: 156, color: '#f39c12' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'JOB_SEEKER', joinedDate: '2026-05-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'RECRUITER', joinedDate: '2026-05-02' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'JOB_SEEKER', joinedDate: '2026-05-03' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Admin Dashboard</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>Platform Overview and Management</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Admin Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <Link 
            to="/admin/users"
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
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
            <strong>User Management</strong>
          </Link>

          <Link 
            to="/admin/companies"
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
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏢</div>
            <strong>Companies</strong>
          </Link>

          <Link 
            to="/admin/jobs"
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
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💼</div>
            <strong>Jobs</strong>
          </Link>

          <Link 
            to="/admin/analytics"
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
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
            <strong>Analytics</strong>
          </Link>
        </div>

        {/* Platform Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {platformStats.map((stat, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color }}>{stat.value.toLocaleString()}</div>
              <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Users */}
        <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>Recent User Registrations</h2>
            <Link to="/admin/users" style={{ color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>
              View All →
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ecf0f1' }}>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Role</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Joined</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#7f8c8d', fontWeight: 'bold' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                  <td style={{ padding: '1rem', color: '#2c3e50', fontWeight: '500' }}>{user.name}</td>
                  <td style={{ padding: '1rem', color: '#2c3e50' }}>{user.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      backgroundColor: user.role === 'JOB_SEEKER' ? '#3498db' : '#27ae60',
                      color: 'white',
                      fontWeight: '500'
                    }}>
                      {user.role === 'JOB_SEEKER' ? 'Seeker' : 'Recruiter'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>{user.joinedDate}</td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#95a5a6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}>
                      View
                    </button>
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

