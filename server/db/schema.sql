--- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--- Reading progress table
CREATE TABLE reading_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book VARCHAR(50) NOT NULL,
    chapter INTEGER NOT NULL,
    read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book, chapter)
);

--- Cached explanations table
CREATE TABLE cached_explanations (
    id SERIAL PRIMARY KEY,
    book VARCHAR(50) NOT NULL,
    chapter INTEGER NOT NULL,
    verse_number INTEGER,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book, chapter, verse_number)
);

--- Index for faster queries
CREATE INDEX idx_reading_progress_user ON reading_progress(user_id);
CREATE INDEX idx_cached_explanations_lookup ON cached_explanations(book, chapter);
