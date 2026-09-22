import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';

const INITIAL_FORM = { email: '', password: '' };

export default function Login() {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = t('login.errors.email');
    if (!form.password.trim()) nextErrors.password = t('login.errors.password');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  return (
    <div className="container section" style={{ maxWidth: 440 }}>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 12 }}>{t('login.title')}</h1>
      <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 32 }}>{t('login.subtitle')}</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="eyebrow">{t('login.email')}</span>
          <input
            type="email"
            value={form.email}
            onChange={updateField('email')}
            style={{
              padding: '12px 14px',
              border: `1px solid ${errors.email ? 'var(--color-error)' : 'var(--color-light-grey)'}`,
              fontSize: 14,
              background: 'var(--color-off-white)',
              color: 'var(--color-ink)',
            }}
          />
          {errors.email && <span style={{ fontSize: 12, color: 'var(--color-error)' }}>{errors.email}</span>}
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="eyebrow">{t('login.password')}</span>
          <input
            type="password"
            value={form.password}
            onChange={updateField('password')}
            style={{
              padding: '12px 14px',
              border: `1px solid ${errors.password ? 'var(--color-error)' : 'var(--color-light-grey)'}`,
              fontSize: 14,
              background: 'var(--color-off-white)',
              color: 'var(--color-ink)',
            }}
          />
          {errors.password && <span style={{ fontSize: 12, color: 'var(--color-error)' }}>{errors.password}</span>}
        </label>

        <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
          {t('login.submit')}
        </button>

        {submitted && (
          <p className="eyebrow" style={{ color: 'var(--color-neutral-grey)' }}>
            {t('login.demoNote')}
          </p>
        )}
      </form>

      <p style={{ marginTop: 24, fontSize: 14, color: 'var(--color-neutral-grey)' }}>
        {t('login.noAccount')}{' '}
        <Link to="/login" style={{ color: 'var(--color-ink)', textDecoration: 'underline' }}>
          {t('login.createAccount')}
        </Link>
      </p>
    </div>
  );
}
