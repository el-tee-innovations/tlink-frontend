import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createJob, type JobCreateRequest } from '../../api/jobApi';

export const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<JobCreateRequest>({
    title: '',
    description: '',
    company: '',
    location: '',
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    skills: [],
    requirements: [],
    benefits: [],
    salaryMin: undefined,
    salaryMax: undefined,
    applicationDeadline: '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['salaryMin', 'salaryMax'].includes(name) ? (value ? parseFloat(value) : undefined) : value
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()]
      }));
      setRequirementInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...(prev.benefits || []), benefitInput.trim()]
      }));
      setBenefitInput('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.company || !formData.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await createJob(formData);
      navigate('/recruiter/manage-jobs');
    } catch (error) {
      console.error('Failed to post job:', error);
      alert('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Post New Job</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>Create a new job listing to attract candidates</p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '2rem' }}>
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <fieldset style={{ border: 'none', padding: '0 0 1.5rem 0', marginBottom: '2rem', borderBottom: '1px solid #ecf0f1' }}>
              <legend style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem' }}>Basic Information</legend>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Job Title *</span>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
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
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Company *</span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
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

              <label style={{ display: 'block', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Description *</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem',
                    marginTop: '0.5rem',
                    border: '1px solid #bdc3c7',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Location *</span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
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
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Application Deadline</span>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline || ''}
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
            </fieldset>

            {/* Job Details */}
            <fieldset style={{ border: 'none', padding: '0 0 1.5rem 0', marginBottom: '2rem', borderBottom: '1px solid #ecf0f1' }}>
              <legend style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem' }}>Job Details</legend>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Job Type *</span>
                  <select
                    name="jobType"
                    value={formData.jobType}
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
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="FREELANCE">Freelance</option>
                  </select>
                </label>
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Experience Level *</span>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
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
                    <option value="ENTRY">Entry Level</option>
                    <option value="MID">Mid Level</option>
                    <option value="SENIOR">Senior Level</option>
                    <option value="EXECUTIVE">Executive</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Minimum Salary (Optional)</span>
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin || ''}
                    onChange={handleInputChange}
                    min="0"
                    step="1000"
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
                <label style={{ display: 'block' }}>
                  <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Maximum Salary (Optional)</span>
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax || ''}
                    onChange={handleInputChange}
                    min="0"
                    step="1000"
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
            </fieldset>

            {/* Skills */}
            <fieldset style={{ border: 'none', padding: '0 0 1.5rem 0', marginBottom: '2rem', borderBottom: '1px solid #ecf0f1' }}>
              <legend style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem' }}>Required Skills *</legend>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Type a skill and press Enter or click Add"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #bdc3c7',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      borderRadius: '4px'
                    }}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1976d2',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: 0
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Requirements */}
            <fieldset style={{ border: 'none', padding: '0 0 1.5rem 0', marginBottom: '2rem', borderBottom: '1px solid #ecf0f1' }}>
              <legend style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem' }}>Requirements *</legend>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addRequirement();
                    }
                  }}
                  placeholder="Type a requirement and press Enter or click Add"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #bdc3c7',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.requirements.map((req, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f3e5f5',
                      color: '#7b1fa2',
                      borderRadius: '4px'
                    }}
                  >
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#7b1fa2',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: 0
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Benefits */}
            <fieldset style={{ border: 'none', padding: '0 0 1.5rem 0', marginBottom: '2rem', borderBottom: '1px solid #ecf0f1' }}>
              <legend style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '1rem' }}>Benefits (Optional)</legend>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addBenefit();
                    }
                  }}
                  placeholder="Type a benefit and press Enter or click Add"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #bdc3c7',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.benefits?.map((benefit, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#e8f5e9',
                      color: '#388e3c',
                      borderRadius: '4px'
                    }}
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#388e3c',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: 0
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Submit Button */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: loading ? '#95a5a6' : '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Posting...' : 'Post Job'}
              </button>
              <Link
                to="/recruiter/dashboard"
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

