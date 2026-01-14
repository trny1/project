import { pool } from '../db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sender_id, sender_name, content } = req.body;

    if (!content || !sender_id) {
      return res.status(400).json({ hiba: "Üres üzenet nem küldhető!" });
    }

try {
  const result = await pool.query(
    'INSERT INTO messages (sender_id, sender_name, content) VALUES ($1, $2, $3) RETURNING *',
    [sender_id, sender_name, content]
  );
  return res.status(201).json(result.rows[0]);
} catch (error) {
  console.error("SQL HIBA RÉSZLETEI:", error.message); 
  return res.status(500).json({ hiba: "Adatbázis hiba: " + error.message });
}
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM messages ORDER BY created_at ASC');
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ hiba: "Lekérési hiba." });
    }
  }
}