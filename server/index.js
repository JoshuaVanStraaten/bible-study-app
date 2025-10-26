import express from 'express';
import cors from 'cors';
import pool from './db.js';
import dotenv from 'dotenv';

// Import routes
import bibleRoutes from './routes/bible.js';
import authRoutes from './routes/auth.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware - Updated CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/bible', bibleRoutes);
app.use('/api/auth', authRoutes);

// Test routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Database connected!',
      time: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
