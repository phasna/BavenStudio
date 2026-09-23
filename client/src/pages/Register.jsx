import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { HEADER_HEIGHT } from '../components/Header.jsx';
import registerImage from '../assets/register-hero.png';

const INITIAL_FORM = { fullName: '', email: '', password: '', confirmPassword: '' };

export default function Register() {
  const { t } = useLanguage();
  const { login } = useAuth();
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
    if (!form.fullName.trim()) nextErrors.fullName = t('register.errors.fullName');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = t('register.errors.email');
    if (form.password.length < 8) nextErrors.password = t('register.errors.password');
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = t('register.errors.confirmPassword');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    login({ fullName: form.fullName, email: form.email });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="container section"
        style={{
          textAlign: 'center',
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16 }}>
          {t('register.success', form.fullName.split(' ')[0])}
        </h1>
        <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 32 }}>{t('register.successNote')}</p>
        <Link to="/account" className="btn btn-primary">
          {t('register.viewAccount')}
        </Link>
      </div>
    );
  }

  return (
    <div className="login-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
      <div
        className="login-image"
        style={{
          position: 'relative',
          backgroundImage: `url(${registerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          alignItems: 'flex-end',
          padding: 40,
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-logo)',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'var(--color-off-white)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}
        >
          Become. Evolve.
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 12 }}>{t('register.title')}</h1>
          <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 32 }}>{t('register.subtitle')}</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="eyebrow">{t('register.fullName')}</span>
              <input
                type="text"
                value={form.fullName}
                onChange={updateField('fullName')}
                style={{
                  padding: '12px 14px',
                  border: `1px solid ${errors.fullName ? 'var(--color-error)' : 'var(--color-light-grey)'}`,
                  fontSize: 14,
                  background: 'var(--color-off-white)',
                  color: 'var(--color-ink)',
                }}
              />
              {errors.fullName && <span style={{ fontSize: 12, color: 'var(--color-error)' }}>{errors.fullName}</span>}
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="eyebrow">{t('register.email')}</span>
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
              <span className="eyebrow">{t('register.password')}</span>
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

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="eyebrow">{t('register.confirmPassword')}</span>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={updateField('confirmPassword')}
                style={{
                  padding: '12px 14px',
                  border: `1px solid ${errors.confirmPassword ? 'var(--color-error)' : 'var(--color-light-grey)'}`,
                  fontSize: 14,
                  background: 'var(--color-off-white)',
                  color: 'var(--color-ink)',
                }}
              />
              {errors.confirmPassword && (
                <span style={{ fontSize: 12, color: 'var(--color-error)' }}>{errors.confirmPassword}</span>
              )}
            </label>

            <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
              {t('register.submit')}
            </button>

            <p className="eyebrow" style={{ color: 'var(--color-neutral-grey)' }}>
              {t('register.demoNote')}
            </p>
          </form>

          <p style={{ marginTop: 24, fontSize: 14, color: 'var(--color-neutral-grey)' }}>
            {t('register.haveAccount')}{' '}
            <Link to="/login" style={{ color: 'var(--color-ink)', textDecoration: 'underline' }}>
              {t('register.login')}
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        .login-image {
          display: flex;
        }
        .login-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(17, 24, 32, 0.75) 0%, rgba(17, 24, 32, 0) 40%),
            linear-gradient(to bottom, rgba(17, 24, 32, 0.45) 0%, rgba(17, 24, 32, 0) 15%);
        }
        @media (max-width: 860px) {
          .login-split {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .login-image {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
