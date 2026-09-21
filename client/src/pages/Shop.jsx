import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getProducts } from '../lib/api.js';
import ProductCard from '../components/ProductCard.jsx';

const GENDERS = [
  { value: 'femme', label: 'Femme' },
  { value: 'homme', label: 'Homme' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGender = searchParams.get('gender');
  const activeCategory = searchParams.get('category');
  const activeSearch = searchParams.get('search');

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories().then(setCategories).catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    getProducts({ category: activeCategory, gender: activeGender, search: activeSearch })
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, [activeCategory, activeGender, activeSearch]);

  function setGender(gender) {
    const next = new URLSearchParams(searchParams);
    if (gender) next.set('gender', gender);
    else next.delete('gender');
    setSearchParams(next);
  }

  function setCategory(category) {
    const next = new URLSearchParams(searchParams);
    if (category) next.set('category', category);
    else next.delete('category');
    setSearchParams(next);
  }

  return (
    <div className="container section">
      <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: activeSearch ? 12 : 32 }}>
        Shop{activeGender ? ` — ${activeGender === 'femme' ? 'Femme' : 'Homme'}` : ''}
      </h1>

      {activeSearch && (
        <p className="eyebrow" style={{ marginBottom: 32 }}>
          Résultats pour « {activeSearch} »
          {' '}
          <button
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.delete('search');
              setSearchParams(next);
            }}
            style={{ border: 'none', background: 'none', padding: 0, color: 'var(--color-ink)', textDecoration: 'underline', cursor: 'pointer' }}
          >
            effacer
          </button>
        </p>
      )}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <button
          onClick={() => setGender(null)}
          className="eyebrow"
          style={{
            border: 'none',
            background: 'none',
            padding: '8px 0',
            borderBottom: !activeGender ? '2px solid var(--color-ink)' : '2px solid transparent',
            color: !activeGender ? 'var(--color-ink)' : 'var(--color-neutral-grey)',
          }}
        >
          Tout
        </button>
        {GENDERS.map((g) => (
          <button
            key={g.value}
            onClick={() => setGender(g.value)}
            className="eyebrow"
            style={{
              border: 'none',
              background: 'none',
              padding: '8px 0',
              borderBottom: activeGender === g.value ? '2px solid var(--color-ink)' : '2px solid transparent',
              color: activeGender === g.value ? 'var(--color-ink)' : 'var(--color-neutral-grey)',
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
        <button
          onClick={() => setCategory(null)}
          className="eyebrow"
          style={{
            border: 'none',
            background: 'none',
            padding: '8px 0',
            borderBottom: !activeCategory ? '2px solid var(--color-ink)' : '2px solid transparent',
            color: !activeCategory ? 'var(--color-ink)' : 'var(--color-neutral-grey)',
          }}
        >
          Toutes catégories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.slug)}
            className="eyebrow"
            style={{
              border: 'none',
              background: 'none',
              padding: '8px 0',
              borderBottom: activeCategory === cat.slug ? '2px solid var(--color-ink)' : '2px solid transparent',
              color: activeCategory === cat.slug ? 'var(--color-ink)' : 'var(--color-neutral-grey)',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {error && <p style={{ color: 'var(--color-neutral-grey)' }}>{error}</p>}
      {!error && products.length === 0 && (
        <p style={{ color: 'var(--color-neutral-grey)' }}>Aucun produit ne correspond à cette sélection pour le moment.</p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 32,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
