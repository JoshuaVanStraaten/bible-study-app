import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

function ReadingView() {
  const { book, chapter } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchChapter();
  }, [book, chapter]);

  const fetchChapter = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowExplanation(false);
      const response = await axios.get(`/api/bible/chapter/${book}/${chapter}`);
      setData(response.data);
    } catch (err) {
      setError('Failed to load chapter. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextChapter = () => {
    const nextChapter = parseInt(chapter) + 1;
    navigate(`/read/${book}/${nextChapter}`);
  };

  const handlePreviousChapter = () => {
    const prevChapter = parseInt(chapter) - 1;
    if (prevChapter > 0) {
      navigate(`/read/${book}/${prevChapter}`);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '3rem',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <LoadingSpinner size="lg" />
          <p style={{
            textAlign: 'center',
            color: '#4A5568',
            marginTop: '1rem',
            fontSize: '1rem'
          }}>
            Loading {book} {chapter}...
          </p>
          <p style={{
            textAlign: 'center',
            color: '#718096',
            fontSize: '0.9rem',
            marginTop: '0.5rem'
          }}>
            Generating AI explanation
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '3rem',
            borderRadius: '1.5rem',
            textAlign: 'center',
            maxWidth: '500px'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
          <h2 style={{ color: '#2D3748', marginBottom: '1rem' }}>{error}</h2>
          <Button onClick={() => navigate('/select')} variant="primary">
            Back to Selection
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '85vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}
      >
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: 0,
            color: '#2D3748',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 800
          }}>
            {data.reference}
          </h1>
        </div>

        {/* Bible Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '2.5rem',
            borderRadius: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <div style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '2',
            fontSize: '1.1rem',
            color: '#2D3748',
            fontFamily: 'Georgia, serif'
          }}>
            {data.text}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          {parseInt(chapter) > 1 && (
            <Button
              onClick={handlePreviousChapter}
              variant="secondary"
              icon="◀️"
            >
              Previous
            </Button>
          )}

          <Button
            onClick={() => setShowExplanation(!showExplanation)}
            variant={showExplanation ? "secondary" : "primary"}
            icon={showExplanation ? "📖" : "✨"}
          >
            {showExplanation ? 'Hide Explanation' : 'Explain This Chapter'}
          </Button>

          <Button
            onClick={handleNextChapter}
            variant="secondary"
            icon="▶️"
          >
            Next Chapter
          </Button>
        </motion.div>

        {/* AI Explanation with Animation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '2.5rem',
                borderRadius: '1.5rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                overflow: 'hidden'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid #EDF2F7'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem'
                }}>
                  🤖
                </div>
                <h2 style={{
                  margin: 0,
                  color: '#2D3748',
                  fontSize: '1.5rem',
                  fontWeight: 700
                }}>
                  AI-Generated Explanation
                </h2>
              </div>
              <div className="markdown-content" style={{
                fontSize: '1.05rem',
                color: '#2D3748'
              }}>
                <ReactMarkdown>{data.explanation}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Selection Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}
        >
          <button
            onClick={() => navigate('/select')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '0.5rem'
            }}
          >
            ← Back to Chapter Selection
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ReadingView;
