import { Router } from "express";
import { pool } from "../config/db.js";

const router = Router();

// GET /api/items -> list semua item game
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM game_items ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: err.message });
  }
});

// GET /api/items/:id -> detail item game
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM game_items WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Item tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: err.message });
  }
});

// POST /api/items -> tambah item game
router.post("/", async (req, res) => {
  const { item_name, game, price, quantity, trader_name } = req.body;
  if (!item_name || !game || !price || quantity === undefined || !trader_name) {
    return res.status(400).json({ message: "item_name, game, price, quantity, trader_name wajib diisi" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO game_items (item_name, game, price, quantity, trader_name) VALUES (?, ?, ?, ?, ?)",
      [item_name, game, price, quantity, trader_name]
    );
    const [rows] = await pool.query("SELECT * FROM game_items WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menambah data", error: err.message });
  }
});

// PUT /api/items/:id -> update item game
router.put("/:id", async (req, res) => {
  const { item_name, game, price, quantity, trader_name } = req.body;
  try {
    const [exists] = await pool.query("SELECT * FROM game_items WHERE id = ?", [
      req.params.id,
    ]);
    if (exists.length === 0)
      return res.status(404).json({ message: "Item tidak ditemukan" });

    await pool.query(
      "UPDATE game_items SET item_name = ?, game = ?, price = ?, quantity = ?, trader_name = ? WHERE id = ?",
      [
        item_name ?? exists[0].item_name,
        game ?? exists[0].game,
        price ?? exists[0].price,
        quantity ?? exists[0].quantity,
        trader_name ?? exists[0].trader_name,
        req.params.id,
      ]
    );
    const [rows] = await pool.query("SELECT * FROM game_items WHERE id = ?", [
      req.params.id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui data", error: err.message });
  }
});

// DELETE /api/items/:id -> hapus item game
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM game_items WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Item tidak ditemukan" });
    res.json({ message: "Berhasil menghapus item" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal menghapus data", error: err.message });
  }
});

export default router;