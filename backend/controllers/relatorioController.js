const { Comanda, Pedido, Item, Usuario } = require('../models');

const vendas = async (req, res) => {
  try {
    const comandasFechadas = await Comanda.findAll({
      where: { status: 'fechada' }, 
      include: [
        {
          model: Usuario, 
          attributes: ['id', 'nome'],
        },
        {
          model: Pedido, 
          include: [
            {
              model: Item, 
              attributes: ['id', 'nome', 'preco', 'tipo'],
            },
          ],
        },
      ],
    });

    const relatorio = comandasFechadas.map((comanda) => {
      const usuario = comanda.Usuario?.nome || 'Usuário desconhecido';
      const itens = comanda.Pedidos.map((pedido) => ({
        item: pedido.Item.nome,
        quantidade: pedido.quantidade,
        preco: pedido.Item.preco,
        valor: pedido.quantidade * pedido.Item.preco,
      }));

      const valorTotal = itens.reduce((total, item) => total + item.valor, 0);

      return {
        usuario,
        itens,
        valorTotal,
        data: comanda.createdAt,
      };
    });

    res.status(200).json(relatorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar relatório de vendas' });
  }
};

module.exports = { vendas };

