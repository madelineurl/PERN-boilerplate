const Sequelize = require("sequelize");
const db = new Sequelize('postgres://localhost:5432/year-one-api', {
  logging: false
});

const Movie = db.define('movie', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  thumbsUp: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  thumbsDown: {
    type: Sequelize.STRING,
    validate: {
      min: 0
    }
  }
});

module.exports = {
  db, Movie
};
