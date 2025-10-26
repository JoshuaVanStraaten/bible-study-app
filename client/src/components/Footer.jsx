function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '1.5rem 2rem',
      marginTop: 'auto',
      textAlign: 'center',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)'
    }}>
      <p style={{
        margin: 0,
        color: '#718096',
        fontSize: '0.9rem'
      }}>
        © {currentYear} BibleStudy. Made with ❤️ for deeper understanding.
      </p>
    </footer>
  );
}

export default Footer;
