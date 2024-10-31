const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Comanda = sequelize.define('Comanda', {
  status: {
    type: DataTypes.ENUM('aberta', 'fechada'),
    allowNull: false,
  },
  data_abertura: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  data_fechamento: {
    type: DataTypes.DATE,
  },
});

Comanda.associate = (models) => {
    Comanda.belongsTo(models.Usuario);
    Comanda.hasMany(models.Pedido);
};

module.exports = Comanda;
