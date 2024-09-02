// backend/controllers/authController.js
const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await db.execute(
      "SELECT * FROM users WHERE username_users = ?",
      [username]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user[0].password_users
    );

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user[0].id_users }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Nouveau point de terminaison pour renouveler le token
exports.renewToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    // Vérifie si le token est valide
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Crée un nouveau token avec les mêmes données
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: newToken });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
