import { Link } from "react-router-dom";
import logoBlack from "../assets/Logo/baven_logo_black.png";
import logoWhite from "../assets/Logo/baven_logo_white.png";

export default function Logo({ variant = "ink", size = "md" }) {
  const src = variant === "off-white" ? logoWhite : logoBlack;
  const height = size === "lg" ? "clamp(48px, 8vw, 100px)" : 24;

  return (
    <Link
      to="/"
      aria-label="Baven Studio — Accueil"
      style={{
        display: "inline-flex",
        alignItems: "center",
        lineHeight: 0,
      }}
    >
      <img src={src} alt="Baven Studio" style={{ height, width: "auto" }} />
    </Link>
  );
}
