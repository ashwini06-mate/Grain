import { Link, useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { inr } from "../utils/pricing";
import { Container } from "../components/ui";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useStore();
  const order = orders.find((item) => item.id === orderId);
  usePageMeta("Order confirmation", "Your DHANYA demonstration order is recorded on this device. No payment was processed.");

  if (!order) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-5xl text-forest">We could not find that order</h1>
        <p className="mt-3 text-ink/70">Demo orders stay in this browser. If you cleared site data, the confirmation is gone.</p>
        <Link to="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm font-semibold text-cream">
          Return to the shop
        </Link>
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Order confirmation</p>
      <h1 className="mt-3 text-5xl text-forest">The demo order is in.</h1>
      <p className="mt-4 rounded-2xl bg-wheat/30 px-4 py-3 text-sm text-ink">
        {order.paymentNote} Payment method shown: {order.paymentMethod}.
      </p>
      <div className="mt-6 rounded-[2rem] bg-white p-6">
        <p className="text-sm text-ink/55">Order number</p>
        <p className="font-display text-4xl text-forest">{order.id}</p>
        <p className="mt-4 text-sm text-ink/70">
          {order.customer.name} · {order.customer.mobile}
          <br />
          {order.customer.street}, {order.customer.city}, {order.customer.state} {order.customer.pincode}
        </p>
        <ul className="mt-6 divide-y divide-forest/10">
          {order.items.map((item) => (
            <li key={`${item.id}-${item.size}`} className="flex justify-between gap-3 py-3 text-sm">
              <span>{item.name}<span className="block text-ink/50">{item.size} × {item.qty}</span></span>
              <span>{inr(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 flex justify-between text-sm"><span>Delivery</span><span>{order.delivery === 0 ? "Free" : inr(order.delivery)}</span></p>
        <p className="mt-2 flex justify-between text-lg font-semibold text-forest"><span>Total</span><span>{inr(order.total)}</span></p>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link to="/shop" className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-cream">Continue shopping</Link>
        <Link to="/account" className="inline-flex h-12 items-center justify-center rounded-full border border-forest/15 px-6 text-sm font-semibold text-forest">View on this device</Link>
      </div>
    </Container>
  );
}
