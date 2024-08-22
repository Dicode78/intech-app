// backend/addUser.js

require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const addUser = async (username, password) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      "INSERT INTO users (username_users, password_users) VALUES (?, ?)",
      [username, hashedPassword]
    );

    console.log(`User ${username} added with hashed password`);
    await connection.end();
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

addUser("admin", "admin");
