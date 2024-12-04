const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Comanda = sequelize.define('Comanda', {
  status: {
    type: DataTypes.ENUM('aberta', 'fechada'),
    allowNull: false,
    defaultValue: 'aberta',
  },
  data_abertura: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  data_fechamento: { 
    type: DataTypes.DATE 
  },
});

Comanda.associate = (models) => {
  Comanda.belongsTo(models.Usuario, { 
    foreignKey: 'UsuarioId', 
    allowNull: false 
  });

  Comanda.hasMany(models.Pedido, { 
    foreignKey: 'ComandaId', 
    onDelete: 'CASCADE' 
  });
};

module.exports = Comanda;
