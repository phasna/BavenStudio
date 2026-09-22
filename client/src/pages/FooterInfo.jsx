import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const TOPICS = {
  info: { title: 'Info', sectionsKey: 'footer.info.sections' },
  stockists: { title: 'Stockists', sectionsKey: 'footer.stockists.sections' },
  social: { title: 'Social', sectionsKey: 'footer.social.sections' },
  support: { title: 'Support', sectionsKey: 'footer.support.sections' },
  legal: { title: 'Legal', sectionsKey: 'footer.legal.sections' },
};

export default function FooterInfo() {
  const { topic } = useParams();
  const { t } = useLanguage();
  const entry = TOPICS[topic];

  if (!entry) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 24 }}>{t('notfound.message')}</p>
        <Link to="/" className="btn btn-primary">
          {t('footer.back')}
        </Link>
      </div>
    );
  }

  const sections = t(entry.sectionsKey);

  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 48 }}>{entry.title}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>
              {section.heading}
            </h2>
            <p style={{ color: 'var(--color-neutral-grey)', lineHeight: 1.7 }}>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
