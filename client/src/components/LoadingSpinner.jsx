import { motion } from 'framer-motion';

function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = {
    sm: '30px',
    md: '40px',
    lg: '60px'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '2rem'
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          border: '3px solid rgba(102, 126, 234, 0.2)',
          borderTop: '3px solid #667eea',
          borderRadius: '50%',
          width: sizes[size],
          height: sizes[size]
        }}
      />
      {text && (
        <p style={{
          color: '#718096',
          fontSize: '0.95rem',
          textAlign: 'center'
        }}>
          {text}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
