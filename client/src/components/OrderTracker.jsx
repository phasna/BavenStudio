const STAGE_KEYS = ['account.status.confirmed', 'account.status.preparing', 'account.status.shipped', 'account.status.delivered'];

export default function OrderTracker({ stageIndex, t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {STAGE_KEYS.map((key, index) => {
        const isDone = index <= stageIndex;
        const isLast = index === STAGE_KEYS.length - 1;
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', flex: isLast ? 'none' : 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: isDone ? 'var(--color-ink)' : 'var(--color-light-grey)',
                  flexShrink: 0,
                }}
              />
              <span
                className="eyebrow"
                style={{
                  fontSize: 10,
                  whiteSpace: 'nowrap',
                  color: isDone ? 'var(--color-ink)' : 'var(--color-neutral-grey)',
                }}
              >
                {t(key)}
              </span>
            </div>
            {!isLast && (
              <span
                style={{
                  flex: 1,
                  height: 1,
                  background: index < stageIndex ? 'var(--color-ink)' : 'var(--color-light-grey)',
                  margin: '0 8px 18px',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
