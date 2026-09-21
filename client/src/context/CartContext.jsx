import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'baven-cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function lineKey(item) {
  return [item.productId, item.size, item.color].join('::');
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product, { size, color, quantity = 1 }) {
    setItems((prev) => {
      const newLine = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] ?? null,
        size,
        color,
        quantity,
      };
      const key = lineKey(newLine);
      const existing = prev.find((item) => lineKey(item) === key);

      if (existing) {
        return prev.map((item) =>
          lineKey(item) === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, newLine];
    });
  }

  function updateQuantity(key, quantity) {
    setItems((prev) =>
      prev
        .map((item) => (lineKey(item) === key ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(key) {
    setItems((prev) => prev.filter((item) => lineKey(item) !== key));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items]
  );

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
    lineKey,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans un CartProvider');
  return ctx;
}
