import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminProfile() {
  const { t } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName ?? '', email: user?.email ?? '' });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 24 }}>{t('admin.profile.notLoggedIn')}</p>
        <Link to="/login" className="btn btn-primary">
          {t('admin.profile.loginCta')}
        </Link>
      </div>
    );
  }

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

  return (
    <div>
      <h2 style={{ fontSize: 18, marginBottom: 20 }}>{t('admin.profile.title')}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380 }}>
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
    </div>
  );
}
