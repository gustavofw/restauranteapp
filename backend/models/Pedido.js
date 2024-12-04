const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Pedido = sequelize.define('Pedido', {
  quantidade: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  status: { 
    type: DataTypes.ENUM('pendente', 'pronto'), 
    defaultValue: 'pendente' 
  },
});

Pedido.associate = (models) => {
  Pedido.belongsTo(models.Comanda, { 
    foreignKey: 'ComandaId', 
    allowNull: false 
  });

  Pedido.belongsTo(models.Item, { 
    foreignKey: 'ItemId', 
    allowNull: false 
  });
};

module.exports = Pedido;
