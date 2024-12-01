const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já está em uso!' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar usuário!' });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários!' });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas!' });
    }

    res.status(200).json({ message: 'Login realizado com sucesso!', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login!' });
  }
};

module.exports = { cadastrarUsuario, listarUsuarios, loginUsuario };