import express from "express";
import pool from "./db/index.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
const port = 3000;

app.use(express.json()); // used in order to read/parse json data from react front-end

app.use("/api/auth", authRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const result = await pool.query("SELECT NOW()");
console.log(result.rows[0]);

app.listen(port, () => {
  console.log("server running on port:", port);
});
