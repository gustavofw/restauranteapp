const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const itens = await Item.findAll();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;