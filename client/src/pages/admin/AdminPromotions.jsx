import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { usePromotions } from '../../context/PromotionsContext.jsx';

const EMPTY_FORM = { code: '', percent: '', description: '', expiresAt: '' };

export default function AdminPromotions() {
  const { t, language } = useLanguage();
  const { promotions, addPromotion, removePromotion, togglePromotion } = usePromotions();
  const [form, setForm] = useState(EMPTY_FORM);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addPromotion({
      code: form.code.trim().toUpperCase(),
      percent: Number(form.percent),
      description: form.description.trim(),
      expiresAt: form.expiresAt || null,
    });
    setForm(EMPTY_FORM);
    setIsFormOpen(false);
  }

  function handleDelete(id) {
    if (!window.confirm(t('admin.promotions.confirmDelete'))) return;
    removePromotion(id);
  }

  return (
    <div>
      {!isFormOpen && (
        <button type="button" onClick={() => setIsFormOpen(true)} className="btn btn-primary" style={{ marginBottom: 24 }}>
          {t('admin.promotions.add')}
        </button>
      )}

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="admin-form-grid"
          style={{
            border: '1px solid var(--color-light-grey)',
            padding: 24,
            marginBottom: 32,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          <Field label={t('admin.promotions.form.code')} value={form.code} onChange={updateField('code')} required />
          <Field
            label={t('admin.promotions.form.percent')}
            type="number"
            min="1"
            max="100"
            value={form.percent}
            onChange={updateField('percent')}
            required
          />
          <Field
            label={t('admin.promotions.form.description')}
            value={form.description}
            onChange={updateField('description')}
            full
          />
          <Field
            label={t('admin.promotions.form.expiresAt')}
            type="date"
            value={form.expiresAt}
            onChange={updateField('expiresAt')}
          />

          <div style={{ display: 'flex', gap: 12, gridColumn: '1 / -1' }}>
            <button type="submit" className="btn btn-primary">
              {t('admin.save')}
            </button>
            <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-outline">
              {t('admin.cancel')}
            </button>
          </div>
        </form>
      )}

      {promotions.length === 0 ? (
        <p style={{ color: 'var(--color-neutral-grey)' }}>{t('admin.promotions.empty')}</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                <Th>{t('admin.promotions.table.code')}</Th>
                <Th>{t('admin.promotions.table.discount')}</Th>
                <Th>{t('admin.promotions.table.description')}</Th>
                <Th>{t('admin.promotions.table.expiresAt')}</Th>
                <Th>{t('admin.promotions.table.status')}</Th>
                <Th>{t('admin.promotions.table.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.id} style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600 }}>{promo.code}</td>
                  <td style={{ padding: '10px 8px' }}>-{promo.percent}%</td>
                  <td style={{ padding: '10px 8px', color: 'var(--color-neutral-grey)' }}>{promo.description || '—'}</td>
                  <td style={{ padding: '10px 8px', color: 'var(--color-neutral-grey)' }}>
                    {promo.expiresAt
                      ? new Date(promo.expiresAt).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')
                      : t('admin.promotions.noExpiry')}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <span
                      className="eyebrow"
                      style={{
                        padding: '4px 10px',
                        borderRadius: 999,
                        background: promo.active ? 'var(--color-ink)' : 'var(--color-light-grey)',
                        color: promo.active ? 'var(--color-off-white)' : 'var(--color-ink)',
                      }}
                    >
                      {promo.active ? t('admin.promotions.active') : t('admin.promotions.inactive')}
                    </span>
                  </td>
                  <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      onClick={() => togglePromotion(promo.id)}
                      className="eyebrow"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 16 }}
                    >
                      {promo.active ? t('admin.promotions.deactivate') : t('admin.promotions.activate')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(promo.id)}
                      className="eyebrow"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}
                    >
                      {t('admin.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .admin-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Field({ label, full, ...inputProps }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: full ? '1 / -1' : 'auto' }}>
      <span className="eyebrow">{label}</span>
      <input
        {...inputProps}
        style={{
          padding: '12px 14px',
          border: '1px solid var(--color-light-grey)',
          fontSize: 14,
          background: 'var(--color-off-white)',
          color: 'var(--color-ink)',
        }}
      />
    </label>
  );
}

function Th({ children }) {
  return (
    <th className="eyebrow" style={{ textAlign: 'left', padding: '0 8px 10px' }}>
      {children}
    </th>
  );
}
