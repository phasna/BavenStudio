import { Link, NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';

export default function AdminLayout() {
  const { t } = useLanguage();

  return (
    <DashboardLayout
      sidebar={
        <>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{t('admin.title')}</div>
            <div className="eyebrow" style={{ color: 'var(--color-neutral-grey)' }}>
              {t('admin.subtitle')}
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 'auto' }}>
            <SidebarLink to="/admin" end label={t('admin.nav.dashboard')} />
            <SidebarLink to="/admin/products" label={t('admin.nav.products')} />
            <SidebarLink to="/admin/orders" label={t('admin.nav.orders')} />
            <SidebarLink to="/admin/promotions" label={t('admin.nav.promotions')} />
            <SidebarLink to="/admin/profile" label={t('admin.nav.profile')} />
          </nav>

          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--color-light-grey)' }}>
            <Link to="/account" style={{ fontSize: 13, color: 'var(--color-ink)', textDecoration: 'underline' }}>
              {t('admin.backToAccount')}
            </Link>
          </div>
        </>
      }
    >
      <p
        className="eyebrow"
        style={{
          color: 'var(--color-error)',
          border: '1px solid var(--color-error)',
          padding: '10px 14px',
          marginBottom: 32,
          display: 'inline-block',
        }}
      >
        {t('admin.demoBanner')}
      </p>

      <Outlet />
    </DashboardLayout>
  );
}

function SidebarLink({ to, end, label }) {
  return (
    <NavLink
      to={to}
      end={end}
      className="eyebrow"
      style={({ isActive }) => ({
        padding: '10px 12px',
        borderRadius: 4,
        background: isActive ? 'var(--color-light-grey)' : 'transparent',
        color: 'var(--color-ink)',
      })}
    >
      {label}
    </NavLink>
  );
}
