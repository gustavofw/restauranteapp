const express = require('express');
const { adicionarPedido, listarPedidosPorComanda, listarPedidos } = require('../controllers/pedidoController');

const router = express.Router();


router.post('/', adicionarPedido);
router.get('/', listarPedidos);
router.get('/:comanda', listarPedidosPorComanda);


module.exports = router;
