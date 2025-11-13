import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./routes/items.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check (opsional)
app.get("/", (_req, res) => res.send("API Game Trade OK"));

// Prefix API
app.use("/api/items", itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BE running http://localhost:${PORT}`));