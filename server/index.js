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

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bible', bibleRoutes);
app.use('/api/auth', authRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({message: 'Backend is running!'});
});

// Database test route
app.get('/api/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            message: 'Database connected!',
            time: result.rows[0].now
        });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
