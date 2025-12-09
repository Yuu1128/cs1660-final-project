import React, { useState, CSSProperties } from 'react';
import { post } from 'aws-amplify/api';

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '30px'
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: '#fff'
  },
  categoryItemSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD'
  },
  checkbox: {
    marginRight: '12px',
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  categoryLabel: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    cursor: 'pointer',
    userSelect: 'none',
    textTransform: 'capitalize'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  skipButton: {
    backgroundColor: '#f5f5f5',
    color: '#666'
  },
  submitButton: {
    backgroundColor: '#2196F3',
    color: 'white'
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  },
  error: {
    color: '#f44336',
    marginBottom: '15px',
    fontSize: '14px'
  }
};

const CATEGORIES = [
  'business', 'entertainment', 'environment', 'food', 'health',
  'politics', 'science', 'sports', 'technology', 'world'
];

interface UserPreferencesProps {
  userId: string;
  onComplete: (preferences: { categories: string[] }) => void;
  onSkip?: () => void;
}

export const UserPreferences: React.FC<UserPreferencesProps> = ({ userId, onComplete, onSkip }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const restOperation = post({
        apiName: 'NewsDashboardAPI',
        path: '/user-preferences',
        options: {
          body: {
            userId,
            preferences: {
              categories: selectedCategories
            }
          }
        }
      });

      await restOperation.response;
      onComplete({ categories: selectedCategories });
    } catch (err) {
      console.error('Failed to save preferences:', err);
      setError('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h2 style={styles.title}>Welcome! Let's personalize your news</h2>
        <p style={styles.subtitle}>
          Select your interests to get news that matters to you
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.categoriesGrid}>
          {CATEGORIES.map(category => (
            <div
              key={category}
              style={{
                ...styles.categoryItem,
                ...(selectedCategories.includes(category) ? styles.categoryItemSelected : {})
              }}
              onClick={() => handleCategoryToggle(category)}
            >
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                onClick={(e) => e.stopPropagation()}
              />
              <div style={styles.categoryLabel}>{category}</div>
            </div>
          ))}
        </div>

        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.skipButton }}
            onClick={handleSkip}
            disabled={loading}
          >
            Skip for now
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.submitButton,
              ...(selectedCategories.length === 0 || loading ? styles.submitButtonDisabled : {})
            }}
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0 || loading}
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};