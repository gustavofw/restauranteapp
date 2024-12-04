const Usuario = require('./Usuario');
const Comanda = require('./Comanda');
const Pedido = require('./Pedido');
const Item = require('./Item');

const models = { Usuario, Comanda, Pedido, Item };

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
