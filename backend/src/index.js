// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import itemsRouter from "./routes/items.js"; // jika sudah ada

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/", (_req, res) => res.send("API Game Trade OK"));

// Route
app.use("/api/auth", authRouter);
app.use("/api/items", itemsRouter); // opsional

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BE running at http://localhost:${PORT}`));
