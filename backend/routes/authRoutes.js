// authRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");

// Middleware to check if the user is authenticated
const authenticateJWT = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Auth Error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired, please log in again." });
    }
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};

// Endpoint de connexion
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.execute(
      "SELECT * FROM users JOIN profile ON users.id_users = profile.id_users WHERE username_users = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, user.password_users);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id_users,
        role: user.role_profile,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id_users,
        prenom_profile: user.prenom_profile,
        nom_profile: user.nom_profile,
        role: user.role_profile,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint pour la page d'accueil
router.get("/homepage", authenticateJWT, (req, res) => {
  res.json({ message: "Welcome to the homepage!" });
});

module.exports = router;
