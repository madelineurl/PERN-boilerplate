const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/YOUR_DB_HERE', {
  logging: false
});

module.exports = {
  db
};
