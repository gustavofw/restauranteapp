const express = require('express');
const router = express.Router();
const { cadastrarItem, listarItens} = require('../controllers/itemController');

router.post('/cadastrar', cadastrarItem);
router.get('/', listarItens);


module.exports = router;