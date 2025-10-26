import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// List of Bible books (Old Testament for now)
const BIBLE_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs'
];

// Number of chapters per book
const CHAPTERS = {
  'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36,
  'Deuteronomy': 34, 'Joshua': 24, 'Judges': 21, 'Ruth': 4,
  '1 Samuel': 31, '2 Samuel': 24, '1 Kings': 22, '2 Kings': 25,
  '1 Chronicles': 29, '2 Chronicles': 36, 'Ezra': 10, 'Nehemiah': 13,
  'Esther': 10, 'Job': 42, 'Psalms': 150, 'Proverbs': 31
};

function ChapterSelection() {
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [lastRead, setLastRead] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLastRead();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchLastRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/bible/last-read`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        setLastRead(response.data);
      }
    } catch (error) {
      console.error('Error fetching last read:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartReading = () => {
    if (selectedBook && selectedChapter) {
      navigate(`/read/${selectedBook}/${selectedChapter}`);
    }
  };

  const handleContinueReading = () => {
    if (lastRead) {
      navigate(`/read/${lastRead.book}/${lastRead.chapter}`);
    }
  };

  const chapters = selectedBook ? Array.from({ length: CHAPTERS[selectedBook] }, (_, i) => i + 1) : [];

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <LoadingSpinner size="lg" text="Loading your progress..." />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '85vh',
      padding: '3rem 2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}
      >
        <h1 style={{
          textAlign: 'center',
          marginBottom: '3rem',
          color: 'white',
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 800
        }}>
          Choose Your Chapter
        </h1>

        {/* Continue Reading Section */}
        {user && lastRead && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📖
              </div>
              <div>
                <p style={{
                  margin: 0,
                  color: '#718096',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  Continue where you left off
                </p>
                <h3 style={{
                  margin: '0.25rem 0 0 0',
                  color: '#2D3748',
                  fontSize: '1.3rem',
                  fontWeight: 700
                }}>
                  {lastRead.book} {lastRead.chapter}
                </h3>
              </div>
            </div>
            <Button
              onClick={handleContinueReading}
              variant="primary"
              fullWidth
              icon="▶️"
            >
              Continue Reading
            </Button>
          </motion.div>
        )}

        {/* Book Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <label style={{
            display: 'block',
            marginBottom: '0.75rem',
            color: '#2D3748',
            fontWeight: 600,
            fontSize: '1rem'
          }}>
            Select a Book
          </label>
          <select
            value={selectedBook}
            onChange={(e) => {
              setSelectedBook(e.target.value);
              setSelectedChapter('');
            }}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              backgroundColor: '#F7FAFC',
              border: '2px solid #E2E8F0',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              color: '#2D3748',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea';
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#E2E8F0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Choose a Book</option>
            {BIBLE_BOOKS.map(book => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>

          {/* Chapter Selection */}
          {selectedBook && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '1.5rem' }}
            >
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#2D3748',
                fontWeight: 600,
                fontSize: '1rem'
              }}>
                Select a Chapter
              </label>
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  backgroundColor: '#F7FAFC',
                  border: '2px solid #E2E8F0',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  color: '#2D3748',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E2E8F0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Select a Chapter</option>
                {chapters.map(ch => (
                  <option key={ch} value={ch}>Chapter {ch}</option>
                ))}
              </select>

              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#EDF2F7',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📚</span>
                <p style={{ margin: 0, color: '#4A5568', fontSize: '0.9rem' }}>
                  {selectedBook} has {chapters.length} chapters
                </p>
              </div>
            </motion.div>
          )}

          {/* Start Reading Button */}
          <div style={{ marginTop: '1.5rem' }}>
            <Button
              onClick={handleStartReading}
              disabled={!selectedBook || !selectedChapter}
              variant="primary"
              fullWidth
              icon="🚀"
            >
              Start Reading
            </Button>
          </div>
        </motion.div>

        {/* Hint for guests */}
        {!user && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.95rem'
            }}
          >
            💡 <span style={{ fontWeight: 600 }}>Sign in</span> to track your reading progress
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default ChapterSelection;
