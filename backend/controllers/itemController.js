const { Item } = require('../models');

const cadastrarItem = async (req, res) => {
  try {
    const { nome, preco, tipo } = req.body;
    const item = await Item.create({ nome, preco, tipo });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar item!' });
  }
};

const listarItens = async (req, res) => {
  try {
    const itens = await Item.findAll();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar itens!' });
  }
};

module.exports = { cadastrarItem, listarItens };
