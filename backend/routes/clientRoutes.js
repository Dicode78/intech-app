const express = require("express");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
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
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};

const checkAdminRole = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// Nouveau middleware pour vérifier le rôle
const verifyRole = (req, res, next) => {
  if (req.user.role === "Admin" || req.user.role === "Utilisateur") {
    return next(); // Autorise l'accès
  } else {
    return res
      .status(403)
      .json({ message: "Access forbidden: insufficient permissions" });
  }
};

// Récupérer toutes les entités clients
router.get("/clients", authenticateJWT, verifyRole, async (req, res) => {
  console.log("GET /clients called");
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [clients] = await connection.execute(
      `SELECT ec.*, ac.pays_adresse_clients, ac.region_adresse_clients, 
              ac.ville_adresse_clients, ac.code_postal_adresse_clients, 
              ac.voie_adresse_clients, ac.numero_adresse_clients 
       FROM entite_clients ec 
       LEFT JOIN adresse_clients ac ON ec.id_entite_clients = ac.id_entite_clients`
    );

    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/clients/:id", authenticateJWT, verifyRole, async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching client details for ID: ${id}`); // Ajout du log

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [clientData] = await connection.execute(
      `SELECT ec.*, ac.pays_adresse_clients, ac.region_adresse_clients, 
              ac.ville_adresse_clients, ac.code_postal_adresse_clients, 
              ac.voie_adresse_clients, ac.numero_adresse_clients 
       FROM entite_clients ec 
       LEFT JOIN adresse_clients ac ON ec.id_entite_clients = ac.id_entite_clients 
       WHERE ec.id_entite_clients = ?`,
      [id]
    );

    console.log("Client Data Retrieved:", clientData); // Ajout du log

    if (clientData.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(clientData[0]);
  } catch (error) {
    console.error("Error fetching client details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Ajouter une nouvelle entité client avec une adresse
router.post("/clients", authenticateJWT, verifyRole, async (req, res) => {
  const {
    societe_entite_clients,
    secteur_activite_entite_clients,
    sites_entite_clients,
    tel_entite_clients,
    pays_adresse_clients,
    region_adresse_clients,
    ville_adresse_clients,
    code_postal_adresse_clients,
    voie_adresse_clients,
    numero_adresse_clients,
  } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Remplacer les valeurs undefined par null
    const data = {
      societe_entite_clients: societe_entite_clients || null,
      secteur_activite_entite_clients: secteur_activite_entite_clients || null,
      sites_entite_clients: sites_entite_clients || null,
      tel_entite_clients: tel_entite_clients || null,
      pays_adresse_clients: pays_adresse_clients || null,
      region_adresse_clients: region_adresse_clients || null,
      ville_adresse_clients: ville_adresse_clients || null,
      code_postal_adresse_clients: code_postal_adresse_clients || null,
      voie_adresse_clients: voie_adresse_clients || null,
      numero_adresse_clients: numero_adresse_clients || null,
    };

    // Insérer les données dans la table entite_clients
    const [result] = await connection.execute(
      "INSERT INTO entite_clients (societe_entite_clients, secteur_activite_entite_clients, sites_entite_clients, tel_entite_clients) VALUES (?, ?, ?, ?)",
      [
        data.societe_entite_clients,
        data.secteur_activite_entite_clients,
        data.sites_entite_clients,
        data.tel_entite_clients,
      ]
    );

    const clientId = result.insertId;

    // Insérer les données dans la table adresse_clients
    await connection.execute(
      "INSERT INTO adresse_clients (id_entite_clients, pays_adresse_clients, region_adresse_clients, ville_adresse_clients, code_postal_adresse_clients, voie_adresse_clients, numero_adresse_clients) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        clientId,
        data.pays_adresse_clients,
        data.region_adresse_clients,
        data.ville_adresse_clients,
        data.code_postal_adresse_clients,
        data.voie_adresse_clients,
        data.numero_adresse_clients,
      ]
    );

    res.json({
      id_entite_clients: clientId,
      ...data,
    });
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Supprimer une entité client avec son adresse
router.delete("/clients/:id", authenticateJWT, verifyRole, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Supprimer les adresses associées
    await connection.execute(
      "DELETE FROM adresse_clients WHERE id_entite_clients = ?",
      [id]
    );

    // Supprimer l'entité client
    await connection.execute(
      "DELETE FROM entite_clients WHERE id_entite_clients = ?",
      [id]
    );

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Mettre à jour une entité client avec son adresse
router.put("/clients/:id", authenticateJWT, verifyRole, async (req, res) => {
  const { id } = req.params;
  const {
    societe_entite_clients,
    secteur_activite_entite_clients,
    sites_entite_clients,
    tel_entite_clients,
    pays_adresse_clients,
    region_adresse_clients,
    ville_adresse_clients,
    code_postal_adresse_clients,
    voie_adresse_clients,
    numero_adresse_clients,
  } = req.body;

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Mettre à jour l'entité client
    await connection.execute(
      "UPDATE entite_clients SET societe_entite_clients = ?, secteur_activite_entite_clients = ?, sites_entite_clients = ?, tel_entite_clients = ? WHERE id_entite_clients = ?",
      [
        societe_entite_clients,
        secteur_activite_entite_clients,
        sites_entite_clients,
        tel_entite_clients,
        id,
      ]
    );

    // Mettre à jour l'adresse du client
    await connection.execute(
      "UPDATE adresse_clients SET pays_adresse_clients = ?, region_adresse_clients = ?, ville_adresse_clients = ?, code_postal_adresse_clients = ?, voie_adresse_clients = ?, numero_adresse_clients = ? WHERE id_entite_clients = ?",
      [
        pays_adresse_clients,
        region_adresse_clients,
        ville_adresse_clients,
        code_postal_adresse_clients,
        voie_adresse_clients,
        numero_adresse_clients,
        id,
      ]
    );

    res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
