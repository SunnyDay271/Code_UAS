// routes/auth.js
import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Isi semua field" });

  try {
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "Email sudah digunakan" });

    const [insert] = await pool.query(
      "INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)",
      [name, email, password, avatar]
    );

    res.json({
      message: "Akun berhasil dibuat",
      user: { id: insert.insertId, name, email, avatar },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Isi email dan password" });

  try {
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    if (users.length === 0)
      return res.status(400).json({ message: "Email atau password salah" });

    const user = users[0];
    res.json({ message: "Login berhasil", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PROFILE
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, avatar FROM users WHERE id = ?",
      [id]
    );
    if (users.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });
    res.json(users[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
