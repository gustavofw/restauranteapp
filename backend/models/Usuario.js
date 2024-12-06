const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Usuario = sequelize.define('Usuario', {
  nome: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false 
  },
  senha: { 
    type: DataTypes.STRING, 
    allowNull: false
  },
},
{defaultScope: {
  attributes: {
    exclude: ["senha"]
}}
});

Usuario.associate = (models) => {
  Usuario.hasMany(models.Comanda, { 
    foreignKey: 'UsuarioId', 
    onDelete: 'CASCADE' 
  });
};

module.exports = Usuario;
