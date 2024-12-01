const { Comanda, Pedido, Item } = require('../models');

const abrirComanda = async (req, res) => {
  try {
    const { usuarioId } = req.body;
    const comanda = await Comanda.create({ UsuarioId: usuarioId });
    res.status(201).json(comanda);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao abrir comanda!' });
  }
};

const fecharComanda = async (req, res) => {
  try {
    const { id } = req.params;
    const comanda = await Comanda.findByPk(id);
    if (!comanda) return res.status(404).json({ error: 'Comanda não encontrada!' });

    comanda.aberta = false;
    await comanda.save();

    const pedidos = await Pedido.findAll({ where: { ComandaId: id } });
    const total = pedidos.reduce((sum, pedido) => sum + pedido.quantidade * pedido.Item.preco, 0);
    res.status(200).json({ message: 'Comanda fechada!', total });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao fechar comanda!' });
  }
};

module.exports = { abrirComanda, fecharComanda };