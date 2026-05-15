import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAssessments, type Assessment, getUserAssessmentHistory, type UserAssessmentAttempt } from '../../api/assessmentApi';
import styles from './Assessments.module.css';

export const Assessments: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [userAttempts, setUserAttempts] = useState<UserAssessmentAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'history'>('available');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [assessmentsRes, historyRes] = await Promise.all([
        getAssessments({ page: 1, size: 20 }),
        getUserAssessmentHistory({ page: 1, size: 20 })
      ]);
      setAssessments(assessmentsRes.assessments);
      setUserAttempts(historyRes.attempts);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredAssessments = assessments.filter(a => {
    return (!selectedDifficulty || a.difficulty === selectedDifficulty) &&
           (!selectedCategory || a.category === selectedCategory);
  });

  const getAttemptForAssessment = (assessmentId: string) => {
    return userAttempts.find(a => a.assessmentId === assessmentId);
  };

  const categories = [...new Set(assessments.map(a => a.category))];

  const getDifficultyClass = (difficulty: string): string => {
    switch (difficulty) {
      case 'ADVANCED':
        return styles.advanced;
      case 'INTERMEDIATE':
        return styles.intermediate;
      default:
        return styles.beginner;
    }
  };

  const getStatusBadgeClass = (attempt: UserAssessmentAttempt): string => {
    if (attempt.passed) return styles.passed;
    if (attempt.status === 'IN_PROGRESS') return styles.inProgress;
    return styles.notPassed;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Skill Assessments</h1>
          <p className={styles.headerSubtitle}>Take assessments to showcase your skills and stand out to recruiters</p>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab('available')}
            className={`${styles.tabButton} ${activeTab === 'available' ? styles.active : ''}`}
          >
            Available Assessments
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${styles.tabButton} ${activeTab === 'history' ? styles.active : ''}`}
          >
            My History
          </button>
        </div>

        {/* Available Assessments */}
        {activeTab === 'available' && (
          <>
            {/* Filters */}
            <div className={styles.filtersContainer}>
              <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="">All Levels</option>
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedDifficulty('');
                    }}
                    className={styles.resetButton}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Assessment Cards */}
            <div className={styles.cardsGrid}>
              {loading ? (
                <div className={styles.loadingContainer}>
                  Loading assessments...
                </div>
              ) : filteredAssessments.length === 0 ? (
                <div className={styles.emptyStateCard}>
                  <div className={styles.emptyStateText}>
                    No assessments found matching your criteria
                  </div>
                </div>
              ) : (
                filteredAssessments.map(assessment => {
                  const lastAttempt = getAttemptForAssessment(assessment.id);
                  return (
                    <div key={assessment.id} className={styles.assessmentCard}>
                      <h3 className={styles.assessmentTitle}>{assessment.title}</h3>
                      <p className={styles.assessmentDescription}>
                        {assessment.description}
                      </p>

                      <div className={styles.tagsContainer}>
                        <span className={styles.tagCategory}>
                          {assessment.category}
                        </span>
                        <span className={`${styles.tagDifficulty} ${getDifficultyClass(assessment.difficulty)}`}>
                          {assessment.difficulty}
                        </span>
                      </div>

                      <div className={styles.assessmentDetails}>
                        <p className={styles.detailItem}>📋 {assessment.totalQuestions} questions</p>
                        <p className={styles.detailItem}>⏱️ {assessment.timeLimit} minutes</p>
                        <p className={styles.detailItem}>✅ Pass: {assessment.passingScore}%</p>
                      </div>

                      {lastAttempt && (
                        <div className={`${styles.attemptStatus} ${lastAttempt.passed ? styles.passed : styles.failed}`}>
                          <p className={styles.attemptStatusTitle}>
                            {lastAttempt.passed ? '✓ Passed' : '✗ Not Passed'}
                          </p>
                          <p className={styles.attemptScore}>
                            Score: {lastAttempt.percentageScore}%
                          </p>
                          <p className={styles.attemptDate}>
                            {new Date(lastAttempt.completedAt || '').toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      <Link
                        to={`/assessments/${assessment.id}`}
                        className={styles.assessmentLink}
                      >
                        {lastAttempt?.status === 'COMPLETED' ? 'Retake' : 'Start Assessment'}
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Assessment History */}
        {activeTab === 'history' && (
          <div className={styles.historyContainer}>
            {loading ? (
              <div className={styles.loadingContainer}>
                Loading history...
              </div>
            ) : userAttempts.length === 0 ? (
              <div className={styles.loadingContainer}>
                <div className={styles.emptyStateText}>
                  You haven't taken any assessments yet. Start with one to showcase your skills!
                </div>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th className={styles.tableHeaderCell}>Assessment</th>
                      <th className={styles.tableHeaderCell}>Score</th>
                      <th className={styles.tableHeaderCell}>Status</th>
                      <th className={styles.tableHeaderCell}>Date</th>
                      <th className={styles.tableHeaderCell}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAttempts.map(attempt => {
                      const assessment = assessments.find(a => a.id === attempt.assessmentId);
                      return (
                        <tr key={attempt.id} className={styles.tableRow}>
                          <td className={styles.tableCell}>{assessment?.title || 'Unknown'}</td>
                          <td className={styles.tableCell}>
                            <strong>{attempt.percentageScore}%</strong>
                          </td>
                          <td className={styles.tableCell}>
                            <span className={`${styles.statusBadge} ${getStatusBadgeClass(attempt)}`}>
                              {attempt.passed ? 'Passed' : attempt.status === 'IN_PROGRESS' ? 'In Progress' : 'Not Passed'}
                            </span>
                          </td>
                          <td className={`${styles.tableCell} ${styles.cellSmall}`}>
                            {attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString() : 'In Progress'}
                          </td>
                          <td className={styles.tableCell}>
                            <Link
                              to={`/assessments/${attempt.assessmentId}/result/${attempt.id}`}
                              className={styles.resultLink}
                            >
                              View Result
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className={styles.backLink}>
          <Link
            to="/dashboard"
            className={styles.backLinkStyle}
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

