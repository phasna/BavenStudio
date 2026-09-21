import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, lineKey } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 16 }}>
          {t("cart.empty")}
        </h1>
        <Link to="/shop" className="btn btn-primary">
          {t("cart.backToShop")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 40 }}>
        {t("cart.title")}
      </h1>

      {/* Grille 3 colonnes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32,
          marginBottom: 48,
        }}
      >
        {items.map((item) => {
          const key = lineKey(item);
          return (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                borderBottom: "1px solid var(--color-light-grey)",
                paddingBottom: 24,
              }}
            >
              {/* Image plus grande */}
              <Link
                to={`/produits/${item.slug}`}
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                }}
              >
                {item.image ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "var(--color-light-grey)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-logo)",
                      fontWeight: 700,
                      fontSize: 48,
                      color: "var(--color-neutral-grey)",
                    }}
                  >
                    B
                  </div>
                )}
              </Link>

              {/* Infos produit */}
              <div>
                <Link
                  to={`/produits/${item.slug}`}
                  style={{ fontWeight: 600, display: "block", marginBottom: 4 }}
                >
                  {item.name}
                </Link>
                <div className="eyebrow">
                  {[item.size, item.color].filter(Boolean).join(" · ")}
                </div>
              </div>

              {/* Quantité + Prix + Retirer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(key, Number(e.target.value))}
                  style={{
                    width: 56,
                    padding: 8,
                    border: "1px solid var(--color-light-grey)",
                    textAlign: "center",
                  }}
                />

                <span
                  style={{ fontWeight: 600, minWidth: 64, textAlign: "right" }}
                >
                  {(item.price * item.quantity).toFixed(0)} €
                </span>

                <button
                  onClick={() => removeItem(key)}
                  className="eyebrow"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {t("cart.remove")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total + Commander */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 24,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 600 }}>
          {t("cart.total", totalPrice.toFixed(0))}
        </span>
        <Link to="/checkout" className="btn btn-primary">
          {t("cart.checkout")}
        </Link>
      </div>
    </div>
  );
}
