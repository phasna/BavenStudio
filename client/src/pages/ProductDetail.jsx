import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct, getProducts } from "../lib/api.js";
import { useCart } from "../context/CartContext.jsx";
import { getFallbackImage } from "../lib/placeholderImages.js";
import Accordion from "../components/Accordion.jsx";
import ProductCard from "../components/ProductCard.jsx";

const SIZE_GUIDE_ROWS = [
  { size: "XS", chest: "88", length: "66" },
  { size: "S", chest: "94", length: "68" },
  { size: "M", chest: "100", length: "70" },
  { size: "L", chest: "106", length: "72" },
  { size: "XL", chest: "112", length: "74" },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
    setQuantity(1);
    getProduct(slug)
      .then((data) => {
        setProduct(data);
        setSize(data.sizes?.[0] ?? null);
        setColor(data.colors?.[0] ?? null);
      })
      .catch((err) => setError(err.message));
  }, [slug]);

  useEffect(() => {
    if (!product?.category?.slug) return;
    getProducts({ category: product.category.slug })
      .then((data) => setRelated(data.filter((p) => p.slug !== product.slug).slice(0, 4)))
      .catch(() => setRelated([]));
  }, [product?.category?.slug, product?.slug]);

  if (error) {
    return (
      <div className="container section">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section">
        <p style={{ color: "var(--color-neutral-grey)" }}>Chargement…</p>
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product, { size, color, quantity });
    setAdded(true);
  }

  const accordionItems = [
    {
      title: "Détails & matière",
      content: (
        <>
          <p style={{ marginBottom: 12 }}>{product.description}</p>
          <p>Entretien : lavage à 30°C, ne pas blanchir, séchage à plat conseillé.</p>
        </>
      ),
    },
    {
      title: "Livraison & retours",
      content: (
        <>
          <p style={{ marginBottom: 12 }}>Livraison estimée en 3 à 5 jours ouvrés en France métropolitaine.</p>
          <p>Retours gratuits sous 30 jours, article non porté et étiquette conservée.</p>
        </>
      ),
    },
    {
      title: "Guide des tailles",
      content: (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "4px 0" }}>Taille</th>
              <th style={{ textAlign: "left", padding: "4px 0" }}>Tour de poitrine (cm)</th>
              <th style={{ textAlign: "left", padding: "4px 0" }}>Longueur (cm)</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_GUIDE_ROWS.map((row) => (
              <tr key={row.size}>
                <td style={{ padding: "4px 0" }}>{row.size}</td>
                <td style={{ padding: "4px 0" }}>{row.chest}</td>
                <td style={{ padding: "4px 0" }}>{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <div className="container section">
      <div
        className="product-detail-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
        }}
      >
        <div
          style={{
            aspectRatio: "4 / 5",
            backgroundImage: `url(${product.images?.[0] || getFallbackImage(product)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div>
          {product.category?.name && <span className="eyebrow">{product.category.name}</span>}
          <h1
            style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "12px 0 8px" }}
          >
            {product.name}
          </h1>
          <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
            {Number(product.price).toFixed(0)} €
          </p>
          <p
            style={{
              color: "var(--color-neutral-grey)",
              marginBottom: 32,
              maxWidth: 440,
            }}
          >
            {product.description}
          </p>

          {product.sizes?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <span
                className="eyebrow"
                style={{ display: "block", marginBottom: 8 }}
              >
                Taille
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="btn"
                    style={{
                      padding: "8px 14px",
                      background:
                        size === s ? "var(--color-ink)" : "transparent",
                      color:
                        size === s
                          ? "var(--color-off-white)"
                          : "var(--color-ink)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <span
                className="eyebrow"
                style={{ display: "block", marginBottom: 8 }}
              >
                Couleur
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className="btn"
                    style={{
                      padding: "8px 14px",
                      background:
                        color === c ? "var(--color-ink)" : "transparent",
                      color:
                        color === c
                          ? "var(--color-off-white)"
                          : "var(--color-ink)",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 8 }}>
              Quantité
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="btn btn-outline"
                style={{ padding: "8px 14px" }}
                aria-label="Diminuer la quantité"
              >
                −
              </button>
              <span style={{ minWidth: 24, textAlign: "center" }}>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="btn btn-outline"
                style={{ padding: "8px 14px" }}
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <button onClick={handleAddToCart} className="btn btn-primary">
              Ajouter au panier
            </button>
            {added && (
              <button
                onClick={() => navigate("/cart")}
                className="btn btn-outline"
              >
                Voir le panier
              </button>
            )}
          </div>

          <Accordion items={accordionItems} />
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>

      {related.length > 0 && (
        <div style={{ marginTop: 96 }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", marginBottom: 32 }}>
            Vous aimerez aussi
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 32,
            }}
          >
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
