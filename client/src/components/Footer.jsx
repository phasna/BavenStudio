import { Link } from 'react-router-dom';

const LINKS = ['Info', 'Stockists', 'Social', 'Support', 'Legal'];

export default function Footer() {
  return (
    <footer style={{ background: '#000000', color: 'var(--color-off-white)' }}>
      <div
        className="container"
        style={{
          padding: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 13,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          {LINKS.map((link) => (
            <Link key={link} to={`/info/${link.toLowerCase()}`} style={{ color: 'inherit' }}>
              {link}
            </Link>
          ))}
        </nav>

        <span style={{ color: 'var(--color-neutral-grey)' }}>
          © 2021 – 2026 Baven Studio. All rights reserved
        </span>
      </div>
    </footer>
  );
}
