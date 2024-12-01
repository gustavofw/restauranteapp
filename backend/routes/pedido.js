const express = require('express');
const { adicionarPedido, listarPedidosPorComanda } = require('../controllers/pedidoController');

const router = express.Router();

router.post('/', adicionarPedido);
router.get('/:comandaId', listarPedidosPorComanda);

module.exports = router;
