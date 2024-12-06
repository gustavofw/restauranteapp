const { Sequelize } = require('sequelize');
const sequelize = require('../config/config'); 

const relatorioVenda = async (req, res) => {
  try {
    const vendas = await sequelize.query(
      `
      SELECT 
        c.id AS ComandaId, 
        calcular_total_comanda(c.id) AS total, 
        c.created_at AS data
      FROM Comandas c
      ORDER BY c.created_at DESC
      `,
      { type: Sequelize.QueryTypes.SELECT }
    );

    res.status(200).json(vendas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar o relatório de vendas' });
  }
};

const vendas = async (req, res) => {
  try {
    const comandasFechadas = await Comanda.findAll({
      includes: [
        
      ]
    });

    const relatorio = comandasFechadas.map((pedido) => {
      console.log(pedido)
      const usuario = pedido?.Comanda.Usuario.nome;
      const itens = pedido?.Item.map((itemComanda) => ({
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
}

module.exports = { relatorioVenda, vendas };
