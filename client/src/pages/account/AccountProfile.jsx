import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AccountProfile() {
  const { t } = useLanguage();
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: user.fullName, email: user.email });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function updateField(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setSaved(false);
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = t('account.profile.errors.fullName');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = t('account.profile.errors.email');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    updateProfile(form);
    setSaved(true);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 20 }}>{t('account.profile.title')}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380, marginBottom: 32 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="eyebrow">{t('account.profile.fullName')}</span>
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
          <span className="eyebrow">{t('account.profile.email')}</span>
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

        <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
          {t('account.profile.save')}
        </button>

        {saved && (
          <p className="eyebrow" style={{ color: 'var(--color-neutral-grey)' }}>
            {t('account.profile.saved')}
          </p>
        )}
      </form>

      <button type="button" onClick={handleLogout} className="btn btn-outline" style={{ marginBottom: 48 }}>
        {t('account.logout')}
      </button>

      <div style={{ borderTop: '1px solid var(--color-light-grey)', paddingTop: 24 }}>
        <p className="eyebrow" style={{ marginBottom: 8 }}>{t('account.adminLinkNote')}</p>
        <Link to="/admin" style={{ fontSize: 14, color: 'var(--color-ink)', textDecoration: 'underline' }}>
          {t('account.adminLinkCta')}
        </Link>
      </div>
    </section>
  );
}
