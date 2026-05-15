import React, { useState, useRef } from 'react';
import type { DragEvent, ChangeEvent } from 'react';

export interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
  allowedTypes?: string[]; // e.g., ['image/jpeg', 'image/png']
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*',
  maxSize = 10, // 10MB default
  maxFiles = 1,
  multiple = false,
  onFilesSelected,
  onError,
  disabled = false,
  className = '',
  label = 'Upload Files',
  description = 'Drag and drop files here or click to browse',
  allowedTypes
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      return `File size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size (${maxSize}MB)`;
    }

    return null;
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    // Check max files limit
    if (!multiple && fileArray.length > 1) {
      onError?.('Only one file can be selected');
      return;
    }

    if (multiple && selectedFiles.length + fileArray.length > maxFiles) {
      onError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate each file
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    }

    // Handle errors
    if (errors.length > 0) {
      onError?.(errors.join('\n'));
      return;
    }

    // Update selected files
    const newSelectedFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
    setSelectedFiles(newSelectedFiles);
    onFilesSelected(newSelectedFiles);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`file-upload ${className}`}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#2c3e50',
          fontSize: '1rem'
        }}>
          {label}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{
          border: `2px dashed ${isDragOver ? '#3498db' : disabled ? '#bdc3c7' : '#ecf0f1'}`,
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          backgroundColor: isDragOver ? '#ecf7ff' : disabled ? '#f8f9fa' : 'white',
          transition: 'all 0.3s ease',
          opacity: disabled ? 0.6 : 1
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#bdc3c7' }}>
          📁
        </div>

        <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50', marginBottom: '0.5rem' }}>
          {isDragOver ? 'Drop files here' : description}
        </div>

        <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
          {accept !== '*' && `Accepted formats: ${accept}`}
          {maxSize && ` • Max size: ${maxSize}MB`}
          {multiple && maxFiles > 1 && ` • Max files: ${maxFiles}`}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          disabled={disabled}
        />
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#2c3e50', fontSize: '1rem' }}>
            Selected Files ({selectedFiles.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #ecf0f1'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ fontSize: '1.2rem' }}>
                    {file.type.startsWith('image/') ? '🖼️' :
                     file.type.startsWith('video/') ? '🎥' :
                     file.type.includes('pdf') ? '📄' :
                     '📎'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', color: '#2c3e50', fontSize: '0.9rem' }}>
                      {file.name}
                    </div>
                    <div style={{ color: '#7f8c8d', fontSize: '0.8rem' }}>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e74c3c',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '0',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  title="Remove file"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
