import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { inr } from "../utils/pricing";
import { Container, Field, PageHero } from "../components/ui";

export default function Account() {
  usePageMeta("Account", "Save a name and mobile on this device so checkout can start filled in.");
  const { account, saveAccount, signOut, orders } = useStore();
  const [form, setForm] = useState({
    name: account?.name || "",
    email: account?.email || "",
    mobile: account?.mobile || "",
  });
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (form.name.trim().length < 2) {
      setError("Enter your name.");
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email or leave it blank.");
      return;
    }
    if (form.mobile && !/^[6-9]\d{9}$/.test(form.mobile)) {
      setError("Enter a 10-digit mobile number or leave it blank.");
      return;
    }
    setError("");
    saveAccount(form);
  }

  return (
    <>
      <PageHero eyebrow="Account" title="A profile that stays on this phone." text="There is no password and no server account. Saving details only prefills the next demo checkout." />
      <Container className="grid gap-8 py-10 lg:grid-cols-2">
        <form onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-6">
          <Field label="Full name">
            <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          </Field>
          <div className="mt-4">
            <Field label="Email">
              <input className="field" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Mobile">
              <input className="field" inputMode="numeric" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} />
            </Field>
          </div>
          {error && <p className="mt-3 text-sm text-red-800">{error}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" className="h-11 rounded-full bg-forest px-5 text-sm font-semibold text-cream">Save on this device</button>
            {account && (
              <button type="button" onClick={signOut} className="h-11 rounded-full border border-forest/15 px-5 text-sm font-semibold">
                Clear profile
              </button>
            )}
          </div>
        </form>
        <section>
          <h2 className="font-display text-4xl text-forest">Demo orders</h2>
          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-ink/65">Orders you place in this browser will appear here.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {orders.map((order) => (
                <li key={order.id}>
                  <Link to={`/order-confirmation/${order.id}`} className="block rounded-3xl bg-white p-4">
                    <span className="font-medium text-forest">{order.id}</span>
                    <span className="mt-1 block text-sm text-ink/60">{order.items.length} items · {inr(order.total)} · {order.paymentMethod}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </>
  );
}
