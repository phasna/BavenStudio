const STORAGE_KEY = 'baven-orders';

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    /* ignore */
  }
}

export function addOrder(order) {
  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

export function getOrdersByEmail(email) {
  if (!email) return [];
  return loadOrders().filter((order) => order.email?.toLowerCase() === email.toLowerCase());
}

export function getAllOrders() {
  return loadOrders();
}

export const ORDER_STAGES = ['confirmed', 'preparing', 'shipped', 'delivered'];

export function getOrderStageIndex(order) {
  const hoursElapsed = (Date.now() - new Date(order.date).getTime()) / (1000 * 60 * 60);
  if (hoursElapsed < 1) return 0;
  if (hoursElapsed < 24) return 1;
  if (hoursElapsed < 72) return 2;
  return 3;
}
