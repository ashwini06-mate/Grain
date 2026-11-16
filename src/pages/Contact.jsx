import { useState } from "react";
import { site } from "../data/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { contactEnquiry, waLink } from "../utils/whatsapp";
import { Container, Field, PageHero } from "../components/ui";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Contact() {
  usePageMeta("Contact Us", "Talk to the DHANYA demonstration desk about rice, wheat, delivery or a bulk requirement.");
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) next.mobile = "Enter a 10-digit mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.message.trim().length < 8) next.message = "Add a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;
    window.open(waLink(contactEnquiry(form)), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Write to the grain desk." text="Send a note on WhatsApp, or use the phone and email below. All contact details are sample values until you replace them." />
      <Container className="grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[2rem] bg-forest p-6 text-cream">
          <h2 className="font-display text-4xl">DHANYA</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-wheat">Studio</dt>
              <dd className="mt-1 text-cream/80">{site.address}</dd>
            </div>
            <div>
              <dt className="text-wheat">Hours</dt>
              <dd className="mt-1 text-cream/80">{site.hours}</dd>
            </div>
            <div>
              <dt className="text-wheat">Phone</dt>
              <dd className="mt-1"><a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></dd>
            </div>
            <div>
              <dt className="text-wheat">Email</dt>
              <dd className="mt-1"><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
          </dl>
          <WhatsAppButton className="mt-6" message="Hello DHANYA, I am contacting you from the website." />
        </aside>
        <form onSubmit={submit} noValidate className="rounded-[2rem] bg-white p-5 sm:p-8">
          <div className="grid gap-4">
            <Field label="Full name" error={errors.name}>
              <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Mobile number" error={errors.mobile}>
                <input className="field" inputMode="numeric" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input className="field" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              </Field>
            </div>
            <Field label="Message" error={errors.message}>
              <textarea className="field min-h-32" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
            </Field>
          </div>
          <button type="submit" className="mt-6 h-12 rounded-full bg-forest px-6 text-sm font-semibold text-cream">
            Continue on WhatsApp
          </button>
        </form>
      </Container>
    </>
  );
}
