export function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const keys = {
  cart: "dhanya.cart.v1",
  wishlist: "dhanya.wishlist.v1",
  recent: "dhanya.recent.v1",
  account: "dhanya.account.v1",
  orders: "dhanya.orders.v1",
  newsletter: "dhanya.newsletter.v1",
};
