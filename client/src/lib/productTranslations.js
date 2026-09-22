export const categoryTranslations = {
  't-shirts': { fr: 'T-Shirts', en: 'T-Shirts' },
  hoodies: { fr: 'Hoodies', en: 'Hoodies' },
  sweatshirts: { fr: 'Sweatshirts', en: 'Sweatshirts' },
  casquettes: { fr: 'Casquettes', en: 'Caps' },
  pantalons: { fr: 'Pantalons', en: 'Pants' },
  vestes: { fr: 'Vestes', en: 'Jackets' },
  accessoires: { fr: 'Accessoires', en: 'Accessories' },
};

export const productDescriptionTranslations = {
  'oversize-tee-become': {
    fr: 'T-shirt oversize en coton lourd, sérigraphie minimale « BECOME. EVOLVE. ». Coupe droite, épaules tombantes.',
    en: 'Oversized heavyweight cotton t-shirt, minimal "BECOME. EVOLVE." screen print. Straight fit, dropped shoulders.',
  },
  'essential-tee-b': {
    fr: 'T-shirt essentiel, monogramme B brodé sur la poitrine. Coton biologique 220gsm.',
    en: 'Essential t-shirt with embroidered B monogram on the chest. 220gsm organic cotton.',
  },
  'signature-hoodie': {
    fr: 'Hoodie signature en molleton épais, logo brodé simplifié, poche kangourou.',
    en: 'Signature hoodie in heavyweight fleece, simplified embroidered logo, kangaroo pocket.',
  },
  'evolve-hoodie': {
    fr: 'Hoodie oversize, capuche doublée, typographie « BUILT TO EVOLVE » dans le dos.',
    en: 'Oversized hoodie, lined hood, "BUILT TO EVOLVE" typography on the back.',
  },
  'crewneck-sweatshirt': {
    fr: 'Sweatshirt col rond, coupe relâchée, logo centré discret.',
    en: 'Crewneck sweatshirt, relaxed fit, discreet centered logo.',
  },
  'new-drop-cap': {
    fr: 'Casquette 6 panneaux, broderie « BAVEN STUDIO · 01 », visière plate.',
    en: '6-panel cap, "BAVEN STUDIO · 01" embroidery, flat brim.',
  },
  'wide-cargo-pants': {
    fr: 'Pantalon cargo coupe large, poches utilitaires, patch tissé Baven Ink.',
    en: 'Wide-fit cargo pants, utility pockets, woven Baven Ink patch.',
  },
  'studio-track-jacket': {
    fr: 'Veste légère zippée, col montant, logotype imprimé dans le dos.',
    en: 'Lightweight zip-up jacket, standing collar, printed logo on the back.',
  },
  'tote-bag-move-forward': {
    fr: 'Tote bag en toile épaisse, message « MOVE FORWARD. » imprimé.',
    en: 'Heavy canvas tote bag, printed "MOVE FORWARD." message.',
  },
};

export function translateCategoryName(category, language) {
  if (!category) return category;
  return categoryTranslations[category.slug]?.[language] ?? category.name;
}

export function translateProductDescription(product, language) {
  if (!product) return product;
  return productDescriptionTranslations[product.slug]?.[language] ?? product.description;
}
