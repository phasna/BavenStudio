import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import DashboardLayout from '../../components/DashboardLayout.jsx';

export default function AccountLayout() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container section" style={{ maxWidth: 440, textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 12 }}>
          {t('account.notLoggedIn.title')}
        </h1>
        <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 32 }}>
          {t('account.notLoggedIn.subtitle')}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" className="btn btn-primary">
            {t('account.notLoggedIn.loginCta')}
          </Link>
          <Link to="/register" className="btn btn-outline">
            {t('account.notLoggedIn.registerCta')}
          </Link>
        </div>
      </div>
    );
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <DashboardLayout
      sidebar={
        <>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{user.fullName}</div>
            <div className="eyebrow" style={{ color: 'var(--color-neutral-grey)' }}>{user.email}</div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 'auto' }}>
            <SidebarLink to="/account" end label={t('account.nav.home')} />
            <SidebarLink to="/account/orders" label={t('account.nav.orders')} />
            <SidebarLink to="/account/profile" label={t('account.nav.profile')} />
          </nav>

          <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--color-light-grey)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 6, color: 'var(--color-neutral-grey)' }}>
                {t('account.adminLinkNote')}
              </p>
              <Link to="/admin" style={{ fontSize: 13, color: 'var(--color-ink)', textDecoration: 'underline' }}>
                {t('account.adminLinkCta')}
              </Link>
            </div>
            <button type="button" onClick={handleLogout} className="btn btn-outline" style={{ width: '100%' }}>
              {t('account.logout')}
            </button>
          </div>
        </>
      }
    >
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
