const express = require('express');
const { Comanda, Item, Usuario, Pedido } = require('../models'); 
const router = express.Router();
const { vendas } = require('../controllers/relatorioController');

router.get('/vendas', vendas);

module.exports = router;