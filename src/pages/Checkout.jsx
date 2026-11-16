import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getProduct } from "../data/products";
import { states } from "../data/site";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { cartMoney, inr, resolveLines } from "../utils/pricing";
import { Container, Field, PageHero } from "../components/ui";

const methods = [
  { id: "cod", title: "Cash on delivery", text: "Pay when the demo order arrives. Nothing is collected now." },
  { id: "upi", title: "UPI", text: "A simulated UPI step. No request is sent to a bank." },
  { id: "card", title: "Card", text: "A simulated card step. The number is checked, then discarded." },
];

export default function Checkout() {
  usePageMeta("Checkout", "Enter a delivery address and complete a demonstration checkout. No real payment is processed.");
  const { cart, account, placeOrder } = useStore();
  const navigate = useNavigate();
  const lines = resolveLines(cart, getProduct);
  const money = cartMoney(lines);
  const [form, setForm] = useState({
    name: account?.name || "",
    mobile: account?.mobile || "",
    email: account?.email || "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [payment, setPayment] = useState({ method: "cod", upi: "", card: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (!lines.length && !placing) return <Navigate to="/cart" replace />;

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) next.mobile = "Enter a 10-digit Indian mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email.";
    if (form.street.trim().length < 5) next.street = "Enter house number and street.";
    if (form.city.trim().length < 2) next.city = "Enter your city.";
    if (!form.state) next.state = "Select a state.";
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = "Enter a 6-digit pincode.";
    if (!payment.method) next.method = "Choose a demo payment method.";
    if (payment.method === "upi" && !/^[\w.-]{2,}@[\w.-]{2,}$/.test(payment.upi.trim())) next.upi = "Enter a UPI ID such as name@demo.";
    if (payment.method === "card") {
      if (!/^\d{16}$/.test(payment.card.replace(/\s/g, ""))) next.card = "Enter 16 digits. They are not saved.";
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry.trim())) next.expiry = "Use MM/YY.";
      if (!/^\d{3}$/.test(payment.cvv.trim())) next.cvv = "Enter a 3-digit CVV.";
    }
    return next;
  }

  function submit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setPlacing(true);
    const order = placeOrder({
      customer: form,
      items: lines.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        size: line.size,
        qty: line.qty,
        unitPrice: line.unitPrice,
        lineTotal: line.lineTotal,
      })),
      subtotal: money.subtotal,
      delivery: money.delivery,
      total: money.total,
      paymentMethod: methods.find((method) => method.id === payment.method)?.title || payment.method,
    });
    navigate(`/order-confirmation/${order.id}`);
  }

  return (
    <>
      <PageHero eyebrow="Checkout" title="Where should this order go?" text="This is a demonstration checkout. Placing the order does not charge a card, a UPI ID or a bank account." />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={submit} noValidate className="space-y-6">
          <section className="rounded-[2rem] bg-white p-5 sm:p-7">
            <h2 className="font-display text-3xl text-forest">Customer details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input className="field" autoComplete="name" value={form.name} onChange={(event) => setField("name", event.target.value)} aria-invalid={Boolean(errors.name)} />
              </Field>
              <Field label="Mobile number" error={errors.mobile}>
                <input className="field" autoComplete="tel" inputMode="numeric" value={form.mobile} onChange={(event) => setField("mobile", event.target.value)} aria-invalid={Boolean(errors.mobile)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email" error={errors.email}>
                  <input className="field" type="email" autoComplete="email" value={form.email} onChange={(event) => setField("email", event.target.value)} aria-invalid={Boolean(errors.email)} />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="House number and street" error={errors.street}>
                  <input className="field" autoComplete="street-address" value={form.street} onChange={(event) => setField("street", event.target.value)} aria-invalid={Boolean(errors.street)} />
                </Field>
              </div>
              <Field label="City" error={errors.city}>
                <input className="field" autoComplete="address-level2" value={form.city} onChange={(event) => setField("city", event.target.value)} />
              </Field>
              <Field label="State" error={errors.state}>
                <select className="field" value={form.state} onChange={(event) => setField("state", event.target.value)}>
                  <option value="">Select state</option>
                  {states.map((state) => (
                    <option key={state}>{state}</option>
                  ))}
                </select>
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input className="field" inputMode="numeric" autoComplete="postal-code" value={form.pincode} onChange={(event) => setField("pincode", event.target.value)} />
              </Field>
              <Field label="Landmark" hint="Optional">
                <input className="field" value={form.landmark} onChange={(event) => setField("landmark", event.target.value)} />
              </Field>
            </div>
          </section>
          <section className="rounded-[2rem] bg-white p-5 sm:p-7">
            <h2 className="font-display text-3xl text-forest">Demo payment</h2>
            <p className="mt-2 rounded-2xl bg-cream px-4 py-3 text-sm text-ink/75">Integration-ready layout only. No payment gateway is connected, and no payment is processed.</p>
            {errors.method && <p className="mt-2 text-sm text-red-800">{errors.method}</p>}
            <div className="mt-4 grid gap-3">
              {methods.map((method) => (
                <label key={method.id} className={`rounded-2xl border p-4 ${payment.method === method.id ? "border-forest bg-cream" : "border-forest/10"}`}>
                  <span className="flex items-start gap-3">
                    <input type="radio" name="payment" className="mt-1 accent-forest" checked={payment.method === method.id} onChange={() => setPayment({ ...payment, method: method.id })} />
                    <span>
                      <span className="block font-medium text-forest">{method.title}</span>
                      <span className="mt-1 block text-sm text-ink/65">{method.text}</span>
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {payment.method === "upi" && (
              <div className="mt-4">
                <Field label="UPI ID" error={errors.upi} hint="Example: name@demo. It is not sent anywhere.">
                  <input className="field" value={payment.upi} onChange={(event) => setPayment({ ...payment, upi: event.target.value })} />
                </Field>
              </div>
            )}
            {payment.method === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Card number" error={errors.card}>
                    <input className="field" inputMode="numeric" autoComplete="off" value={payment.card} onChange={(event) => setPayment({ ...payment, card: event.target.value })} />
                  </Field>
                </div>
                <Field label="Expiry" error={errors.expiry}>
                  <input className="field" placeholder="MM/YY" value={payment.expiry} onChange={(event) => setPayment({ ...payment, expiry: event.target.value })} />
                </Field>
                <Field label="CVV" error={errors.cvv}>
                  <input className="field" inputMode="numeric" autoComplete="off" value={payment.cvv} onChange={(event) => setPayment({ ...payment, cvv: event.target.value })} />
                </Field>
              </div>
            )}
          </section>
          <button type="submit" disabled={placing} className="h-12 w-full rounded-full bg-forest text-sm font-semibold text-cream disabled:opacity-60 sm:w-auto sm:px-8">
            {placing ? "Placing demo order…" : "Place demo order"}
          </button>
        </form>
        <aside className="h-fit rounded-[2rem] bg-white p-6">
          <h2 className="font-display text-3xl text-forest">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}`} className="flex justify-between gap-3 text-sm">
                <span>
                  {line.product.name}
                  <span className="block text-ink/50">{line.size} × {line.qty}</span>
                </span>
                <span className="font-medium">{inr(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between text-sm text-ink/70"><span>Subtotal</span><span>{inr(money.subtotal)}</span></p>
          <p className="mt-2 flex justify-between text-sm text-ink/70"><span>Delivery</span><span>{money.delivery === 0 ? "Free" : inr(money.delivery)}</span></p>
          <p className="mt-3 flex justify-between border-t border-forest/10 pt-3 text-lg font-semibold text-forest"><span>Total</span><span>{inr(money.total)}</span></p>
          <Link to="/cart" className="mt-4 inline-block text-sm font-semibold text-olive">Edit cart</Link>
        </aside>
      </Container>
    </>
  );
}
