const { Sequelize } = require('sequelize');
const sequelize = require('../config/config'); // sua configuração do Sequelize

const calcularTotalComanda = async (comandaId) => {
  const result = await sequelize.query(
    'SELECT calcular_total_comanda(:comandaId) AS total',
    {
      replacements: { comandaId },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  return result[0].total;
};

const relatorioVenda = async (req, res) => {
  const { comandaId } = req.params; 
  try {
    const total = await calcularTotalComanda(comandaId);
    res.status(200).json({ total }); 
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular total da comanda' });
  }
};

module.exports = { relatorioVenda };
