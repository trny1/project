import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { felhasznaloNev, jelszo } = req.body;

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [felhasznaloNev]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Ez a felhasználónév már foglalt!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(jelszo, salt);

    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [felhasznaloNev, hashedPassword]
    );

    return res.status(201).json({ message: "Sikeres regisztráció!" });
  } catch (err) {
    console.error("Regisztrációs hiba:", err);
    return res.status(500).json({ message: "Szerver hiba történt a mentéskor." });
  }
}