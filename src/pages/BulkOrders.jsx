import { useMemo, useState } from "react";
import { audiences, businessTypes } from "../data/content";
import { products } from "../data/products";
import { usePageMeta } from "../hooks/usePageMeta";
import { bulkEnquiry, waLink } from "../utils/whatsapp";
import { Container, Field, PageHero } from "../components/ui";
import WhatsAppButton from "../components/WhatsAppButton";

const empty = {
  business: "",
  person: "",
  mobile: "",
  email: "",
  type: "",
  requirement: "Rice",
  variety: "",
  quantity: "",
  unit: "kg",
  city: "",
  message: "",
};

export default function BulkOrders() {
  usePageMeta("Bulk Orders", "Request a bulk quote for rice or wheat. Hotels, restaurants, shops and distributors can send a WhatsApp enquiry.");
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  const varietyOptions = useMemo(() => {
    const category = form.requirement === "Wheat" ? "wheat" : form.requirement === "Rice" ? "rice" : null;
    const list = category ? products.filter((product) => product.category === category) : products;
    return [...new Set(list.map((product) => product.variety))];
  }, [form.requirement]);

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next = {};
    if (form.business.trim().length < 2) next.business = "Enter the business name.";
    if (form.person.trim().length < 2) next.person = "Enter a contact person.";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) next.mobile = "Enter a 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.type) next.type = "Choose a business type.";
    if (!form.quantity || Number(form.quantity) <= 0) next.quantity = "Enter a quantity.";
    if (form.city.trim().length < 2) next.city = "Enter the delivery city.";
    return next;
  }

  function submit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    window.open(waLink(bulkEnquiry(form)), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <PageHero
        eyebrow="Bulk orders"
        title="A desk for kitchens that buy by the sack."
        text="Tell us the variety, the quantity in kilograms or quintals, and the city. Submit opens WhatsApp with the enquiry formatted and ready to send."
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {audiences.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-5">
              <h2 className="font-display text-3xl text-forest">{item.title}</h2>
              <p className="mt-1 text-sm text-ink/70">{item.text}</p>
            </article>
          ))}
        </div>
        <form onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-5 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Business name" error={errors.business}>
              <input className="field" value={form.business} onChange={(event) => set("business", event.target.value)} />
            </Field>
            <Field label="Contact person" error={errors.person}>
              <input className="field" value={form.person} onChange={(event) => set("person", event.target.value)} />
            </Field>
            <Field label="Mobile number" error={errors.mobile}>
              <input className="field" inputMode="numeric" value={form.mobile} onChange={(event) => set("mobile", event.target.value)} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className="field" type="email" value={form.email} onChange={(event) => set("email", event.target.value)} />
            </Field>
            <Field label="Business type" error={errors.type}>
              <select className="field" value={form.type} onChange={(event) => set("type", event.target.value)}>
                <option value="">Select</option>
                {businessTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>
            <Field label="Rice or wheat">
              <select className="field" value={form.requirement} onChange={(event) => set("requirement", event.target.value)}>
                <option>Rice</option>
                <option>Wheat</option>
                <option>Both</option>
              </select>
            </Field>
            <Field label="Product variety">
              <select className="field" value={form.variety} onChange={(event) => set("variety", event.target.value)}>
                <option value="">Any suitable lot</option>
                {varietyOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Delivery city" error={errors.city}>
              <input className="field" value={form.city} onChange={(event) => set("city", event.target.value)} />
            </Field>
            <Field label="Required quantity" error={errors.quantity}>
              <input className="field" inputMode="decimal" value={form.quantity} onChange={(event) => set("quantity", event.target.value)} />
            </Field>
            <Field label="Unit">
              <select className="field" value={form.unit} onChange={(event) => set("unit", event.target.value)}>
                <option value="kg">Kilograms</option>
                <option value="quintals">Quintals</option>
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Additional message">
              <textarea className="field min-h-28" value={form.message} onChange={(event) => set("message", event.target.value)} />
            </Field>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="h-12 rounded-full bg-forest px-6 text-sm font-semibold text-cream">
              Send enquiry on WhatsApp
            </button>
            <WhatsAppButton message="Hello DHANYA, I would like to discuss a bulk grain order." />
          </div>
          <p className="mt-3 text-xs text-ink/50">The demo number lives in the site settings file and should be replaced before launch. No enquiry is stored on a server.</p>
        </form>
      </Container>
    </>
  );
}

