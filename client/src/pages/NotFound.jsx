import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}>404</h1>
      <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 24 }}>{t('notfound.message')}</p>
      <Link to="/" className="btn btn-primary">
        {t('notfound.backHome')}
      </Link>
    </div>
  );
}
