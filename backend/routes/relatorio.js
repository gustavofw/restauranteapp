const express = require('express');
const { Comanda, ItemComanda, Item, Usuario } = require('../models'); 
const router = express.Router();

router.get('/relatorio-vendas', async (req, res) => {
  try {
    const comandasFechadas = await Comanda.findAll({
      where: { status: 'fechada' }, 
      include: [
        {
          model: Usuario,
          attributes: ['nome'], 
        },
        {
          model: ItemComanda,
          include: [
            {
              model: Item,
              attributes: ['nome', 'preco'], 
            },
          ],
        },
      ],
    });

    const relatorio = comandasFechadas.map((comanda) => {
      const usuario = comanda.Usuario.nome;
      const itens = comanda.ItemComandas.map((itemComanda) => ({
        item: itemComanda.Item.nome,
        quantidade: itemComanda.quantidade,
        preco: itemComanda.Item.preco,
        valor: itemComanda.quantidade * itemComanda.Item.preco,
      }));

      const valorTotal = itens.reduce((total, item) => total + item.valor, 0);

      return {
        usuario,
        itens,
        valorTotal,
      };
    });

    res.json(relatorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar relatório de vendas' });
  }
});

module.exports = router;