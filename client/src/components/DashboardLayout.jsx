import { Link } from 'react-router-dom';
import logo from '../assets/Logo/baven_logo.png';

export default function DashboardLayout({ sidebar, children }) {
  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        className="dashboard-sidebar"
        style={{
          width: 260,
          flexShrink: 0,
          borderRight: '1px solid var(--color-light-grey)',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 24px',
        }}
      >
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, marginBottom: 40 }}>
          <img src={logo} alt="Baven Studio" style={{ height: 28, width: 'auto', filter: 'invert(1)' }} />
        </Link>

        {sidebar}
      </aside>

      <main className="dashboard-main" style={{ flex: 1, minWidth: 0, padding: '40px 48px' }}>
        {children}
      </main>

      <style>{`
        @media (max-width: 860px) {
          .dashboard-layout { flex-direction: column; }
          .dashboard-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid var(--color-light-grey);
            padding: 20px 24px !important;
          }
          .dashboard-main { padding: 32px 24px !important; }
        }
      `}</style>
    </div>
  );
}
