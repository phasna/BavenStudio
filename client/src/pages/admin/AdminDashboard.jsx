import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { usePromotions } from '../../context/PromotionsContext.jsx';
import { getProducts, getCategories } from '../../lib/api.js';
import { getAllOrders, getOrderStageIndex } from '../../lib/orders.js';

const STAGE_KEYS = ['account.status.confirmed', 'account.status.preparing', 'account.status.shipped', 'account.status.delivered'];

export default function AdminDashboard() {
  const { t, language } = useLanguage();
  const { promotions } = usePromotions();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([p, c]) => {
      setProducts(p);
      setCategories(c);
    });
  }, []);

  const orders = getAllOrders();
  const featuredCount = products?.filter((p) => p.featured).length ?? 0;
  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const activePromotions = promotions.filter((p) => p.active).length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <div style={{ display: 'flex', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}>
        <Stat label={t('admin.stats.products')} value={products?.length ?? '—'} />
        <Stat label={t('admin.stats.categories')} value={categories.length} />
        <Stat label={t('admin.stats.featured')} value={featuredCount} />
        <Stat label={t('admin.stats.orders')} value={orders.length} />
        <Stat label={t('admin.stats.revenue')} value={`${revenue.toFixed(0)} €`} />
        <Stat label={t('admin.stats.promotions')} value={activePromotions} />
      </div>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>{t('admin.dashboard.recentOrdersTitle')}</h2>

        {recentOrders.length === 0 ? (
          <p style={{ color: 'var(--color-neutral-grey)' }}>{t('admin.dashboard.noOrders')}</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                  <Th>{t('admin.orders.table.id')}</Th>
                  <Th>{t('admin.orders.table.date')}</Th>
                  <Th>{t('admin.orders.table.customer')}</Th>
                  <Th>{t('admin.orders.table.total')}</Th>
                  <Th>{t('admin.orders.table.status')}</Th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const stageIndex = getOrderStageIndex(order);
                  const date = new Date(order.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                      <td style={{ padding: '10px 8px', fontWeight: 600 }}>{order.id}</td>
                      <td style={{ padding: '10px 8px', color: 'var(--color-neutral-grey)' }}>{date}</td>
                      <td style={{ padding: '10px 8px' }}>{order.fullName || order.email}</td>
                      <td style={{ padding: '10px 8px', fontWeight: 600 }}>{Number(order.total).toFixed(0)} €</td>
                      <td style={{ padding: '10px 8px' }}>{t(STAGE_KEYS[stageIndex])}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {orders.length > 0 && (
          <Link
            to="/admin/orders"
            style={{ display: 'inline-block', marginTop: 20, fontSize: 14, color: 'var(--color-ink)', textDecoration: 'underline' }}
          >
            {t('admin.dashboard.viewAllOrders')}
          </Link>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 28, fontWeight: 700 }}>{value}</div>
      <div className="eyebrow">{label}</div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="eyebrow" style={{ textAlign: 'left', padding: '0 8px 10px' }}>
      {children}
    </th>
  );
}
