import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}>404</h1>
      <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 24 }}>Cette page n'existe pas.</p>
      <Link to="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}
