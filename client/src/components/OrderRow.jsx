import { useState } from 'react';
import { getOrderStageIndex } from '../lib/orders.js';

const STAGE_KEYS = ['account.status.confirmed', 'account.status.preparing', 'account.status.shipped', 'account.status.delivered'];

export default function OrderRow({ order, t, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const stageIndex = getOrderStageIndex(order);
  const statusLabel = t(STAGE_KEYS[stageIndex]);
  const date = new Date(order.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ border: '1px solid var(--color-light-grey)' }}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '16px 20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{order.id}</div>
          <div className="eyebrow" style={{ color: 'var(--color-neutral-grey)' }}>
            {date} · {itemCount} {itemCount > 1 ? t('account.orderItemsPlural') : t('account.orderItems')}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            className="eyebrow"
            style={{
              padding: '4px 10px',
              borderRadius: 999,
              background: stageIndex === 3 ? 'var(--color-ink)' : 'var(--color-light-grey)',
              color: stageIndex === 3 ? 'var(--color-off-white)' : 'var(--color-ink)',
            }}
          >
            {statusLabel}
          </span>
          <span style={{ fontWeight: 600 }}>{Number(order.total).toFixed(0)} €</span>
          <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
            ▾
          </span>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {order.items.map((item, index) => (
            <div
              key={`${item.slug}-${index}`}
              style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14 }}
            >
              <span>
                {item.name}{' '}
                <span style={{ color: 'var(--color-neutral-grey)' }}>
                  × {item.quantity}
                  {item.size ? ` · ${item.size}` : ''}
                  {item.color ? ` · ${item.color}` : ''}
                </span>
              </span>
              <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                {(item.price * item.quantity).toFixed(0)} €
              </span>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--color-light-grey)',
              paddingTop: 10,
              marginTop: 4,
              fontWeight: 600,
            }}
          >
            <span>{t('account.orderTotal')}</span>
            <span>{Number(order.total).toFixed(0)} €</span>
          </div>
        </div>
      )}
    </div>
  );
}
