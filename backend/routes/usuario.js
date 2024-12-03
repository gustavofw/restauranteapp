const express = require('express');
const { cadastrarUsuario, listarUsuarios, loginUsuario } = require('../controllers/usuarioController');

const router = express.Router();

router.post('/cadastrar', cadastrarUsuario);
router.get('/', listarUsuarios);
router.post('/login', loginUsuario);

module.exports = router;