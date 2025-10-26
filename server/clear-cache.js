import pool from './db.js';

async function clearCache() {
  try {
    await pool.query('DELETE FROM cached_explanations');
    console.log('✅ Cached explanations cleared!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearCache();
