import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/select');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '85vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '3rem',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
          <h1 style={{
            margin: 0,
            marginBottom: '0.5rem',
            color: '#2D3748',
            fontSize: '2rem',
            fontWeight: 800
          }}>
            Welcome Back
          </h1>
          <p style={{
            margin: 0,
            color: '#718096',
            fontSize: '1rem'
          }}>
            Sign in to continue your Bible study journey
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              backgroundColor: '#FFF5F5',
              color: '#C53030',
              padding: '1rem',
              borderRadius: '0.75rem',
              marginBottom: '1.5rem',
              border: '1px solid #FEB2B2',
              fontSize: '0.95rem'
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2D3748',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                borderRadius: '0.75rem',
                border: '2px solid #E2E8F0',
                backgroundColor: '#F7FAFC',
                color: '#2D3748',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E2E8F0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#2D3748',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '1rem',
                borderRadius: '0.75rem',
                border: '2px solid #E2E8F0',
                backgroundColor: '#F7FAFC',
                color: '#2D3748',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E2E8F0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            fullWidth
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <p style={{
            textAlign: 'center',
            margin: '1.5rem 0 0 0',
            color: '#718096',
            fontSize: '0.95rem'
          }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                color: '#667eea',
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Create one
            </Link>
          </p>
        </form>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '2rem',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}
      >
        No account needed to browse • Create one to track progress
      </motion.p>
    </div>
  );
}

export default Login;
