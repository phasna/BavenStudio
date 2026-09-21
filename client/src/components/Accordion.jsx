import { useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ borderTop: '1px solid var(--color-light-grey)', marginTop: 8 }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
              }}
            >
              {item.title}
              <span style={{ fontSize: 18, fontWeight: 400, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div style={{ paddingBottom: 20, color: 'var(--color-neutral-grey)', fontSize: 14, lineHeight: 1.7 }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
