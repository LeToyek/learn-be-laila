require("dotenv").config(); // Load .env variables
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USERNAME, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // disable logging
  }
);

module.exports = sequelize;
