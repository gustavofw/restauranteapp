const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Item = sequelize.define('Item', {
  nome: { type: DataTypes.STRING, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  tipo: { type: DataTypes.ENUM('bebida', 'prato'), allowNull: false },
});

module.exports = Item;