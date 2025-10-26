import pool from '../db.js';
import { getChapter } from '../services/esvApi.js';
import { generateExplanation } from '../services/geminiApi.js';

// Get a chapter with explanation
export async function getChapterWithExplanation(req, res) {
    const { book, chapter } = req.params;

    try {
        // First, check if we have a cached explanation
        const cachedQuery = await pool.query(
            'SELECT explanation FROM cached_explanations WHERE book = $1 AND chapter = $2 AND verse_number IS NULL',
            [book, chapter]
        );

        let explanation;

        if (cachedQuery.rows.length > 0) {
            // Use cached explanation
            explanation = cachedQuery.rows[0].explanation;
            console.log(`Using cached explanation for ${book} ${chapter}`);
        } else {
            // Generate new explanation
            console.log(`Generating new explanation for ${book} ${chapter}`);

            // Get the bible text
            const bibleData = await getChapter(book, chapter);

            // Generate explanation with Gemini
            explanation = await generateExplanation(book, chapter, bibleData.text);

            // cache the explanation
            await pool.query(
                'INSERT INTO cached_explanations (book, chapter, explanation) VALUES ($1, $2, $3)',
                [book, chapter, explanation]
            );
        }

        // Get the bible text
        const bibleData = await getChapter(book, chapter);

         // If user is authenticated, mark as read automatically
        if (req.user) {
            console.log(`User ${req.user.userId} reading ${book} ${chapter}`);
            await pool.query(
                'INSERT INTO reading_progress (user_id, book, chapter) VALUES ($1, $2, $3) ON CONFLICT (user_id, book, chapter) DO UPDATE SET read_at = CURRENT_TIMESTAMP',
                [req.user.userId, book, chapter]
        );
            console.log(`Progress saved for user ${req.user.userId}`);
        } else {
            console.log('No user authenticated - not saving progress');
        }

        res.json({
            ...bibleData,
            explanation
        });
    } catch (error) {
        console.error('Error in getChapterWithExplanation: ', error);
        res.status(500).json({error: error.message});
    }
}

// Mark chapter as read (for logged-in users)
export async function markChapterAsRead(req, res) {
    const { userId } = req.user; // From auth middleware
    const { book, chapter } = req.body;

    try {
        await pool.query(
            'INSERT INTO reading_progress (user_id, book, chapter) VALUES ($1, $2, $3) ON CONFLICT (user_id, book, chapter) DO NOTHING',
            [userId, book, chapter]
        );

        res.json({message: `Marked ${book} ${chapter} as read for user ${userId}`});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Get user's reading progress
export async function getUserProgress(req, res) {
    const { userId } = req.user;

    try {
        const result = await pool.query(
        'SELECT book, chapter, read_at FROM reading_progress WHERE user_id = $1 ORDER BY read_at DESC LIMIT 10',
        [userId]
        );

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get last read chapter (for "Continue where you left off")
export async function getLastRead(req, res) {
    const { userId } = req.user;

    try {
        console.log(`Fetching last read for user ${userId}`);
        const result = await pool.query(
        'SELECT book, chapter FROM reading_progress WHERE user_id = $1 ORDER BY read_at DESC LIMIT 1',
        [userId]
        );

        console.log(`Last read result:`, result.rows);

        if (result.rows.length > 0) {
        res.json(result.rows[0]);
        } else {
        res.json(null);
        }
    } catch (error) {
        console.error('Error fetching last read:', error);
        res.status(500).json({ error: error.message });
    }
}
