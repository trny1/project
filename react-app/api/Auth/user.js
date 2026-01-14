import { pool } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await pool.query(
      'SELECT id, username FROM users ORDER BY username ASC'
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to fetch users.' });
  }
}
