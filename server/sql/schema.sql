-- Baven Studio — schéma MySQL complet (base, tables, données de démo)
-- Reflète exactement les modèles Sequelize du projet (server/src/models).
-- Utilisation :
--   mysql -u root -p < server/sql/schema.sql

CREATE DATABASE IF NOT EXISTS baven_studio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE baven_studio;

-- Compte applicatif dédié (utilisé par server/.env) — adapter le mot de passe si besoin.
CREATE USER IF NOT EXISTS 'baven_app'@'127.0.0.1' IDENTIFIED BY 'baven_dev_pwd';
CREATE USER IF NOT EXISTS 'baven_app'@'localhost' IDENTIFIED BY 'baven_dev_pwd';
GRANT ALL PRIVILEGES ON baven_studio.* TO 'baven_app'@'127.0.0.1';
GRANT ALL PRIVILEGES ON baven_studio.* TO 'baven_app'@'localhost';
FLUSH PRIVILEGES;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NULL,
  price DECIMAL(10,2) NOT NULL,
  images JSON NULL,
  sizes JSON NULL,
  colors JSON NULL,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  gender ENUM('homme', 'femme', 'unisexe') NOT NULL DEFAULT 'unisexe',
  categoryId INT UNSIGNED NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category
    FOREIGN KEY (categoryId) REFERENCES categories(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------------
-- Catégories (7)
-- ---------------------------------------------------------------------------
INSERT INTO categories (id, name, slug) VALUES
  (1, 'T-Shirts',    't-shirts'),
  (2, 'Hoodies',      'hoodies'),
  (3, 'Sweatshirts',  'sweatshirts'),
  (4, 'Casquettes',   'casquettes'),
  (5, 'Pantalons',    'pantalons'),
  (6, 'Vestes',       'vestes'),
  (7, 'Accessoires',  'accessoires');

-- ---------------------------------------------------------------------------
-- Produits (9) — sizes/colors communs à tous les produits de démo
-- ---------------------------------------------------------------------------
INSERT INTO products
  (name, slug, description, price, images, sizes, colors, featured, gender, categoryId)
VALUES
  (
    'Oversize Tee — Become',
    'oversize-tee-become',
    'T-shirt oversize en coton lourd, sérigraphie minimale « BECOME. EVOLVE. ». Coupe droite, épaules tombantes.',
    45.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    1,
    'unisexe',
    1
  ),
  (
    'Essential Tee — B',
    'essential-tee-b',
    'T-shirt essentiel, monogramme B brodé sur la poitrine. Coton biologique 220gsm.',
    39.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    0,
    'femme',
    1
  ),
  (
    'Signature Hoodie',
    'signature-hoodie',
    'Hoodie signature en molleton épais, logo brodé simplifié, poche kangourou.',
    89.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    1,
    'homme',
    2
  ),
  (
    'Evolve Hoodie',
    'evolve-hoodie',
    'Hoodie oversize, capuche doublée, typographie « BUILT TO EVOLVE » dans le dos.',
    95.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    0,
    'femme',
    2
  ),
  (
    'Crewneck Sweatshirt',
    'crewneck-sweatshirt',
    'Sweatshirt col rond, coupe relâchée, logo centré discret.',
    79.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    1,
    'unisexe',
    3
  ),
  (
    'New Drop Cap',
    'new-drop-cap',
    'Casquette 6 panneaux, broderie « BAVEN STUDIO · 01 », visière plate.',
    35.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    1,
    'unisexe',
    4
  ),
  (
    'Wide Cargo Pants',
    'wide-cargo-pants',
    'Pantalon cargo coupe large, poches utilitaires, patch tissé Baven Ink.',
    99.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    0,
    'homme',
    5
  ),
  (
    'Studio Track Jacket',
    'studio-track-jacket',
    'Veste légère zippée, col montant, logotype imprimé dans le dos.',
    129.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    1,
    'femme',
    6
  ),
  (
    'Tote Bag — Move Forward',
    'tote-bag-move-forward',
    'Tote bag en toile épaisse, message « MOVE FORWARD. » imprimé.',
    25.00,
    JSON_ARRAY(),
    JSON_ARRAY('XS', 'S', 'M', 'L', 'XL'),
    JSON_ARRAY('Baven Ink', 'Off White'),
    0,
    'unisexe',
    7
  );
