const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Pedido = sequelize.define('Pedido', {
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pendente', 'producao', 'entregue'), allowNull: false },
});

Pedido.associate = (models) => {
  Pedido.belongsTo(models.Comanda);
  Pedido.belongsTo(models.Item);
};

module.exports = Pedido;