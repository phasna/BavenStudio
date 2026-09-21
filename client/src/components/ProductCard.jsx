import { Link } from 'react-router-dom';
import { getFallbackImage } from '../lib/placeholderImages.js';

export default function ProductCard({ product }) {
  const image = product.images?.[0] || getFallbackImage(product);

  return (
    <Link to={`/produits/${product.slug}`} style={{ display: 'block' }}>
      <div
        style={{
          aspectRatio: '4 / 5',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: 12,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{product.name}</span>
        <span style={{ fontSize: 14, fontWeight: 600 }}>{Number(product.price).toFixed(0)} €</span>
      </div>
      {product.category?.name && (
        <span className="eyebrow" style={{ display: 'block', marginTop: 4 }}>
          {product.category.name}
        </span>
      )}
    </Link>
  );
}
