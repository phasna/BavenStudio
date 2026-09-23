import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { getProducts, getCategories } from '../../lib/api.js';

const EMPTY_FORM = {
  name: '',
  price: '',
  categoryId: '',
  gender: 'unisexe',
  description: '',
  featured: false,
};

export default function AdminProducts() {
  const { t } = useLanguage();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([p, c]) => {
      setProducts(p);
      setCategories(c);
    });
  }, []);

  function openCreateForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setIsFormOpen(true);
  }

  function openEditForm(product) {
    setForm({
      name: product.name,
      price: String(product.price),
      categoryId: product.category?.id ?? product.categoryId ?? '',
      gender: product.gender,
      description: product.description ?? '',
      featured: !!product.featured,
    });
    setEditingId(product.id);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function updateField(field) {
    return (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const category = categories.find((c) => String(c.id) === String(form.categoryId));

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...form, price: form.price, category, categoryId: category?.id }
            : p
        )
      );
    } else {
      const newProduct = {
        ...form,
        id: `local-${Date.now()}`,
        slug: `local-${Date.now()}`,
        category,
        categoryId: category?.id,
        images: [],
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    closeForm();
  }

  function handleDelete(id) {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      {!isFormOpen && (
        <button type="button" onClick={openCreateForm} className="btn btn-primary" style={{ marginBottom: 24 }}>
          {t('admin.addProduct')}
        </button>
      )}

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          style={{
            border: '1px solid var(--color-light-grey)',
            padding: 24,
            marginBottom: 32,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
          className="admin-form-grid"
        >
          <Field label={t('admin.form.name')} value={form.name} onChange={updateField('name')} required full />
          <Field label={t('admin.form.price')} type="number" step="0.01" value={form.price} onChange={updateField('price')} required />

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="eyebrow">{t('admin.form.category')}</span>
            <select value={form.categoryId} onChange={updateField('categoryId')} required style={selectStyle}>
              <option value="" disabled>
                —
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="eyebrow">{t('admin.form.gender')}</span>
            <select value={form.gender} onChange={updateField('gender')} style={selectStyle}>
              <option value="unisexe">Unisexe</option>
              <option value="femme">Femme</option>
              <option value="homme">Homme</option>
            </select>
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
            <span className="eyebrow">{t('admin.form.description')}</span>
            <textarea
              value={form.description}
              onChange={updateField('description')}
              rows={3}
              style={{ ...selectStyle, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, gridColumn: '1 / -1' }}>
            <input type="checkbox" checked={form.featured} onChange={updateField('featured')} />
            <span className="eyebrow">{t('admin.table.featured')}</span>
          </label>

          <div style={{ display: 'flex', gap: 12, gridColumn: '1 / -1' }}>
            <button type="submit" className="btn btn-primary">
              {t('admin.save')}
            </button>
            <button type="button" onClick={closeForm} className="btn btn-outline">
              {t('admin.cancel')}
            </button>
          </div>
        </form>
      )}

      {products === null && <p style={{ color: 'var(--color-neutral-grey)' }}>{t('admin.loading')}</p>}

      {products && products.length === 0 && (
        <p style={{ color: 'var(--color-neutral-grey)' }}>{t('admin.noProducts')}</p>
      )}

      {products && products.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                <Th>{t('admin.table.name')}</Th>
                <Th>{t('admin.table.category')}</Th>
                <Th>{t('admin.table.price')}</Th>
                <Th>{t('admin.table.gender')}</Th>
                <Th>{t('admin.table.featured')}</Th>
                <Th>{t('admin.table.actions')}</Th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '10px 8px', color: 'var(--color-neutral-grey)' }}>
                    {p.category?.name ?? '—'}
                  </td>
                  <td style={{ padding: '10px 8px' }}>{Number(p.price).toFixed(0)} €</td>
                  <td style={{ padding: '10px 8px', color: 'var(--color-neutral-grey)', textTransform: 'capitalize' }}>
                    {p.gender}
                  </td>
                  <td style={{ padding: '10px 8px' }}>{p.featured ? '✓' : ''}</td>
                  <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      onClick={() => openEditForm(p)}
                      className="eyebrow"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 16 }}
                    >
                      {t('admin.edit')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
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

const selectStyle = {
  padding: '12px 14px',
  border: '1px solid var(--color-light-grey)',
  fontSize: 14,
  background: 'var(--color-off-white)',
  color: 'var(--color-ink)',
};

function Field({ label, full, ...inputProps }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: full ? '1 / -1' : 'auto' }}>
      <span className="eyebrow">{label}</span>
      <input {...inputProps} style={selectStyle} />
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
