const express = require('express');
const sequelize = require('./config/config');
const cors = require('cors');
const { Usuario, Item, Comanda, Pedido } = require('./models');

const usuarioRoutes = require('./routes/usuario');
const itemRoutes = require('./routes/item');
const comandaRoutes = require('./routes/comanda');
const pedidoRoutes = require('./routes/pedido');
const loginRoutes = require('./routes/login'); 


const app = express();
app.use(express.json());

app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use('/itens', itemRoutes);
app.use('/comandas', comandaRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/login', loginRoutes); 


app.get('/', (req, res) => {
  res.send('API de Restaurante está funcionando!');
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ${PORT}');
});