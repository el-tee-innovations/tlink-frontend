import React, { useState, useMemo } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  pageSize = 10,
  searchable = false,
  searchPlaceholder = 'Search...',
  onRowClick,
  className = ''
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate sorted data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className={`data-table-loading ${className}`}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Loading...</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3498db',
                  animation: 'pulse 1.4s ease-in-out infinite',
                  animationDelay: `${i * 0.16}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`data-table ${className}`}>
      {/* Search */}
      {searchable && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #bdc3c7',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid #ecf0f1', borderRadius: '4px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ecf0f1' }}>
              {columns.map(column => (
                <th
                  key={String(column.key)}
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#2c3e50',
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: column.width,
                    position: 'relative'
                  }}
                  onClick={() => handleSort(String(column.key))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {column.header}
                    {column.sortable && (
                      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem' }}>
                        <span style={{
                          color: sortColumn === column.key && sortDirection === 'asc' ? '#3498db' : '#bdc3c7',
                          lineHeight: '0.8'
                        }}>
                          ▲
                        </span>
                        <span style={{
                          color: sortColumn === column.key && sortDirection === 'desc' ? '#3498db' : '#bdc3c7',
                          lineHeight: '0.8',
                          marginTop: '-2px'
                        }}>
                          ▼
                        </span>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: '3rem',
                    textAlign: 'center',
                    color: '#7f8c8d',
                    fontSize: '1.1rem'
                  }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: '1px solid #ecf0f1',
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => onRowClick?.(item)}
                  onMouseEnter={(e) => {
                    if (onRowClick) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (onRowClick) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {columns.map(column => (
                    <td
                      key={String(column.key)}
                      style={{
                        padding: '1rem',
                        verticalAlign: 'top'
                      }}
                    >
                      {column.render
                        ? column.render(item[column.key], item)
                        : String(item[column.key] || '')
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <div style={{ color: '#7f8c8d' }}>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                backgroundColor: currentPage === 1 ? '#ecf0f1' : 'white',
                color: currentPage === 1 ? '#bdc3c7' : '#2c3e50',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>

            {/* Page numbers */}
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #bdc3c7',
                    borderRadius: '4px',
                    backgroundColor: currentPage === pageNum ? '#3498db' : 'white',
                    color: currentPage === pageNum ? 'white' : '#2c3e50',
                    cursor: 'pointer'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #bdc3c7',
                borderRadius: '4px',
                backgroundColor: currentPage === totalPages ? '#ecf0f1' : 'white',
                color: currentPage === totalPages ? '#bdc3c7' : '#2c3e50',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Add CSS animation for loading dots
const styles = `
@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

