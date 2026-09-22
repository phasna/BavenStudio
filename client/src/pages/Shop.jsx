import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../lib/api.js';
import ProductCard from '../components/ProductCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Shop() {
  const { t } = useLanguage();
  const GENDERS = [
    { value: 'femme', label: t('gender.women') },
    { value: 'homme', label: t('gender.men') },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGender = searchParams.get('gender');
  const activeCategory = searchParams.get('category');
  const activeSearch = searchParams.get('search');

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div className="container section shop-page">
      <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 300, marginBottom: activeSearch ? 12 : 32 }}>
        Shop{activeGender ? ` — ${activeGender === 'femme' ? t('gender.women') : t('gender.men')}` : ''}
      </h1>

      {activeSearch && (
        <p className="eyebrow" style={{ marginBottom: 32 }}>
          {t('shop.resultsFor', activeSearch)}
          {' '}
          <button
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.delete('search');
              setSearchParams(next);
            }}
            style={{ border: 'none', background: 'none', padding: 0, color: 'var(--color-ink)', textDecoration: 'underline', cursor: 'pointer' }}
          >
            {t('shop.clear')}
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
          {t('gender.all')}
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

      {error && <p style={{ color: 'var(--color-neutral-grey)' }}>{error}</p>}
      {!error && products.length === 0 && (
        <p style={{ color: 'var(--color-neutral-grey)' }}>{t('shop.noProducts')}</p>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .shop-page {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
