import express from "express";
import pool from "./db/index.js";
import session from "express-session";
import authRouter from "./routes/authRoutes.js";
import repoRouter from "./routes/repoRoutes.js";

const app = express();
const port = 3000;

app.use(express.json()); // used in order to read/parse json data from react front-end

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // when in development it should be false cause of localhost, in production it must be true
      sameSite: "lax",
    },
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/repos", repoRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const result = await pool.query("SELECT NOW()");
console.log(result.rows[0]);

app.listen(port, () => {
  console.log("server running on port:", port);
});
