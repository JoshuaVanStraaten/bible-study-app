import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  // Get user initials from email
  const getUserInitials = (email) => {
    if (!email) return '?';
    const name = email.split('@')[0];
    return name.substring(0, 1).toUpperCase();
  };

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          📖 BibleStudy
        </motion.div>
      </Link>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <div style={{ position: 'relative' }}>
            {/* User Avatar Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {getUserInitials(user.email)}
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div
                    onClick={() => setShowDropdown(false)}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 99
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '55px',
                      right: 0,
                      background: 'white',
                      borderRadius: '1rem',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      padding: '0.5rem',
                      minWidth: '220px',
                      zIndex: 100
                    }}
                  >
                    {/* User Info Section */}
                    <div style={{
                      padding: '1rem',
                      borderBottom: '1px solid #E2E8F0',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.95rem',
                          fontWeight: 700
                        }}>
                          {getUserInitials(user.email)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            margin: 0,
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: '#2D3748',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {user.email.split('@')[0]}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '0.8rem',
                            color: '#718096',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <motion.button
                      whileHover={{ backgroundColor: '#F7FAFC' }}
                      onClick={() => {
                        navigate('/select');
                        setShowDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.95rem',
                        color: '#2D3748',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>📚</span>
                      <span style={{ fontWeight: 500 }}>My Reading</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ backgroundColor: '#FFF5F5' }}
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.95rem',
                        color: '#C53030',
                        transition: 'all 0.2s ease',
                        marginTop: '0.25rem'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>🚪</span>
                      <span style={{ fontWeight: 500 }}>Logout</span>
                    </motion.button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.5rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 600,
                boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
              }}
            >
              Sign In
            </motion.button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
