import { motion } from 'framer-motion';

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  type = 'button',
  icon = null
}) {
  const baseStyle = {
    padding: '0.875rem 2rem',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.3s ease'
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 4px 15px 0 rgba(102, 126, 234, 0.4)',
    },
    secondary: {
      background: 'white',
      color: '#667eea',
      border: '2px solid #667eea',
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.1)',
    },
    outline: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        ...baseStyle,
        ...variants[variant]
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}

export default Button;
