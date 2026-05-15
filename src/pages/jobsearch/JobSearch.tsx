import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchJobs, type Job, type JobSearchParams } from '../../api/jobApi';
import styles from './JobSearch.module.css';

export const JobSearch: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<JobSearchParams>({
    query: '',
    location: '',
    jobType: undefined,
    experienceLevel: undefined,
    salaryMin: undefined,
    salaryMax: undefined,
    page: 1,
    size: 10,
    sortBy: 'postedDate',
    sortOrder: 'desc'
  });

  const performSearch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await searchJobs({ ...filters, page: currentPage });
      setJobs(response.jobs);
      setTotalResults(response.totalElements);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: ['salaryMin', 'salaryMax'].includes(name) ? (value ? parseFloat(value) : undefined) : value,
      page: 1
    }));
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    performSearch();
  };

  const handleApply = (jobId: string) => {
    navigate(`/applications?jobId=${jobId}`);
  };

  const totalPages = Math.ceil(totalResults / (filters.size || 10));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Find Your Next Job</h1>
          <p className={styles.headerSubtitle}>Search and apply to thousands of job opportunities</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h3 className={styles.filtersTitle}>Filters</h3>

            <form onSubmit={handleSearch}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Search</label>
                <input
                  type="text"
                  name="query"
                  value={filters.query}
                  onChange={handleFilterChange}
                  placeholder="Job title, skills..."
                  className={styles.filterInput}
                />
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City, country..."
                  className={styles.filterInput}
                />
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Job Type</label>
                <select
                  name="jobType"
                  value={filters.jobType || ''}
                  onChange={handleFilterChange}
                  className={styles.filterInput}
                >
                  <option value="">All Types</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="FREELANCE">Freelance</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Experience Level</label>
                <select
                  name="experienceLevel"
                  value={filters.experienceLevel || ''}
                  onChange={handleFilterChange}
                  className={styles.filterInput}
                >
                  <option value="">All Levels</option>
                  <option value="ENTRY">Entry Level</option>
                  <option value="MID">Mid Level</option>
                  <option value="SENIOR">Senior Level</option>
                  <option value="EXECUTIVE">Executive</option>
                </select>
              </div>

              <div className={styles.salaryGrid}>
                <label className={styles.filterLabel}>
                  <span>Min Salary</span>
                  <input
                    type="number"
                    name="salaryMin"
                    value={filters.salaryMin || ''}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className={styles.filterInput}
                  />
                </label>
                <label className={styles.filterLabel}>
                  <span>Max Salary</span>
                  <input
                    type="number"
                    name="salaryMax"
                    value={filters.salaryMax || ''}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className={styles.filterInput}
                  />
                </label>
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.searchButton}>
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilters({
                      query: '',
                      location: '',
                      jobType: undefined,
                      experienceLevel: undefined,
                      salaryMin: undefined,
                      salaryMax: undefined,
                      page: 1,
                      size: 10,
                      sortBy: 'postedDate',
                      sortOrder: 'desc'
                    });
                    setCurrentPage(1);
                  }}
                  className={styles.resetButton}
                >
                  Reset
                </button>
              </div>
            </form>
          </aside>

          <section>
            <div className={styles.resultCount}>
              Found <strong>{totalResults}</strong> job{totalResults !== 1 ? 's' : ''}
            </div>

            {loading ? (
              <div className={styles.loadingContainer}>
                <div>Loading jobs...</div>
              </div>
            ) : jobs.length === 0 ? (
              <div className={styles.emptyState}>
                <div>No jobs found matching your criteria</div>
              </div>
            ) : (
              <>
                {jobs.map(job => (
                  <div key={job.id} className={styles.jobCard}>
                    <div className={styles.jobContent}>
                      <div className={styles.jobInfo}>
                        <h3 className={styles.jobTitle}>{job.title}</h3>
                        <p className={styles.companyInfo}>
                          <strong>{job.company}</strong> • {job.location}
                        </p>
                        <p className={styles.jobMeta}>
                          {job.jobType} • {job.experienceLevel} Level
                        </p>
                        {job.salary && (
                          <p className={styles.salary}>{job.salary}</p>
                        )}
                        <div className={styles.skillsSection}>
                          <p className={styles.skillsLabel}>
                            <strong>Skills:</strong> {job.skills.join(', ')}
                          </p>
                        </div>
                        <p className={styles.postedDate}>
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => handleApply(job.id)}
                          className={styles.applyButton}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <div className={styles.paginationButtons}>
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={styles.paginationButton}
                      >
                        Previous
                      </button>

                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`${styles.paginationButton} ${currentPage === pageNum ? styles.active : ''}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={styles.paginationButton}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        <div className={styles.backLink}>
          <Link to="/dashboard" className={styles.link}>
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

