import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const STORAGE_KEY = "baven-cookie-consent";

const CATEGORIES = [
  { key: "necessary", titleKey: "cookies.necessary.title", descKey: "cookies.necessary.desc", locked: true },
  { key: "analytics", titleKey: "cookies.analytics.title", descKey: "cookies.analytics.desc", locked: false },
  { key: "marketing", titleKey: "cookies.marketing.title", descKey: "cookies.marketing.desc", locked: false },
];

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function save(nextPrefs) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...nextPrefs, date: new Date().toISOString() }));
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  }

  function toggle(key) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(17, 24, 32, 0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <div
        className="cookie-banner-card"
        style={{
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "var(--color-off-white)",
          color: "var(--color-ink)",
          padding: "28px 32px 32px",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={() => save({ necessary: true, analytics: false, marketing: false })}
          style={{
            position: "absolute",
            top: 28,
            right: 32,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            fontSize: 13,
            color: "var(--color-ink)",
            textDecoration: "underline",
          }}
        >
          {t("cookies.continueWithoutAccepting")}
        </button>

        <h2
          style={{
            fontFamily: "var(--font-logo)",
            fontSize: 22,
            fontWeight: 700,
            textTransform: "uppercase",
            margin: "0 0 16px",
            paddingRight: 160,
          }}
        >
          {t("cookies.title")}
        </h2>

        <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-ink)", margin: "0 0 24px" }}>
          {t("cookies.messageIntro")}{" "}
          <span style={{ textDecoration: "underline" }}>{t("cookies.privacyPolicy")}</span>{" "}
          {t("cookies.messageJoin")}{" "}
          <span style={{ textDecoration: "underline" }}>{t("cookies.cookiePolicy")}</span>.
        </p>

        {!showDetails ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              type="button"
              onClick={() => save({ necessary: true, analytics: true, marketing: true })}
              className="btn"
              style={{ width: "100%", background: "var(--color-ink)", color: "var(--color-off-white)" }}
            >
              {t("cookies.accept")}
            </button>
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="btn btn-outline"
              style={{ width: "100%" }}
            >
              {t("cookies.customize")}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 20,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--color-light-grey)",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
                    {t(cat.titleKey)}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-neutral-grey)", margin: 0 }}>
                    {t(cat.descKey)}
                  </p>
                </div>

                {cat.locked ? (
                  <span className="eyebrow" style={{ flexShrink: 0, whiteSpace: "nowrap", color: "var(--color-neutral-grey)" }}>
                    {t("cookies.alwaysOn")}
                  </span>
                ) : (
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs[cat.key]}
                    onClick={() => toggle(cat.key)}
                    style={{
                      flexShrink: 0,
                      width: 40,
                      height: 22,
                      borderRadius: 999,
                      border: "1px solid var(--color-neutral-grey)",
                      background: prefs[cat.key] ? "var(--color-ink)" : "transparent",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: 2,
                        left: prefs[cat.key] ? 20 : 2,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: prefs[cat.key] ? "var(--color-off-white)" : "var(--color-neutral-grey)",
                        transition: "left 0.15s ease",
                      }}
                    />
                  </button>
                )}
              </div>
            ))}

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => save(prefs)}
                className="btn"
                style={{ width: "100%", background: "var(--color-ink)", color: "var(--color-off-white)" }}
              >
                {t("cookies.save")}
              </button>
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="btn btn-outline"
                style={{ width: "100%" }}
              >
                {t("cookies.hideDetails")}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 641px) {
          .cookie-banner-card {
            width: 480px !important;
          }
        }
      `}</style>
    </div>
  );
}
