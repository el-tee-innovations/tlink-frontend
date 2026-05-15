import React, { useState } from 'react';

export interface SearchFilters {
  query?: string;
  location?: string;
  jobType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  skills?: string[];
}

export interface JobSearchProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
  className?: string;
}

export const JobSearch: React.FC<JobSearchProps> = ({
  onSearch,
  loading = false,
  className = ''
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    salaryMin: undefined,
    salaryMax: undefined,
    skills: []
  });

  const [skillInput, setSkillInput] = useState('');

  const handleInputChange = (field: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !filters.skills?.includes(skillInput.trim())) {
      setFilters(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      query: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      salaryMin: undefined,
      salaryMax: undefined,
      skills: []
    });
    setSkillInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`job-search ${className}`} style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <h3 style={{ margin: '0 0 1.5rem 0', color: '#2c3e50' }}>🔍 Search Jobs</h3>

      {/* Main Search Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Job title, keywords, or company..."
          value={filters.query}
          onChange={(e) => handleInputChange('query', e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            border: '2px solid #ecf0f1',
            borderRadius: '8px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3498db'}
          onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
        />
      </div>

      {/* Advanced Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Location */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2c3e50',
            fontSize: '0.9rem'
          }}>
            📍 Location
          </label>
          <input
            type="text"
            placeholder="City, State, or Remote"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Job Type */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2c3e50',
            fontSize: '0.9rem'
          }}>
            💼 Job Type
          </label>
          <select
            value={filters.jobType}
            onChange={(e) => handleInputChange('jobType', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">All Types</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="FREELANCE">Freelance</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2c3e50',
            fontSize: '0.9rem'
          }}>
            📈 Experience Level
          </label>
          <select
            value={filters.experienceLevel}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">All Levels</option>
            <option value="ENTRY">Entry Level</option>
            <option value="MID">Mid Level</option>
            <option value="SENIOR">Senior Level</option>
            <option value="EXECUTIVE">Executive</option>
          </select>
        </div>
      </div>

      {/* Salary Range */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#2c3e50',
          fontSize: '0.9rem'
        }}>
          💰 Salary Range (USD)
        </label>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.salaryMin || ''}
            onChange={(e) => handleInputChange('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          <span style={{ color: '#7f8c8d' }}>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.salaryMax || ''}
            onChange={(e) => handleInputChange('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#2c3e50',
          fontSize: '0.9rem'
        }}>
          🛠️ Skills
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Add a skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddSkill();
              }
            }}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          <button
            onClick={handleAddSkill}
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Add
          </button>
        </div>

        {/* Skill Tags */}
        {filters.skills && filters.skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {filters.skills.map(skill => (
              <span
                key={skill}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    lineHeight: '1',
                    padding: '0',
                    marginLeft: '0.25rem'
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          onClick={handleClear}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Clear Filters
        </button>
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '1.1rem',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? '🔍 Searching...' : '🔍 Search Jobs'}
        </button>
      </div>
    </div>
  );
};

