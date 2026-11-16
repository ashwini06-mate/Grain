import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getProduct } from "../data/products";
import { keys, readStore, writeStore } from "../utils/storage";

const StoreContext = createContext(null);

function uid(prefix) {
  return `${prefix}${Date.now().toString(36).toUpperCase()}`;
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStore(keys.cart, []));
  const [wishlist, setWishlist] = useState(() => readStore(keys.wishlist, []));
  const [recent, setRecent] = useState(() => readStore(keys.recent, []));
  const [account, setAccount] = useState(() => readStore(keys.account, null));
  const [orders, setOrders] = useState(() => readStore(keys.orders, []));
  const [toasts, setToasts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartRef = useRef(cart);
  cartRef.current = cart;

  useEffect(() => writeStore(keys.cart, cart), [cart]);
  useEffect(() => writeStore(keys.wishlist, wishlist), [wishlist]);
  useEffect(() => writeStore(keys.recent, recent), [recent]);
  useEffect(() => writeStore(keys.account, account), [account]);
  useEffect(() => writeStore(keys.orders, orders), [orders]);

  useEffect(() => {
    const locked = cartOpen || searchOpen || menuOpen;
    document.body.classList.toggle("nav-lock", locked);
    return () => document.body.classList.remove("nav-lock");
  }, [cartOpen, searchOpen, menuOpen]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") {
        setCartOpen(false);
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toast = (message, tone = "success") => {
    const id = uid("t");
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3200);
  };

  const dismissToast = (id) => setToasts((prev) => prev.filter((item) => item.id !== id));

  const qtyOf = (list, productId) =>
    list.filter((line) => line.productId === productId).reduce((sum, line) => sum + line.qty, 0);

  const addToCart = (productId, size, qty = 1) => {
    const product = getProduct(productId);
    if (!product || product.stock <= 0) {
      toast(`${product?.name || "This grain"} is out of stock.`, "error");
      return { ok: false };
    }
    const current = cartRef.current;
    const room = product.stock - qtyOf(current, productId);
    if (room <= 0) {
      toast(`Only ${product.stock} in stock for ${product.name}.`, "error");
      return { ok: false };
    }
    const nextQty = Math.min(Math.max(1, qty), room);
    setCart((prev) => {
      const existing = prev.find((line) => line.productId === productId && line.size === size);
      if (existing) {
        return prev.map((line) =>
          line.productId === productId && line.size === size ? { ...line, qty: line.qty + nextQty } : line,
        );
      }
      return [...prev, { productId, size, qty: nextQty }];
    });
    toast(nextQty < qty ? `Added ${nextQty} — only ${product.stock} in stock.` : `Added ${product.name} (${size})`);
    return { ok: true };
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) => prev.filter((line) => !(line.productId === productId && line.size === size)));
  };

  const updateQty = (productId, size, qty) => {
    const product = getProduct(productId);
    if (!product) return;
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    const others = qtyOf(
      cartRef.current.filter((line) => !(line.productId === productId && line.size === size)),
      productId,
    );
    const nextQty = Math.min(qty, Math.max(0, product.stock - others));
    if (nextQty < qty) toast(`Only ${product.stock} in stock for ${product.name}.`, "error");
    if (nextQty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) => prev.map((line) => (line.productId === productId && line.size === size ? { ...line, qty: nextQty } : line)));
  };

  const setLineSize = (productId, fromSize, toSize) => {
    if (fromSize === toSize) return;
    setCart((prev) => {
      const merged = prev.map((line) =>
        line.productId === productId && line.size === fromSize ? { ...line, size: toSize } : line,
      );
      const map = new Map();
      merged.forEach((line) => {
        const key = `${line.productId}|${line.size}`;
        const existing = map.get(key);
        if (existing) existing.qty += line.qty;
        else map.set(key, { ...line });
      });
      return [...map.values()];
    });
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    const product = getProduct(productId);
    const has = wishlist.includes(productId);
    setWishlist(has ? wishlist.filter((item) => item !== productId) : [productId, ...wishlist]);
    toast(has ? `Removed ${product?.name || "item"} from wishlist` : `Saved ${product?.name || "item"} to wishlist`);
  };

  const viewProduct = (productId) => {
    setRecent((prev) => [productId, ...prev.filter((item) => item !== productId)].slice(0, 8));
  };

  const saveAccount = (next) => {
    setAccount(next);
    toast("Details saved on this device");
  };

  const signOut = () => {
    setAccount(null);
    toast("Device profile cleared");
  };

  const placeOrder = (details) => {
    const order = {
      id: uid("DH"),
      createdAt: new Date().toISOString(),
      ...details,
      paymentNote: "Demonstration checkout. No payment was processed.",
    };
    setOrders((prev) => [order, ...prev].slice(0, 20));
    setCart([]);
    return order;
  };

  const api = {
    cart,
    wishlist,
    recent,
    account,
    orders,
    toasts,
    cartOpen,
    searchOpen,
    menuOpen,
    setCartOpen,
    setSearchOpen,
    setMenuOpen,
    addToCart,
    removeFromCart,
    updateQty,
    setLineSize,
    clearCart,
    toggleWishlist,
    viewProduct,
    toast,
    dismissToast,
    saveAccount,
    signOut,
    placeOrder,
    count: cart.reduce((sum, line) => sum + line.qty, 0),
  };

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}
