const Usuario = require('./Usuario');
const Item = require('./Item');
const Comanda = require('./Comanda');
const Pedido = require('./Pedido');

Usuario.hasMany(Comanda);
Comanda.belongsTo(Usuario);

Comanda.hasMany(Pedido);
Pedido.belongsTo(Comanda);

Pedido.belongsTo(Item);

module.exports = { Usuario, Item, Comanda, Pedido };