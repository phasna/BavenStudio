import { Link } from 'react-router-dom';
import femmeImage from '../assets/femme.jpg';
import hommeImage from '../assets/homme.jpg';

const SIDES = [
  { label: 'Femme', gender: 'femme', image: femmeImage },
  { label: 'Homme', gender: 'homme', image: hommeImage },
];

export default function GenderSplit() {
  return (
    <section
      className="gender-split"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}
    >
      {SIDES.map((side) => (
        <Link
          key={side.gender}
          to={`/shop?gender=${side.gender}`}
          className="gender-split-panel"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 32,
            backgroundImage: `url(${side.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              position: 'relative',
              zIndex: 1,
              fontFamily: 'var(--font-logo)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 48px)',
              color: 'var(--color-off-white)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            {side.label}
          </span>
        </Link>
      ))}

      <style>{`
        .gender-split-panel {
          transition: filter 0.2s ease;
        }
        .gender-split-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(17, 24, 32, 0.75) 0%, rgba(17, 24, 32, 0) 40%),
            linear-gradient(to bottom, rgba(17, 24, 32, 0.45) 0%, rgba(17, 24, 32, 0) 15%);
        }
        .gender-split-panel:hover {
          filter: brightness(1.08);
        }
        @media (max-width: 720px) {
          .gender-split {
            grid-template-columns: 1fr !important;
          }
          .gender-split-panel {
            min-height: 50vh;
          }
        }
      `}</style>
    </section>
  );
}
