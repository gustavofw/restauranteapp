const { Model } = require('sequelize');
const { Pedido, Comanda, Item, Usuario } = require('../models');

const adicionarPedido = async (req, res) => {
  try {
    const { ComandaId, itemId, quantidade } = req.body;
    const pedido = await Pedido.create({ ComandaId: ComandaId, ItemId: itemId, quantidade });
    res.status(201).json(pedido)({
    mensagem: `Pedido #${pedido.id} foi enviado para a produção.`,
      pedido,
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar pedido!' });
  }
};

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include:{all:true,nested:true}
    });

    return res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    return res.status(500).json({ message: "Erro ao listar pedidos." });
  }
};

const listarPedidosPorComanda = async (req, res) => {
  try {
    let { comanda } = req.params;

    comanda = parseInt(comanda, 10);

    if (isNaN(comanda)) {
      return res.status(400).json({ error: 'ID da comanda inválido!' });
    }

    const pedidos = await Pedido.findAll({
      where: { ComandaId: comanda },
      include: {
        model: Item,
        attributes: ['id', 'nome', 'tipo'],
      },
    });

    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Erro ao listar pedidos por comanda:', error);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};


module.exports = { adicionarPedido, listarPedidosPorComanda, listarPedidos };