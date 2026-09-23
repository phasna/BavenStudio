import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { addOrder } from "../lib/orders.js";

const SHIPPING_COST = 6;

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "France",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function validateShipping(form, t) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = t("checkout.errors.fullName");
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = t("checkout.errors.email");
  if (!form.phone.trim()) errors.phone = t("checkout.errors.phone");
  if (!form.address.trim()) errors.address = t("checkout.errors.address");
  if (!form.city.trim()) errors.city = t("checkout.errors.city");
  if (!/^\d{4,6}$/.test(form.postalCode.trim())) errors.postalCode = t("checkout.errors.postalCode");
  return errors;
}

function validatePayment(form, t) {
  const errors = {};
  if (!form.cardName.trim()) errors.cardName = t("checkout.errors.cardName");
  const digits = form.cardNumber.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) errors.cardNumber = t("checkout.errors.cardNumber");
  if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) {
    errors.cardExpiry = t("checkout.errors.cardExpiryFormat");
  } else {
    const [month, year] = form.cardExpiry.split("/").map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (month < 1 || month > 12) errors.cardExpiry = t("checkout.errors.cardExpiryMonth");
    else if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.cardExpiry = t("checkout.errors.cardExpired");
    }
  }
  if (!/^\d{3,4}$/.test(form.cardCvc)) errors.cardCvc = t("checkout.errors.cardCvc");
  return errors;
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function updateField(field, transform) {
    return (e) => {
      const raw = e.target.value;
      setForm((prev) => ({ ...prev, [field]: transform ? transform(raw) : raw }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function goToPayment(e) {
    e.preventDefault();
    const nextErrors = validateShipping(form, t);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validatePayment(form, t);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      addOrder({
        id: `BAV-${Date.now().toString(36).toUpperCase()}`,
        date: new Date().toISOString(),
        email: form.email,
        fullName: form.fullName,
        items: items.map((item) => ({
          name: item.name,
          slug: item.slug,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: totalPrice,
        shipping: SHIPPING_COST,
        total: totalPrice + SHIPPING_COST,
        status: "paid",
      });
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 1200);
  }

  if (orderPlaced) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 16 }}>
          {t("checkout.thankYou", form.fullName.split(" ")[0])}
        </h1>
        <p style={{ color: "var(--color-neutral-grey)", marginBottom: 8 }}>
          {t("checkout.confirmationSent", form.email)}
        </p>
        <p style={{ color: "var(--color-neutral-grey)", marginBottom: 32 }}>
          {t("checkout.simulatedPayment")}
        </p>
        <Link to="/shop" className="btn btn-primary">
          {t("cart.backToShop")}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="container section">
      <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", marginBottom: 24 }}>
        {t("checkout.title")}
      </h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        <StepLabel number={1} label={t("checkout.shippingSection")} active={step === 1} done={step > 1} />
        <span style={{ color: "var(--color-light-grey)" }}>—</span>
        <StepLabel number={2} label={t("checkout.paymentSection")} active={step === 2} done={false} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
        className="checkout-grid"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {step === 1 && (
            <form onSubmit={goToPayment}>
              <section>
                <h2 style={{ fontSize: 20, marginBottom: 20 }}>{t("checkout.shippingSection")}</h2>
                <div className="checkout-fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field
                    label={t("checkout.fullName")}
                    value={form.fullName}
                    onChange={updateField("fullName")}
                    error={errors.fullName}
                    full
                  />
                  <Field
                    label={t("checkout.email")}
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    error={errors.email}
                  />
                  <Field
                    label={t("checkout.phone")}
                    type="tel"
                    value={form.phone}
                    onChange={updateField("phone")}
                    error={errors.phone}
                  />
                  <Field
                    label={t("checkout.address")}
                    value={form.address}
                    onChange={updateField("address")}
                    error={errors.address}
                    full
                  />
                  <Field
                    label={t("checkout.city")}
                    value={form.city}
                    onChange={updateField("city")}
                    error={errors.city}
                  />
                  <Field
                    label={t("checkout.postalCode")}
                    value={form.postalCode}
                    onChange={updateField("postalCode")}
                    error={errors.postalCode}
                  />
                  <Field
                    label={t("checkout.country")}
                    value={form.country}
                    onChange={updateField("country")}
                    full
                  />
                </div>
              </section>

              <button type="submit" className="btn btn-primary" style={{ marginTop: 32 }}>
                {t("checkout.continueToPayment")}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <section>
                <h2 style={{ fontSize: 20, marginBottom: 20 }}>{t("checkout.paymentSection")}</h2>
                <div className="checkout-fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field
                    label={t("checkout.cardName")}
                    value={form.cardName}
                    onChange={updateField("cardName")}
                    error={errors.cardName}
                    full
                  />
                  <Field
                    label={t("checkout.cardNumber")}
                    value={form.cardNumber}
                    onChange={updateField("cardNumber", formatCardNumber)}
                    error={errors.cardNumber}
                    placeholder="0000 0000 0000 0000"
                    full
                  />
                  <Field
                    label={t("checkout.expiry")}
                    value={form.cardExpiry}
                    onChange={updateField("cardExpiry", formatExpiry)}
                    error={errors.cardExpiry}
                    placeholder={t("checkout.expiryPlaceholder")}
                  />
                  <Field
                    label={t("checkout.cvc")}
                    value={form.cardCvc}
                    onChange={updateField("cardCvc", (v) => v.replace(/\D/g, "").slice(0, 4))}
                    error={errors.cardCvc}
                    placeholder="123"
                  />
                </div>
                <p className="eyebrow" style={{ marginTop: 12, color: "var(--color-neutral-grey)" }}>
                  {t("checkout.simulationNote")}
                </p>
              </section>

              <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                  {t("checkout.backToShipping")}
                </button>
                <button type="submit" className="btn btn-primary" disabled={isProcessing}>
                  {isProcessing ? t("checkout.processing") : t("checkout.pay", (totalPrice + SHIPPING_COST).toFixed(0))}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside
          className="checkout-summary"
          style={{
            border: "1px solid var(--color-light-grey)",
            padding: 24,
            position: "sticky",
            top: 96,
          }}
        >
          <h2 style={{ fontSize: 18, marginBottom: 20 }}>{t("checkout.summary")}</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {items.map((item) => (
              <div
                key={[item.productId, item.size, item.color].join("::")}
                style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14 }}
              >
                <span>
                  {item.name}
                  {"  "}
                  <span style={{ color: "var(--color-neutral-grey)" }}>
                    × {item.quantity}
                    {item.size ? ` · ${item.size}` : ""}
                  </span>
                </span>
                <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                  {(item.price * item.quantity).toFixed(0)} €
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid var(--color-light-grey)",
              paddingTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--color-neutral-grey)" }}>
              <span>{t("checkout.subtotal")}</span>
              <span>{totalPrice.toFixed(0)} €</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--color-neutral-grey)" }}>
              <span>{t("checkout.shippingLine")}</span>
              <span>{SHIPPING_COST.toFixed(0)} €</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 600 }}>
              <span>{t("checkout.totalLine")}</span>
              <span>{(totalPrice + SHIPPING_COST).toFixed(0)} €</span>
            </div>
          </div>

          <Link
            to="/cart"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: 13,
              color: "var(--color-neutral-grey)",
              textDecoration: "underline",
            }}
          >
            {t("checkout.backToCart")}
          </Link>
        </aside>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .checkout-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .checkout-summary { position: static !important; top: auto !important; }
        }
        @media (max-width: 640px) {
          .checkout-fields-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StepLabel({ number, label, active, done }) {
  return (
    <span
      className="eyebrow"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: active ? "var(--color-ink)" : done ? "var(--color-neutral-grey)" : "var(--color-light-grey)",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: `1px solid ${active ? "var(--color-ink)" : "var(--color-light-grey)"}`,
          fontSize: 11,
        }}
      >
        {number}
      </span>
      {label}
    </span>
  );
}

function Field({ label, error, full, ...inputProps }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: full ? "1 / -1" : "auto" }}>
      <span className="eyebrow">{label}</span>
      <input
        {...inputProps}
        style={{
          padding: "12px 14px",
          border: `1px solid ${error ? "var(--color-error)" : "var(--color-light-grey)"}`,
          fontSize: 14,
          background: "var(--color-off-white)",
          color: "var(--color-ink)",
        }}
      />
      {error && (
        <span style={{ fontSize: 12, color: "var(--color-error)" }}>{error}</span>
      )}
    </label>
  );
}
