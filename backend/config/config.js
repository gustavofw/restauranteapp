const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('restaurantebd', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;