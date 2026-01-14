import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { UserName, password } = req.body;

  try {
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [UserName]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'This username is already taken!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [UserName, hashedPassword]
    );

    return res.status(201).json({ message: 'Registration successful!' });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error occurred while saving.' });
  }
}
