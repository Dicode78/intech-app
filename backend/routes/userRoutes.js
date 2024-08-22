const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const router = express.Router();

// Middleware pour vérifier le token JWT
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
    res.status(500).send({ message: "Invalid Token" });
  }
};

const checkAdminRole = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// Récupérer tous les utilisateurs (accessible uniquement aux administrateurs)
router.get("/users", authenticateJWT, checkAdminRole, async (req, res) => {
  console.log("GET /users called");
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [users] = await connection.execute(
      "SELECT * FROM users JOIN profile ON users.id_users = profile.id_users"
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ajouter un utilisateur (accessible uniquement aux administrateurs)
router.post("/users", authenticateJWT, checkAdminRole, async (req, res) => {
  const {
    username_users,
    password_users,
    societe_profile,
    nom_profile,
    prenom_profile,
    role_profile,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password_users, 10);
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const upperSocieteProfile = societe_profile.toUpperCase();
    const upperNomProfile = nom_profile.toUpperCase();
    const formattedPrenomProfile =
      prenom_profile.charAt(0).toUpperCase() +
      prenom_profile.slice(1).toLowerCase();

    const [result] = await connection.execute(
      "INSERT INTO users (username_users, password_users) VALUES (?, ?)",
      [username_users, hashedPassword]
    );

    const userId = result.insertId;

    await connection.execute(
      "INSERT INTO profile (id_users, societe_profile, nom_profile, prenom_profile, role_profile) VALUES (?, ?, ?, ?, ?)",
      [
        userId,
        upperSocieteProfile,
        upperNomProfile,
        formattedPrenomProfile,
        role_profile,
      ]
    );

    res.json({
      id_users: userId,
      username_users,
      societe_profile: upperSocieteProfile,
      nom_profile: upperNomProfile,
      prenom_profile: formattedPrenomProfile,
      role_profile,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Supprimer un utilisateur (accessible uniquement aux administrateurs)
router.delete(
  "/users/:id",
  authenticateJWT,
  checkAdminRole,
  async (req, res) => {
    const { id } = req.params;

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      await connection.execute("DELETE FROM profile WHERE id_users = ?", [id]);
      await connection.execute("DELETE FROM users WHERE id_users = ?", [id]);

      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Mettre à jour un utilisateur (accessible uniquement aux administrateurs)
router.put("/users/:id", authenticateJWT, checkAdminRole, async (req, res) => {
  const { id } = req.params;
  const {
    username_users,
    password_users,
    societe_profile,
    nom_profile,
    prenom_profile,
    role_profile,
  } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const updateUserQuery = password_users
      ? "UPDATE users SET username_users = ?, password_users = ? WHERE id_users = ?"
      : "UPDATE users SET username_users = ? WHERE id_users = ?";

    const userParams = password_users
      ? [username_users, await bcrypt.hash(password_users, 10), id]
      : [username_users, id];

    await connection.execute(updateUserQuery, userParams);

    await connection.execute(
      "UPDATE profile SET societe_profile = ?, nom_profile = ?, prenom_profile = ?, role_profile = ? WHERE id_users = ?",
      [
        societe_profile.toUpperCase(),
        nom_profile.toUpperCase(),
        prenom_profile.charAt(0).toUpperCase() +
          prenom_profile.slice(1).toLowerCase(),
        role_profile,
        id,
      ]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
