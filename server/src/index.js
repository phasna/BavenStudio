require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Baven Studio API en écoute sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données MySQL :', err.message);
    process.exit(1);
  });
