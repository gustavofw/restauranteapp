const express = require('express');
const router = express.Router();
const db = require('../database'); // Conexão com o banco de dados

// Criar uma comanda e associar pedidos
router.post('/', async (req, res) => {
  const { usuarioId, pedidos } = req.body;

  try {
    // Cria uma nova comanda
    const comandaResult = await db.query(
      'INSERT INTO comandas (usuario_id) VALUES ($1) RETURNING id',
      [usuarioId]
    );
    const comandaId = comandaResult.rows[0].id;

    // Adiciona os pedidos à nova comanda
    for (const pedido of pedidos) {
      await db.query(
        'INSERT INTO pedidos (comanda_id, item_cardapio_id, quantidade) VALUES ($1, $2, $3)',
        [comandaId, pedido.itemId, pedido.quantidade]
      );
    }

    res.status(201).json({ message: 'Comanda criada com sucesso.', comandaId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar comanda.' });
  }
});

// Listar comandas com pedidos associados
router.get('/', async (req, res) => {
  try {
    const comandas = await db.query(`
      SELECT c.id AS comanda_id, c.usuario_id, c.status, c.criada_em,
             json_agg(json_build_object('pedido_id', p.id, 'item_id', p.item_cardapio_id, 'quantidade', p.quantidade, 'status', p.status)) AS pedidos
      FROM comandas c
      LEFT JOIN pedidos p ON c.id = p.comanda_id
      GROUP BY c.id
      ORDER BY c.criada_em DESC
    `);
    res.json(comandas.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar comandas.' });
  }
});

// Fechar uma comanda
router.put('/:id/fechar', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('UPDATE comandas SET status = $1 WHERE id = $2', ['fechada', id]);
    res.json({ message: 'Comanda fechada com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fechar comanda.' });
  }
});

// Adicionar pedidos a uma comanda existente
router.post('/:id/pedidos', async (req, res) => {
  const { id } = req.params;
  const { pedidos } = req.body;

  try {
    for (const pedido of pedidos) {
      await db.query(
        'INSERT INTO pedidos (comanda_id, item_cardapio_id, quantidade) VALUES ($1, $2, $3)',
        [id, pedido.itemId, pedido.quantidade]
      );
    }

    res.status(201).json({ message: 'Pedidos adicionados com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar pedidos à comanda.' });
  }
});

module.exports = router;