import pool from './db.js';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get the current file's path
const __filename = fileURLToPath(import.meta.url);
// Get the directory of the current file
const __dirname = dirname(__filename);

async function setupDatabase() {
    try {
        const schemaPath = join(__dirname, 'db', 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');

        await pool.query(schemaSQL);
        console.log('✅ Database tables created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();
