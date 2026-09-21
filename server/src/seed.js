require('dotenv').config();
const { sequelize, Category, Product } = require('./models');

const CATEGORIES = [
  { name: 'T-Shirts', slug: 't-shirts' },
  { name: 'Hoodies', slug: 'hoodies' },
  { name: 'Sweatshirts', slug: 'sweatshirts' },
  { name: 'Casquettes', slug: 'casquettes' },
  { name: 'Pantalons', slug: 'pantalons' },
  { name: 'Vestes', slug: 'vestes' },
  { name: 'Accessoires', slug: 'accessoires' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = ['Baven Ink', 'Off White'];

const PRODUCTS = [
  {
    name: 'Oversize Tee — Become',
    slug: 'oversize-tee-become',
    category: 't-shirts',
    price: 45,
    description: "T-shirt oversize en coton lourd, sérigraphie minimale « BECOME. EVOLVE. ». Coupe droite, épaules tombantes.",
    featured: true,
    gender: 'unisexe',
  },
  {
    name: 'Essential Tee — B',
    slug: 'essential-tee-b',
    category: 't-shirts',
    price: 39,
    description: 'T-shirt essentiel, monogramme B brodé sur la poitrine. Coton biologique 220gsm.',
    featured: false,
    gender: 'femme',
  },
  {
    name: 'Signature Hoodie',
    slug: 'signature-hoodie',
    category: 'hoodies',
    price: 89,
    description: 'Hoodie signature en molleton épais, logo brodé simplifié, poche kangourou.',
    featured: true,
    gender: 'homme',
  },
  {
    name: 'Evolve Hoodie',
    slug: 'evolve-hoodie',
    category: 'hoodies',
    price: 95,
    description: 'Hoodie oversize, capuche doublée, typographie « BUILT TO EVOLVE » dans le dos.',
    featured: false,
    gender: 'femme',
  },
  {
    name: 'Crewneck Sweatshirt',
    slug: 'crewneck-sweatshirt',
    category: 'sweatshirts',
    price: 79,
    description: 'Sweatshirt col rond, coupe relâchée, logo centré discret.',
    featured: true,
    gender: 'unisexe',
  },
  {
    name: 'New Drop Cap',
    slug: 'new-drop-cap',
    category: 'casquettes',
    price: 35,
    description: 'Casquette 6 panneaux, broderie « BAVEN STUDIO · 01 », visière plate.',
    featured: true,
    gender: 'unisexe',
  },
  {
    name: 'Wide Cargo Pants',
    slug: 'wide-cargo-pants',
    category: 'pantalons',
    price: 99,
    description: 'Pantalon cargo coupe large, poches utilitaires, patch tissé Baven Ink.',
    featured: false,
    gender: 'homme',
  },
  {
    name: 'Studio Track Jacket',
    slug: 'studio-track-jacket',
    category: 'vestes',
    price: 129,
    description: 'Veste légère zippée, col montant, logotype imprimé dans le dos.',
    featured: true,
    gender: 'femme',
  },
  {
    name: 'Tote Bag — Move Forward',
    slug: 'tote-bag-move-forward',
    category: 'accessoires',
    price: 25,
    description: 'Tote bag en toile épaisse, message « MOVE FORWARD. » imprimé.',
    featured: false,
    gender: 'unisexe',
  },
];

async function seed() {
  await sequelize.sync({ force: true });

  const categoryMap = {};
  for (const cat of CATEGORIES) {
    const created = await Category.create(cat);
    categoryMap[cat.slug] = created.id;
  }

  for (const product of PRODUCTS) {
    await Product.create({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      featured: product.featured,
      gender: product.gender,
      sizes: SIZES,
      colors: COLORS,
      images: [`/uploads/${product.slug}.jpg`],
      categoryId: categoryMap[product.category],
    });
  }

  console.log(`Seed terminé : ${CATEGORIES.length} catégories, ${PRODUCTS.length} produits.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Erreur pendant le seed :', err);
  process.exit(1);
});
