import { Link } from "react-router-dom";

export default function Logo({ variant = "ink", size = "md" }) {
  const color =
    variant === "off-white" ? "var(--color-off-white)" : "var(--color-ink)";
  const fontSize = size === "lg" ? "clamp(48px, 10vw, 120px)" : "22px";

  return (
    <Link
      to="/"
      aria-label="Baven Studio — Accueil"
      style={{
        fontFamily: "var(--font-logo)",
        fontWeight: 700,
        fontSize,
        color,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        display: "inline-block",
        textTransform: "none",
      }}
    >
      Baven studio
    </Link>
  );
}
