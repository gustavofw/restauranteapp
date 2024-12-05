const express = require('express');
const { abrirComanda, fecharComanda, listarComandas } = require('../controllers/comandaController');

const router = express.Router();

router.post('/', abrirComanda);
router.put('/:id/fechar', fecharComanda);
router.get('/', listarComandas);

module.exports = router;
