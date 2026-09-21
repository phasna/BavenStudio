# Baven Studio — E-commerce

Site e-commerce (React + Express + MySQL) basé sur la charte graphique Baven Studio
("BECOME. EVOLVE.").

## Structure

- `client/` — React (Vite), catalogue, fiche produit, panier (localStorage)
- `server/` — API Express + Sequelize (MySQL)

## Prérequis

- Node.js 18+
- Un serveur MySQL local, avec une base créée :
  ```sql
  CREATE DATABASE baven_studio CHARACTER SET utf8mb4;
  ```

## Installation

```bash
npm run install:all
cp server/.env.example server/.env   # renseigner DB_USER / DB_PASSWORD
npm run seed                          # crée les tables et les données de démo
npm run dev                           # lance l'API (port 4000) et le front (port 5173)
```

Le front est ensuite disponible sur http://localhost:5173, le front appelle l'API via
le proxy Vite (`/api` → `http://localhost:4000`).

## Notes charte graphique

- Couleurs : Baven Ink `#111820`, Off White `#F4F1EA`, Light Grey `#E6E3DC`, Neutral Grey `#777B80`
- Typo texte : Space Grotesk (titres), Inter (corps de texte)
- Le wordmark du logo original utilise **Utah Condensed Bold** (police propriétaire, sans
  fichier vectoriel fourni). En attendant le fichier `.ai`/`.svg` officiel, le logo texte du
  site utilise **Oswald Bold** comme équivalent condensé gratuit le plus proche. Remplacer
  `client/src/components/Logo.jsx` par le vrai SVG dès qu'il est disponible.
- Les visuels produits sont pour l'instant des placeholders (bloc Light Grey + monogramme B) :
  à remplacer par de vraies photos éditoriales une fois disponibles.
# BavenStudio
