const express = require('express');
const { Op } = require('sequelize');
const { Product, Category } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const { category, featured, gender, search } = req.query;
  const where = {};
  const include = [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }];

  if (featured === 'true') where.featured = true;

  if (gender === 'homme' || gender === 'femme') {
    where.gender = { [Op.in]: [gender, 'unisexe'] };
  }

  if (category) {
    include[0].where = { slug: category };
  }

  if (search) {
    where.name = { [Op.like]: `%${search}%` };
  }

  const products = await Product.findAll({ where, include, order: [['createdAt', 'DESC']] });
  res.json(products);
});

router.get('/:slug', async (req, res) => {
  const product = await Product.findOne({
    where: { slug: req.params.slug },
    include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
  });

  if (!product) return res.status(404).json({ message: 'Produit introuvable' });
  res.json(product);
});

module.exports = router;
