import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { getProduct } from "../data/products";
import { useStore } from "../context/StoreContext";
import { cartMoney, inr, resolveLines } from "../utils/pricing";
import QuantitySelector from "./QuantitySelector";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQty, removeFromCart } = useStore();
  const lines = resolveLines(cart, getProduct);
  const money = cartMoney(lines);
  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close cart" onClick={() => setCartOpen(false)} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl" aria-label="Shopping cart">
        <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
          <h2 className="font-display text-3xl text-forest">Your cart</h2>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close cart" onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-forest/20 bg-white p-6 text-center">
              <p className="font-display text-3xl text-forest">The cart is empty</p>
              <p className="mt-2 text-sm text-ink/65">Add a rice or wheat pack, then come back to review delivery.</p>
              <Link to="/shop" onClick={() => setCartOpen(false)} className="mt-5 inline-flex h-11 items-center rounded-full bg-forest px-5 text-sm font-semibold text-cream">
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.size}`} className="flex gap-3 rounded-2xl bg-white p-3">
                  <img src={line.product.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-forest">{line.product.name}</p>
                    <p className="text-sm text-ink/55">{line.size}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantitySelector value={line.qty} max={line.product.stock} onChange={(qty) => updateQty(line.productId, line.size, qty)} />
                      <p className="text-sm font-semibold">{inr(line.lineTotal)}</p>
                    </div>
                    <button type="button" className="mt-1 text-xs font-semibold text-olive" onClick={() => removeFromCart(line.productId, line.size)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="border-t border-forest/10 bg-white px-5 py-4">
            <Row label="Subtotal" value={inr(money.subtotal)} />
            <Row label="Delivery" value={money.delivery === 0 ? "Free" : inr(money.delivery)} />
            <Row label="Total" value={inr(money.total)} strong />
            <div className="mt-4 grid gap-2">
              <Link to="/checkout" onClick={() => setCartOpen(false)} className="inline-flex h-12 items-center justify-center rounded-full bg-forest text-sm font-semibold text-cream">
                Proceed to checkout
              </Link>
              <Link to="/cart" onClick={() => setCartOpen(false)} className="inline-flex h-12 items-center justify-center rounded-full border border-forest/15 text-sm font-semibold text-forest">
                View cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <p className={`flex justify-between py-1 text-sm ${strong ? "text-base font-semibold text-forest" : "text-ink/70"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  );
}
