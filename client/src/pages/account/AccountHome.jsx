import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getOrdersByEmail, getOrderStageIndex } from '../../lib/orders.js';
import OrderTracker from '../../components/OrderTracker.jsx';

const STAGE_KEYS = ['account.status.confirmed', 'account.status.preparing', 'account.status.shipped', 'account.status.delivered'];

export default function AccountHome() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const orders = getOrdersByEmail(user.email);
  const ongoing = orders
    .map((order) => ({ order, stageIndex: getOrderStageIndex(order) }))
    .filter(({ stageIndex }) => stageIndex < 3);

  return (
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 16 }}>{t('account.home.ongoingTitle')}</h2>

      {ongoing.length === 0 ? (
        <div style={{ marginBottom: 8 }}>
          <p style={{ color: 'var(--color-neutral-grey)', marginBottom: 16 }}>{t('account.home.noOngoing')}</p>
          <Link to="/shop" className="btn btn-outline">
            {t('account.home.shopCta')}
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {ongoing.map(({ order, stageIndex }) => {
            const date = new Date(order.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return (
              <div key={order.id} style={{ border: '1px solid var(--color-light-grey)', padding: 20 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{order.id}</div>
                    <div className="eyebrow" style={{ color: 'var(--color-neutral-grey)' }}>
                      {date}
                    </div>
                  </div>
                  <span style={{ fontWeight: 600 }}>{Number(order.total).toFixed(0)} €</span>
                </div>

                <OrderTracker stageIndex={stageIndex} t={t} />

                <p className="eyebrow" style={{ color: 'var(--color-neutral-grey)', marginTop: 16 }}>
                  {stageIndex < 3 && t('account.home.nextStep', t(STAGE_KEYS[stageIndex + 1]))}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {orders.length > 0 && (
        <Link
          to="/account/orders"
          style={{ display: 'inline-block', marginTop: 24, fontSize: 14, color: 'var(--color-ink)', textDecoration: 'underline' }}
        >
          {t('account.home.viewAllOrders')}
        </Link>
      )}
    </section>
  );
}
