const express = require('express');
const { relatorioVenda } = require('../controllers/relatorioController'); 

const router = express.Router();

router.get('/vendas/:comandaId', relatorioVenda); 

module.exports = router;