const express = require('express');
const sequelize = require('./config/config');
const { Usuario, Item, Comanda, Pedido } = require('./models');

const usuarioRoutes = require('./routes/usuario');
const itemRoutes = require('./routes/item');
const comandaRoutes = require('./routes/comanda');
const pedidoRoutes = require('./routes/pedido');

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/itens', itemRoutes);
app.use('/comandas', comandaRoutes);
app.use('/pedidos', pedidoRoutes);

sequelize.sync({ force: false })
  .then(() => console.log('Banco sincronizado!'))
  .catch(err => console.error('Erro ao sincronizar banco:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));