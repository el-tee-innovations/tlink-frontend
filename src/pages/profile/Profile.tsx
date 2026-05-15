import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { FileUpload } from '../../components/FileUpload';
import { uploadProfileVideo, getUserProfileVideo, deleteProfileVideo, type UserVideo } from '../../api/videoApi';
import styles from './Profile.module.css';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [profileVideo, setProfileVideo] = useState<UserVideo | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    skills: '',
    experience: '',
  });

  useEffect(() => {
    loadProfileVideo();
  }, []);

  const loadProfileVideo = async () => {
    try {
      const video = await getUserProfileVideo();
      setProfileVideo(video);
    } catch (error) {
      console.error('Failed to load profile video:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];

    if (file.size > 10 * 1024 * 1024) {
      setVideoError('Video file must be less than 10MB');
      return;
    }

    if (!file.type.startsWith('video/')) {
      setVideoError('Please select a valid video file');
      return;
    }

    try {
      setUploadingVideo(true);
      setVideoError(null);
      await uploadProfileVideo(file);
      await loadProfileVideo();
    } catch (error) {
      console.error('Failed to upload video:', error);
      setVideoError('Failed to upload video. Please try again.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleDeleteVideo = async () => {
    if (!confirm('Are you sure you want to delete your profile video?')) return;

    try {
      setUploadingVideo(true);
      await deleteProfileVideo();
      setProfileVideo(null);
      setVideoError(null);
    } catch (error) {
      console.error('Failed to delete video:', error);
      setVideoError('Failed to delete video. Please try again.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>My Profile</h1>
          <p className={styles.headerSubtitle}>View and edit your profile information</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatar}>👤</div>
            <h2 className={styles.profileName}>{user?.firstName} {user?.lastName}</h2>
            <p className={styles.profileEmail}>{user?.email}</p>
            <p className={styles.profileRole}>Role: {user?.role?.replace(/_/g, ' ')}</p>
          </div>

          <div className={styles.profileContent}>
            {!isEditing ? (
              <div>
                <div className={styles.section}>
                  <h3>Profile Information</h3>
                  <div className={styles.infoGrid}>
                    <div>
                      <p className={styles.label}>FIRST NAME</p>
                      <p className={styles.value}>{user?.firstName || 'Not set'}</p>
                    </div>
                    <div>
                      <p className={styles.label}>LAST NAME</p>
                      <p className={styles.value}>{user?.lastName || 'Not set'}</p>
                    </div>
                    <div>
                      <p className={styles.label}>EMAIL</p>
                      <p className={styles.value}>{user?.email}</p>
                    </div>
                    <div>
                      <p className={styles.label}>USER ID</p>
                      <p className={styles.valueMonospace}>{user?.id}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.sectionSeparated}>
                  <p className={styles.label}>MEMBER SINCE</p>
                  <p className={styles.value}>{user?.createdAt || 'Unknown'}</p>
                </div>

                <button className={styles.editButton} onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <form>
                <div className={styles.formSection}>
                  <label className={styles.formLabel}>
                    First Name
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </label>

                  <label className={styles.formLabel}>
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </label>

                  <label className={styles.formLabel}>
                    Phone
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={styles.formInput}
                    />
                  </label>

                  <label className={styles.formLabel}>
                    Bio
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className={styles.formTextarea}
                    />
                  </label>

                  <label className={styles.formLabel}>
                    Skills (comma-separated)
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="React, TypeScript, Node.js, ..."
                      className={styles.formInput}
                    />
                  </label>

                  <label className={styles.formLabel}>
                    Experience (Years)
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min="0"
                      className={styles.formInput}
                    />
                  </label>

                  <label className={styles.formLabel}>
                    Profile Video (Optional)
                    {videoError && (
                      <div className={styles.videoError}>
                        {videoError}
                      </div>
                    )}
                    {profileVideo && (
                      <div className={styles.videoSuccess}>
                        <p className={styles.videoSuccessTitle}>✓ Video uploaded</p>
                        <p className={styles.videoFileName}>{profileVideo.fileName}</p>
                        <p className={styles.videoDate}>Uploaded: {new Date(profileVideo.uploadedAt).toLocaleDateString()}</p>
                        <button
                          type="button"
                          onClick={handleDeleteVideo}
                          disabled={uploadingVideo}
                          className={styles.deleteVideoButton}
                        >
                          {uploadingVideo ? 'Deleting...' : 'Delete Video'}
                        </button>
                      </div>
                    )}
                    <FileUpload
                      accept="video/*"
                      maxSize={10}
                      onFilesSelected={handleVideoUpload}
                      allowedTypes={['video/mp4', 'video/x-m4v', 'video/quicktime']}
                      label=""
                      description={uploadingVideo ? 'Uploading video...' : 'Drag and drop a video file here, or click to select one'}
                      disabled={uploadingVideo || !isEditing}
                    />
                  </label>
                </div>

                <div className={styles.formButtons}>
                  <button
                    type="button"
                    onClick={handleSave}
                    className={styles.saveButton}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </main>
    </div>
  );
};

