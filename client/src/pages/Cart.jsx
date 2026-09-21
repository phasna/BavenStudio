import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, lineKey } = useCart();

  if (items.length === 0) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16 }}>Votre panier est vide</h1>
        <Link to="/shop" className="btn btn-primary">
          Retour au shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 40 }}>Panier</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
        {items.map((item) => {
          const key = lineKey(item);
          return (
            <div
              key={key}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 24,
                paddingBottom: 24,
                borderBottom: '1px solid var(--color-light-grey)',
              }}
            >
              <Link to={`/produits/${item.slug}`} style={{ display: 'block', width: 72, height: 90, flexShrink: 0 }}>
                {item.image ? (
                  <div
                    style={{
                      width: 72,
                      height: 90,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 72,
                      height: 90,
                      background: 'var(--color-light-grey)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-logo)',
                      fontWeight: 700,
                      fontSize: 24,
                      color: 'var(--color-neutral-grey)',
                    }}
                  >
                    B
                  </div>
                )}
              </Link>

              <div style={{ flex: '1 1 160px' }}>
                <Link to={`/produits/${item.slug}`} style={{ fontWeight: 600 }}>
                  {item.name}
                </Link>
                <div className="eyebrow" style={{ marginTop: 4 }}>
                  {[item.size, item.color].filter(Boolean).join(' · ')}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(key, Number(e.target.value))}
                  style={{
                    width: 56,
                    padding: 8,
                    border: '1px solid var(--color-light-grey)',
                    textAlign: 'center',
                  }}
                />

                <span style={{ fontWeight: 600, minWidth: 64, textAlign: 'right' }}>
                  {(item.price * item.quantity).toFixed(0)} €
                </span>

                <button
                  onClick={() => removeItem(key)}
                  className="eyebrow"
                  style={{ background: 'none', border: 'none' }}
                >
                  Retirer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 24 }}>
        <span style={{ fontSize: 20, fontWeight: 600 }}>Total : {totalPrice.toFixed(0)} €</span>
        <button className="btn btn-primary" onClick={() => alert('Commande simulée — paiement non branché en V1.')}>
          Commander
        </button>
      </div>
    </div>
  );
}
