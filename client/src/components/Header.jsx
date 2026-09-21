import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logoWhite from "../assets/Logo/baven_logo_white.png";
import logoBlack from "../assets/Logo/baven_logo_black.png";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export const HEADER_HEIGHT = 76;

export default function Header() {
  const { totalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";

  const NAV_LINKS = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/shop", label: t("nav.shop") },
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  const isLight = isHome && !isMenuOpen;
  const textColor = isLight ? "var(--color-off-white)" : "var(--color-ink)";
  const mutedColor = isLight
    ? "rgba(244, 241, 234, 0.75)"
    : "var(--color-neutral-grey)";

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  function closeSearch() {
    setIsSearchOpen(false);
    setSearchValue("");
  }

  function submitSearch(e) {
    e.preventDefault();
    const query = searchValue.trim();
    if (!query) return;
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    closeSearch();
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: isLight ? "transparent" : "var(--color-off-white)",
        borderBottom: isLight ? "none" : "1px solid var(--color-light-grey)",
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: HEADER_HEIGHT,
        }}
      >
        <Link
          to="/"
          aria-label={`Baven Studio — ${t("nav.home")}`}
          style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}
        >
          <img
            src={isLight ? logoWhite : logoBlack}
            alt="Baven Studio"
            style={{ height: 24, width: "auto" }}
          />
        </Link>

        <nav className="header-nav-desktop">
          <ul style={{ display: "flex", gap: 32 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  style={({ isActive }) => ({
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: isActive ? textColor : mutedColor,
                    borderBottom: isActive
                      ? `2px solid ${textColor}`
                      : "2px solid transparent",
                    paddingBottom: 4,
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <form
            onSubmit={submitSearch}
            className="header-search"
            style={{
              display: "flex",
              alignItems: "center",
              gap: isSearchOpen ? 10 : 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: isSearchOpen ? 160 : 0,
                opacity: isSearchOpen ? 1 : 0,
                overflow: "hidden",
                borderBottom: `1px solid ${textColor}`,
                paddingBottom: 4,
                transition: "width 0.3s ease, opacity 0.2s ease",
              }}
            >
              <input
                ref={searchInputRef}
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={() => {
                  if (!searchValue.trim()) closeSearch();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeSearch();
                }}
                placeholder={t("nav.searchPlaceholder")}
                tabIndex={isSearchOpen ? 0 : -1}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  color: textColor,
                  width: "100%",
                }}
              />
            </div>

            <button
              type="button"
              onClick={() =>
                isSearchOpen ? closeSearch() : setIsSearchOpen(true)
              }
              aria-label={
                isSearchOpen ? t("nav.closeSearch") : t("nav.openSearch")
              }
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: textColor,
                display: "flex",
                transition: "transform 0.2s ease",
                transform: isSearchOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            aria-label="Switch language"
            style={{
              background: "none",
              border: `1px solid ${mutedColor}`,
              borderRadius: 999,
              padding: "4px 10px",
              cursor: "pointer",
              color: textColor,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            {language === "fr" ? "EN" : "FR"}
          </button>

          <NavLink
            to="/cart"
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: textColor,
            }}
          >
            <span className="header-cart-label">{t("nav.cart")}</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 22,
                height: 22,
                borderRadius: "50%",
                background: textColor,
                color: isLight ? "var(--color-ink)" : "var(--color-off-white)",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {totalItems}
            </span>
          </NavLink>

          <button
            type="button"
            className="header-burger"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: textColor,
              display: "none",
            }}
          >
            {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className="header-nav-mobile"
          style={{
            background: "var(--color-off-white)",
            borderTop: "1px solid var(--color-light-grey)",
            borderBottom: "1px solid var(--color-light-grey)",
          }}
        >
          <ul
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px 24px",
              gap: 20,
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  style={({ isActive }) => ({
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "var(--color-ink)"
                      : "var(--color-neutral-grey)",
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <style>{`
        @media (max-width: 720px) {
          .header-nav-desktop { display: none; }
          .header-burger { display: flex !important; }
          .header-cart-label { display: none; }
          .header-search input { width: 120px !important; }
        }
      `}</style>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
