import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container, PageHero } from "../components/ui";

export function Privacy() {
  usePageMeta("Privacy policy", "How the DHANYA demonstration website stores information in your browser.");
  return (
    <>
      <PageHero eyebrow="Privacy" title="What this demo keeps." text="This is sample policy text for the demonstration, not legal advice." />
      <Container className="prose-like max-w-3xl space-y-4 py-12 text-sm leading-relaxed text-ink/80">
        <p>DHANYA stores your cart, wishlist, recently viewed grains, newsletter email, profile and demo orders in local storage on this device. Nothing in those flows is sent to a DHANYA server, because this project does not include one.</p>
        <p>WhatsApp buttons open wa.me with a message you choose to send. Payment fields on checkout are validated in the browser and then discarded. Card numbers and UPI IDs are not written into the saved order.</p>
        <p>Product photography is loaded from Unsplash. If you publish this site, replace those images with photographs you have rights to use.</p>
        <p><Link to="/contact" className="font-semibold text-forest">Contact the demo desk</Link> if you want the placeholder phone, email and address changed.</p>
      </Container>
    </>
  );
}

export function Terms() {
  usePageMeta("Terms and conditions", "Sample terms for the DHANYA demonstration storefront.");
  return (
    <>
      <PageHero eyebrow="Terms" title="Sample terms for a sample shop." text="Replace this page with counsel-reviewed terms before taking real orders." />
      <Container className="max-w-3xl space-y-4 py-12 text-sm leading-relaxed text-ink/80">
        <p>The catalogue, prices, origins, stock counts and reviews are demonstration data. Placing an order records it only in your browser and does not create a contract to supply grain.</p>
        <p>Delivery fees shown in the cart are part of the demo rules: ₹79 under ₹999, free from ₹999, and ₹149 when a 25 kg or 50 kg pack is included and the subtotal is under ₹2,499.</p>
        <p>The sample returns note asks for damaged or incorrect packs to be reported within 48 hours, with replacement of the same grain. It is not a warranty.</p>
        <p>Bulk messages are composed for WhatsApp. Sending them depends on the visitor’s own WhatsApp account and on the number configured in the site file.</p>
      </Container>
    </>
  );
}
