import express from 'express';
import { getChapterWithExplanation, markChapterAsRead, getUserProgress, getLastRead } from '../controllers/bibleController.js';
import { authMiddleware, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get chapter with explanation (works for both guest and authenticated users)
router.get('/chapter/:book/:chapter', optionalAuth, getChapterWithExplanation);

// Mark chapter as read (requires authentication)
router.post('/progress', authMiddleware, markChapterAsRead);

// Get user progress (requires authentication)
router.get('/progress', authMiddleware, getUserProgress);

// Get last read chapter (requires authentication)
router.get('/last-read', authMiddleware, getLastRead);

export default router;
