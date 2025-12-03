import React, { CSSProperties } from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onQuickFilter: (days: number) => void;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    border: '1px solid #e5e7eb',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  labelSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    height: '20px',
    width: '20px',
    color: '#9ca3af',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  quickFilters: {
    display: 'flex',
    gap: '8px',
  },
  quickFilterButton: {
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.15s',
  },
  dateSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dateInput: {
    padding: '4px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  },
  separator: {
    color: '#9ca3af',
    fontSize: '14px',
  },
};

export const DateFilter: React.FC<DateFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onQuickFilter
}) => {
  const quickFilters = [
    { label: 'Today', days: 1 },
    { label: '7 Days', days: 7 },
    { label: '30 Days', days: 30 },
    { label: '90 Days', days: 90 }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.labelSection}>
          <Calendar style={styles.icon} />
          <span style={styles.label}>Date Range:</span>
        </div>
        
        <div style={styles.quickFilters}>
          {quickFilters.map(filter => (
            <button
              key={filter.days}
              onClick={() => onQuickFilter(filter.days)}
              style={styles.quickFilterButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div style={styles.dateSection}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            style={styles.dateInput}
            onFocus={(e) => {
              e.target.style.borderColor = '#4f46e5';
              e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <span style={styles.separator}>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            style={styles.dateInput}
            onFocus={(e) => {
              e.target.style.borderColor = '#4f46e5';
              e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};