import femmeImage from '../assets/femme.jpg';
import hommeImage from '../assets/homme.jpg';

export function getFallbackImage(product) {
  if (product.gender === 'femme') return femmeImage;
  if (product.gender === 'homme') return hommeImage;
  return product.id % 2 === 0 ? hommeImage : femmeImage;
}
