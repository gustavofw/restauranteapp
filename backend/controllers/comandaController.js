const { Comanda, Pedido, Item } = require('../models');

const abrirComanda = async (req, res) => {
  const { usuarioId, pedidos } = req.body;

  try {
    if (!usuarioId) {
      return res.status(400).json({ error: 'Usuário é obrigatório!' });
    }

    const comanda = await Comanda.create({
      UsuarioId: usuarioId,
      status: 'aberta',
    });

    if (pedidos && pedidos.length > 0) {
      const pedidosCriados = await Promise.all(
        pedidos.map(async (pedido) => {
          const item = await Item.findByPk(pedido.itemId);
          if (!item) {
            throw new Error(`Item com ID ${pedido.itemId} não encontrado.`);
          }

          return Pedido.create({
            quantidade: pedido.quantidade,
            status: 'pendente',
            ComandaId: comanda.id,
            ItemId: pedido.itemId, 
          });
        })
      );
      comanda.Pedidos = pedidosCriados; 
    }

    res.status(201).json(comanda);
  } catch (error) {
    console.error('Erro ao abrir comanda:', error.message);
    res.status(500).json({ error: error.message || 'Erro ao abrir comanda!' });
  }
};

const fecharComanda = async (req, res) => {
  const { id } = req.params;

  try {
    const comanda = await Comanda.findByPk(id);
    if (!comanda) {
      return res.status(404).json({ error: 'Comanda não encontrada' });
    }

    if (comanda.status !== 'aberta') {
      return res.status(400).json({ error: 'Comanda já está fechada ou não está aberta' });
    }

    comanda.status = 'fechada';
    await comanda.save(); 

    res.status(200).json({
      message: 'Comanda fechada com sucesso!',
      comanda,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fechar comanda' });
  }
};

const listarComandas = async (req, res) => {
  try {
    const comandas = await Comanda.findAll({
      include: [{ model: Pedido, include: [Item] }],
    });
    res.status(200).json(comandas);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar comandas!' });
  }
};

module.exports = { abrirComanda, fecharComanda, listarComandas };