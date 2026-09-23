import { useLanguage } from '../../context/LanguageContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getOrdersByEmail } from '../../lib/orders.js';
import OrderRow from '../../components/OrderRow.jsx';

export default function AccountOrders() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const orders = getOrdersByEmail(user.email);

  return (
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 16 }}>{t('account.ordersTitle')}</h2>

      {orders.length === 0 ? (
        <p style={{ color: 'var(--color-neutral-grey)' }}>{t('account.noOrders')}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} t={t} language={language} />
          ))}
        </div>
      )}
    </section>
  );
}
