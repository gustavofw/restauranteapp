const express = require('express');
const sequelize = require('./config/config');
const Usuario = require('./models/Usuario');
const Item = require('./models/Item');
const Comanda = require('./models/Comanda');
const Pedido = require('./models/Pedido');

const usuarioRoutes = require('./routes/usuario');
const itemRoutes = require('./routes/item');

Usuario.hasMany(Comanda);
Comanda.belongsTo(Usuario);
Comanda.hasMany(Pedido);
Pedido.belongsTo(Comanda);
Pedido.belongsTo(Item);

const app = express();
app.use(express.json());

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
}).catch((err) => console.error('Erro ao sincronizar o banco de dados:', err));

app.use('/usuarios', usuarioRoutes);
app.use('/itens', itemRoutes);

// Adicione outras rotas aqui conforme necessário

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));