import { Link } from "react-router-dom";
import { getProduct } from "../data/products";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { cartMoney, inr, resolveLines } from "../utils/pricing";
import { Container, PageHero } from "../components/ui";
import QuantitySelector from "../components/QuantitySelector";

export default function Cart() {
  usePageMeta("Cart", "Review rice and wheat packs, quantities and delivery before checkout.");
  const { cart, updateQty, removeFromCart, setLineSize } = useStore();
  const lines = resolveLines(cart, getProduct);
  const missing = cart.length - lines.length;
  const money = cartMoney(lines);

  return (
    <>
      <PageHero eyebrow="Cart" title="Your grain, ready to check out." text="Change a pack size or a quantity. Delivery updates with the subtotal." />
      <Container className="py-10">
        {lines.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-forest/20 bg-white px-6 py-16 text-center">
            <h2 className="font-display text-4xl text-forest">Nothing in the cart yet</h2>
            <p className="mt-2 text-sm text-ink/65">The sample catalogue has rice from 1 kg and wheat up to 50 kg.</p>
            <Link to="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm font-semibold text-cream">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <ul className="space-y-4">
              {missing > 0 && <li className="rounded-2xl bg-white p-4 text-sm text-ink/70">A saved item is no longer in the catalogue and was left out of the total.</li>}
              {lines.map((line) => (
                <li key={`${line.productId}-${line.size}`} className="grid gap-4 rounded-3xl bg-white p-4 sm:grid-cols-[120px_1fr]">
                  <img src={line.product.image} alt="" className="h-28 w-full rounded-2xl object-cover sm:h-full" />
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link to={`/product/${line.product.id}`} className="font-display text-2xl leading-tight text-forest sm:text-3xl">{line.product.name}</Link>
                        <p className="text-sm text-ink/55">{line.product.origin}</p>
                      </div>
                      <p className="shrink-0 font-semibold">{inr(line.lineTotal)}</p>
                    </div>
                    <label className="mt-3 block text-sm">
                      <span className="text-ink/55">Pack</span>
                      <select
                        className="field mt-1"
                        value={line.size}
                        onChange={(event) => setLineSize(line.productId, line.size, event.target.value)}
                      >
                        {line.product.weights.map((weight) => (
                          <option key={weight.size}>{weight.size}</option>
                        ))}
                      </select>
                    </label>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <QuantitySelector value={line.qty} max={line.product.stock} onChange={(qty) => updateQty(line.productId, line.size, qty)} />
                      <button type="button" className="text-sm font-semibold text-olive" onClick={() => removeFromCart(line.productId, line.size)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-[2rem] bg-white p-6">
              <h2 className="font-display text-3xl text-forest">Summary</h2>
              <Row label="Subtotal" value={inr(money.subtotal)} />
              <Row label="Delivery" value={money.delivery === 0 ? "Free" : inr(money.delivery)} />
              <Row label="Total" value={inr(money.total)} strong />
              <p className="mt-3 text-xs leading-relaxed text-ink/55">
                Under ₹999 the fee is ₹79. From ₹999 it is free, unless a 25 kg or 50 kg pack is in the cart and the subtotal is still under ₹2,499 — then the fee is ₹149. Sample prices, with no tax added.
              </p>
              <Link to="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-full bg-forest text-sm font-semibold text-cream">
                Proceed to checkout
              </Link>
              <Link to="/shop" className="mt-3 flex h-12 items-center justify-center rounded-full border border-forest/15 text-sm font-semibold text-forest">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
}

function Row({ label, value, strong }) {
  return (
    <p className={`mt-3 flex justify-between ${strong ? "border-t border-forest/10 pt-3 text-lg font-semibold text-forest" : "text-sm text-ink/70"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  );
}
