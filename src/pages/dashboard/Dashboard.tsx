import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const jobListings = [
    { id: 1, title: 'Senior React Developer', company: 'Tech Corp', location: 'Remote', salary: '$120k-$150k' },
    { id: 2, title: 'Full Stack Engineer', company: 'StartUp Inc', location: 'San Francisco', salary: '$100k-$130k' },
    { id: 3, title: 'Frontend Developer', company: 'Digital Agency', location: 'New York', salary: '$80k-$110k' },
  ];

  const myApplications = [
    { id: 1, jobTitle: 'Senior React Developer', company: 'Tech Corp', status: 'Pending', appliedDate: '2026-05-01' },
    { id: 2, jobTitle: 'Full Stack Engineer', company: 'StartUp Inc', status: 'Reviewed', appliedDate: '2026-04-28' },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Dashboard</h1>
          <p className={styles.headerSubtitle}>Welcome back, {user?.firstName || user?.username}!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Quick Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber} style={{ color: '#3498db' }}>12</div>
            <p className={styles.statLabel}>Applications Sent</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber} style={{ color: '#27ae60' }}>3</div>
            <p className={styles.statLabel}>Under Review</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber} style={{ color: '#f39c12' }}>2</div>
            <p className={styles.statLabel}>Interview Offers</p>
          </div>
        </div>

        {/* Featured Jobs */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Featured Job Listings</h2>
            <Link to="/dashboard" className={styles.viewAllLink}>
              View All →
            </Link>
          </div>

          <div className={styles.jobList}>
            {jobListings.map(job => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobContent}>
                  <div>
                    <h3 className={styles.jobTitle}>{job.title}</h3>
                    <p className={styles.jobInfo}>
                      <strong>{job.company}</strong> • {job.location}
                    </p>
                    <p className={styles.jobSalary}>{job.salary}</p>
                  </div>
                  <button className={styles.applyButton}>
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Applications */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Your Recent Applications</h2>
            <Link to="/applications" className={styles.viewAllLink}>
              View All →
            </Link>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Applied</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.map(app => (
                  <tr key={app.id} className={styles.tableRow}>
                    <td>{app.jobTitle}</td>
                    <td>{app.company}</td>
                    <td className={styles.tableCellSmall}>{app.appliedDate}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${app.status === 'Pending' ? styles.pending : styles.reviewed}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

