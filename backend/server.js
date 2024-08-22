const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database");
});

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", clientRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
