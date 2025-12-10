import React, { useState, CSSProperties } from 'react';
import { UserPreferences } from '../types';

interface UserPreferencesFormProps {
  onSave: (preferences: UserPreferences) => Promise<boolean>;
  loading?: boolean;
}

const CATEGORIES = [
  'business', 'entertainment', 'environment', 'food', 'health',
  'politics', 'science', 'sports', 'technology', 'world'
];

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#111827',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '24px',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  label: {
    fontSize: '16px',
    color: '#374151',
    cursor: 'pointer',
    textTransform: 'capitalize',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  saveButton: {
    backgroundColor: '#5474cbff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  saveButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    marginTop: '8px',
  },
};

export const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({ onSave, loading }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        if (prev.length >= 5) {
          setError('You can select a maximum of 5 categories');
          return prev;
        }
        return [...prev, category];
      }
    });
    if (!selectedCategories.includes(category) && selectedCategories.length < 5) {
      setError('');
    }
  };

  const handleSave = async () => {
    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setSaving(true);
    const success = await onSave({ categories: selectedCategories });
    if (!success) {
      setError('Failed to save preferences. Please try again.');
    }
    setSaving(false);
  };

  const isDisabled = loading || saving || selectedCategories.length === 0;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Welcome! Let's personalize your news dashboard</h2>
        <p style={styles.subtitle}>
          Select the news categories you're interested in (up to 5):
        </p>
        <p style={{ ...styles.subtitle, marginBottom: '16px', fontSize: '14px' }}>
          Selected: {selectedCategories.length}/5
        </p>

        <div style={styles.categoriesGrid}>
          {CATEGORIES.map(category => (
            <div key={category} style={styles.categoryItem}>
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                style={styles.checkbox}
                disabled={loading || saving || (selectedCategories.length >= 5 && !selectedCategories.includes(category))}
              />
              <label htmlFor={category} style={styles.label}>
                {category}
              </label>
            </div>
          ))}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.buttonContainer}>
          <button
            onClick={handleSave}
            style={{
              ...styles.saveButton,
              ...(isDisabled ? styles.saveButtonDisabled : {}),
            }}
            disabled={isDisabled}
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};