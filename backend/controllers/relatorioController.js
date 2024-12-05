const { Sequelize } = require('sequelize');
const sequelize = require('../config/config'); 

const relatorioVenda = async (req, res) => {
  try {
    const vendas = await sequelize.query(
      `
      SELECT 
        c.id AS comanda_id, 
        calcular_total_comanda(c.id) AS total, 
        c.created_at AS data
      FROM comandas c
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

module.exports = { relatorioVenda };
