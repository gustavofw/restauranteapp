const express = require('express');
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }
    res.status(200).json({ message: 'Login bem-sucedido.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
});

module.exports = router;
