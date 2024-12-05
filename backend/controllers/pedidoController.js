const { Pedido, Comanda, Item } = require('../models');

const adicionarPedido = async (req, res) => {
  try {
    const { comandaId, itemId, quantidade } = req.body;
    const pedido = await Pedido.create({ ComandaId: comandaId, ItemId: itemId, quantidade });
    res.status(201).json(pedido)({
    mensagem: `Pedido #${pedido.id} foi enviado para a produção.`,
      pedido,
    });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar pedido!' });
  }
};

const listarPedidosPorComanda = async (req, res) => {
  try {
    const { comandaId } = req.params;
    const pedidos = await Pedido.findAll({
      where: { ComandaId: comandaId },
      include: {
        model: Item,
        attributes: ['id', 'nome', 'categoria'],
      },
    });

    const copaPedidos = pedidos.filter(pedido => pedido.Item.categoria === 'bebida');
    const cozinhaPedidos = pedidos.filter(pedido => pedido.Item.categoria === 'prato');

    res.status(200).json({ copa: copaPedidos, cozinha: cozinhaPedidos });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pedidos!' });
  }
};

module.exports = { adicionarPedido, listarPedidosPorComanda };