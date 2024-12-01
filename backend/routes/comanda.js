const express = require('express');
const { abrirComanda, fecharComanda } = require('../controllers/comandaController');

const router = express.Router();

router.post('/', abrirComanda);
router.put('/:id/fechar', fecharComanda);

module.exports = router;
