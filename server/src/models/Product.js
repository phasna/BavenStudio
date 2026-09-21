const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  images: { type: DataTypes.JSON, defaultValue: [] },
  sizes: { type: DataTypes.JSON, defaultValue: [] },
  colors: { type: DataTypes.JSON, defaultValue: [] },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  gender: {
    type: DataTypes.ENUM('homme', 'femme', 'unisexe'),
    allowNull: false,
    defaultValue: 'unisexe',
  },
});

module.exports = Product;
