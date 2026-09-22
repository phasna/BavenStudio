import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/Logo/baven_logo.png";
import { useCart } from "../context/CartContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export const HEADER_HEIGHT = 76;

export default function Header() {
  const { totalItems } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isHome = pathname === "/";
  const currentGender = searchParams.get("gender");

  const NAV_LINKS = [
    { to: "/shop?gender=homme", label: t("gender.men"), isActive: pathname === "/shop" && currentGender === "homme" },
    { to: "/shop?gender=femme", label: t("gender.women"), isActive: pathname === "/shop" && currentGender === "femme" },
    { to: "/shop", label: t("nav.collection"), isActive: pathname === "/shop" && !currentGender },
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
            src={logo}
            alt="Baven Studio"
            style={{ height: 38, width: "auto", filter: isLight ? "none" : "invert(1)" }}
          />
        </Link>

        <nav className="header-nav-desktop">
          <ul style={{ display: "flex", gap: 32 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: link.isActive ? textColor : mutedColor,
                    borderBottom: link.isActive
                      ? `2px solid ${textColor}`
                      : "2px solid transparent",
                    paddingBottom: 4,
                  }}
                >
                  {link.label}
                </Link>
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

          <LanguageDropdown language={language} setLanguage={setLanguage} color={textColor} />

          <Link
            to="/login"
            aria-label={t("nav.login")}
            style={{ display: "flex", alignItems: "center", color: textColor }}
          >
            <UserIcon />
          </Link>

          <NavLink
            to="/cart"
            aria-label={`${t("nav.cart")} (${totalItems})`}
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

            <span className="header-cart-icon-wrap" style={{ position: "relative" }}>
              <CartIcon />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -8,
                    minWidth: 16,
                    height: 16,
                    padding: "0 3px",
                    borderRadius: "50%",
                    background: textColor,
                    color: isLight ? "var(--color-ink)" : "var(--color-off-white)",
                    fontSize: 10,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </span>

            <span
              className="header-cart-count"
              style={{
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

      <nav
        className="header-nav-mobile"
        aria-hidden={!isMenuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "var(--color-off-white)",
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s ease",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "0 24px 32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: HEADER_HEIGHT,
              flexShrink: 0,
            }}
          >
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              aria-label={`Baven Studio — ${t("nav.home")}`}
              style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}
            >
              <img src={logo} alt="Baven Studio" style={{ height: 38, width: "auto", filter: "invert(1)" }} />
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label={t("nav.closeMenu")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "var(--color-ink)",
                display: "flex",
              }}
            >
              <CloseIcon />
            </button>
          </div>

          <ul style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 24 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  tabIndex={isMenuOpen ? 0 : -1}
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    textTransform: "uppercase",
                    color: link.isActive
                      ? "var(--color-ink)"
                      : "var(--color-neutral-grey)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "auto",
              paddingTop: 24,
              borderTop: "1px solid var(--color-light-grey)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <LanguageDropdown language={language} setLanguage={setLanguage} color="var(--color-ink)" />

              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t("nav.login")}
                tabIndex={isMenuOpen ? 0 : -1}
                style={{ display: "flex", alignItems: "center", color: "var(--color-ink)" }}
              >
                <UserIcon />
              </Link>
            </div>

            <NavLink
              to="/cart"
              tabIndex={isMenuOpen ? 0 : -1}
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--color-ink)",
              }}
            >
              <CartIcon />
              {t("nav.cart")} ({totalItems})
            </NavLink>
          </div>
        </div>
      </nav>

      <style>{`
        .header-cart-icon-wrap { display: none; }
        .header-cart-count { display: inline-flex; }
        @media (max-width: 720px) {
          .header-nav-desktop { display: none; }
          .header-burger { display: flex !important; }
          .header-cart-label { display: none; }
          .header-cart-count { display: none; }
          .header-cart-icon-wrap { display: inline-flex; }
          .header-search { display: none !important; }
        }
        @media (min-width: 721px) {
          .header-nav-mobile { display: none !important; }
        }
        .header-nav-mobile {
          height: 100vh;
          height: 100dvh;
        }
      `}</style>
    </header>
  );
}

const LANGUAGE_OPTIONS = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

function LanguageDropdown({ language, setLanguage, color }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setIsOpen(false);
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Switch language"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
          color,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        {language.toUpperCase()}
        <span
          style={{
            display: "flex",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            right: 0,
            margin: 0,
            listStyle: "none",
            background: "var(--color-off-white)",
            border: "1px solid var(--color-light-grey)",
            borderRadius: 4,
            minWidth: 130,
            padding: "6px 0",
            boxShadow: "0 8px 24px rgba(17, 24, 32, 0.12)",
            zIndex: 60,
          }}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={language === option.code}
                onClick={() => {
                  setLanguage(option.code);
                  setIsOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: language === option.code ? 700 : 500,
                  color: "var(--color-ink)",
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function UserIcon() {
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
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}

function CartIcon() {
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
      <path d="M3 6h2l2.4 12.2a2 2 0 0 0 2 1.8h8.4a2 2 0 0 0 2-1.6L22 8H6" />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="21" r="1.4" fill="currentColor" stroke="none" />
    </svg>
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

function ChevronDownIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
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
