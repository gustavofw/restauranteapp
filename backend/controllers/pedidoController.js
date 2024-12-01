const { Pedido, Comanda, Item } = require('../models');

const adicionarPedido = async (req, res) => {
  try {
    const { comandaId, itemId, quantidade } = req.body;
    const pedido = await Pedido.create({ ComandaId: comandaId, ItemId: itemId, quantidade });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar pedido!' });
  }
};

const listarPedidosPorComanda = async (req, res) => {
  try {
    const { comandaId } = req.params;
    const pedidos = await Pedido.findAll({ where: { ComandaId: comandaId }, include: Item });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pedidos!' });
  }
};

module.exports = { adicionarPedido, listarPedidosPorComanda };