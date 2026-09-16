import bcrypt from "bcrypt";
import pool from "../db/index.js";

async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({
      error: {
        code: "USERNAME_REQUIRED",
        message: "Username field cannot be empty!",
      },
    });
  }

  if (!email) {
    return res.status(400).json({
      error: {
        code: "EMAIL_REQUIRED",
        message: "Email field cannot be empty!",
      },
    });
  }

  if (!password) {
    return res.status(400).json({
      error: {
        code: "PASSWORD_REQUIRED",
        message: "Password field cannot be empty!",
      },
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
   VALUES ($1, $2, $3)
   RETURNING id, username, email, created_at`,
      [username, email, passwordHash],
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      if (error.constraint === "users_username_key") {
        return res.status(409).json({
          error: {
            code: "USERNAME_ALREADY_EXISTS",
            message: "Username already exists!",
          },
        });
      }
      if (error.constraint === "users_email_key") {
        return res.status(409).json({
          error: {
            code: "EMAIL_ALREADY_EXISTS",
            message: "Email already exists!",
          },
        });
      }
    }
    console.error(error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function login(req, res) {
  const { identifier, password } = req.body;

  if (!identifier) {
    return res.status(400).json({
      error: {
        code: "IDENTIFIER_REQUIRED",
        message: "Identifier field cannot be empty!",
      },
    });
  }

  if (!password) {
    return res.status(400).json({
      error: {
        code: "PASSWORD_REQUIRED",
        message: "Password field cannot be empty!",
      },
    });
  }

  try {
    const result = await pool.query(
      "SELECT id,username,email,password_hash FROM users WHERE username = $1 OR email = $1",
      [identifier],
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid username/email or password",
        },
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid username/email or password",
        },
      });
    }

    req.session.userId = user.id;

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function getCurrentUser(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({
      error: {
        code: "NOT_AUTHENTICATED",
        message: "User is not authenticated",
      },
    });
  }

  try {
    const result = await pool.query(
      "SELECT id,username,email,created_at FROM users WHERE id = $1",
      [userId],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found!",
        },
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

function logout(req, res) {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        },
      });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({
      message: "Logout successful",
    });
  });
}

export { register, login, getCurrentUser, logout };
