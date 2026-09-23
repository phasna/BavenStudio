import { createContext, useContext, useEffect, useState } from 'react';

const PromotionsContext = createContext(null);
const STORAGE_KEY = 'baven-promotions';

const DEFAULT_PROMOTIONS = [
  {
    id: 'promo-welcome10',
    code: 'WELCOME10',
    percent: 10,
    description: '10% de réduction pour toute première commande.',
    active: true,
    expiresAt: null,
  },
];

function loadPromotions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_PROMOTIONS;
  } catch {
    return DEFAULT_PROMOTIONS;
  }
}

export function PromotionsProvider({ children }) {
  const [promotions, setPromotions] = useState(loadPromotions);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(promotions));
    } catch {
      /* ignore */
    }
  }, [promotions]);

  function addPromotion(promo) {
    setPromotions((prev) => [{ id: `promo-${Date.now()}`, active: true, ...promo }, ...prev]);
  }

  function updatePromotion(id, patch) {
    setPromotions((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function removePromotion(id) {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  }

  function togglePromotion(id) {
    setPromotions((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }

  const value = { promotions, addPromotion, updatePromotion, removePromotion, togglePromotion };

  return <PromotionsContext.Provider value={value}>{children}</PromotionsContext.Provider>;
}

export function usePromotions() {
  const ctx = useContext(PromotionsContext);
  if (!ctx) throw new Error('usePromotions doit être utilisé dans un PromotionsProvider');
  return ctx;
}
