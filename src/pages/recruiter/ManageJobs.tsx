import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataTable, type Column } from '../../components/DataTable';
import { getMyJobs, updateJob, deleteJob, type Job, type JobUpdateRequest } from '../../api/jobApi';

export const ManageJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Partial<JobUpdateRequest>>({});

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await getMyJobs({ page: 1, size: 10 });
      setJobs(response.jobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setFormData(job);
  };

  const handleSaveEdit = async () => {
    if (!editingJob) return;
    try {
      await updateJob(editingJob.id, formData);
      setEditingJob(null);
      loadJobs();
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  const handleDeleteClick = async (jobId: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(jobId);
        loadJobs();
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? (value ? parseFloat(value) : undefined) : value;
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const tableColumns: Column<Job>[] = [
    { key: 'title', header: 'Title', sortable: true },
    { key: 'location', header: 'Location', sortable: true },
    { key: 'jobType', header: 'Type', sortable: true },
    { key: 'experienceLevel', header: 'Level', sortable: true },
    {
      key: 'isActive',
      header: 'Status',
      render: (value, _item) => (
        <span style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '4px',
          backgroundColor: value ? '#d4edda' : '#f8d7da',
          color: value ? '#155724' : '#856404'
        }}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'applicationsCount',
      header: 'Applications',
      render: (value, _item) => value || 0
    },
    {
      key: 'id',
      header: 'Actions',
      render: (_, job) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => handleEditClick(job)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteClick(job.id)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Manage Jobs</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>View and edit your job listings</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Action Buttons */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <Link
            to="/recruiter/post-job"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#27ae60',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            + Post New Job
          </Link>
          <Link
            to="/recruiter/dashboard"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#95a5a6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold'
            }}
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Edit Form Modal */}
        {editingJob && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h2 style={{ marginTop: 0 }}>Edit Job: {editingJob.title}</h2>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Title
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.5rem',
                      border: '1px solid #bdc3c7',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Description
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    rows={4}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.5rem',
                      border: '1px solid #bdc3c7',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>
                  Job Type
                  <select
                    name="jobType"
                    value={formData.jobType || ''}
                    onChange={handleInputChange}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.5rem',
                      border: '1px solid #bdc3c7',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option>FULL_TIME</option>
                    <option>PART_TIME</option>
                    <option>CONTRACT</option>
                    <option>FREELANCE</option>
                  </select>
                </label>
                <label style={{ display: 'block', fontWeight: 'bold' }}>
                  Experience Level
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel || ''}
                    onChange={handleInputChange}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.5rem',
                      border: '1px solid #bdc3c7',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option>ENTRY</option>
                    <option>MID</option>
                    <option>SENIOR</option>
                    <option>EXECUTIVE</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>
                  Salary Min
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin || ''}
                    onChange={handleInputChange}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.5rem',
                      border: '1px solid #bdc3c7',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </label>
                <label style={{ display: 'block', fontWeight: 'bold' }}>
                  Salary Max
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax || ''}
                    onChange={handleInputChange}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      marginTop: '0.5rem',
                      border: '1px solid #bdc3c7',
                      borderRadius: '4px',
                      boxSizing: 'border-box'
                    }}
                  />
                </label>
              </div>

              <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                />
                {' '}Active
              </label>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleSaveEdit}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingJob(null)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
          <DataTable
            data={jobs}
            columns={tableColumns}
            loading={loading}
            emptyMessage="No jobs posted yet. Post your first job to get started!"
            searchable={true}
            pageSize={10}
          />
        </div>
      </main>
    </div>
  );
};
