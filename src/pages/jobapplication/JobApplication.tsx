import React from 'react';
import styles from './JobApplication.module.css';

export const JobApplication: React.FC = () => {
  // Mock applications data
  const applications = [
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '$120k-$150k',
      status: 'Interviewing',
      appliedDate: '2026-05-01',
      lastUpdated: '2026-05-03'
    },
    {
      id: 2,
      jobTitle: 'Full Stack Engineer',
      company: 'StartUp Inc',
      location: 'San Francisco',
      salary: '$100k-$130k',
      status: 'Under Review',
      appliedDate: '2026-04-28',
      lastUpdated: '2026-04-30'
    },
    {
      id: 3,
      jobTitle: 'Frontend Developer',
      company: 'Digital Agency',
      location: 'New York',
      salary: '$80k-$110k',
      status: 'Rejected',
      appliedDate: '2026-04-20',
      lastUpdated: '2026-04-25'
    },
    {
      id: 4,
      jobTitle: 'Backend Developer',
      company: 'Cloud Systems',
      location: 'Austin',
      salary: '$110k-$140k',
      status: 'Accepted',
      appliedDate: '2026-04-10',
      lastUpdated: '2026-05-03'
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Accepted': return '#27ae60';
      case 'Interviewing': return '#f39c12';
      case 'Under Review': return '#3498db';
      case 'Rejected': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>My Job Applications</h1>
          <p className={styles.headerSubtitle}>Track and manage all your job applications</p>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Filters */}
        <div className={styles.filterContainer}>
          <div className={styles.filterContent}>
            <label className={styles.filterLabel}>Filter by Status:</label>
            <select className={styles.filterSelect}>
              <option>All Statuses</option>
              <option>Accepted</option>
              <option>Interviewing</option>
              <option>Under Review</option>
              <option>Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Search by company..."
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Applications List */}
        <div className={styles.applicationsList}>
          {applications.map(app => (
            <div
              key={app.id}
              className={styles.applicationCard}
              style={{ borderLeftColor: getStatusColor(app.status) }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.jobTitle}>{app.jobTitle}</h3>
                    <p className={styles.jobInfo}>
                      <strong>{app.company}</strong> • {app.location}
                    </p>
                    <p className={styles.jobSalary}>{app.salary}</p>
                  </div>
                  <div className={styles.statusContainer}>
                    <span
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(app.status) }}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div>
                    <p className={styles.footerLabel}>Applied On</p>
                    <p className={styles.footerValue}>{app.appliedDate}</p>
                  </div>
                  <div>
                    <p className={styles.footerLabel}>Last Updated</p>
                    <p className={styles.footerValue}>{app.lastUpdated}</p>
                  </div>
                  <div className={styles.footerRight}>
                    <button className={styles.detailsButton}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

