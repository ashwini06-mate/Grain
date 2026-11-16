import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { site } from "../data/site";
import { Container } from "./ui";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="mt-16 bg-forest text-cream">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-4xl">DHANYA</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/75">
            Pure grains, better living. A demonstration storefront for an Indian rice and wheat business serving homes and bulk buyers.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20">
              <Instagram size={18} />
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20">
              <Facebook size={18} />
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat">Quick links</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/shop">Shop all</Link></li>
            <li><Link to="/sourcing">Our sourcing</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/bulk">Bulk orders</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat">Categories</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/rice?collection=premium">Premium rice</Link></li>
            <li><Link to="/rice?collection=everyday">Everyday rice</Link></li>
            <li><Link to="/rice?variety=Basmati">Basmati rice</Link></li>
            <li><Link to="/rice?collection=traditional">Traditional rice</Link></li>
            <li><Link to="/wheat?collection=premium">Premium wheat</Link></li>
            <li><Link to="/wheat?collection=everyday">Everyday wheat</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-wheat">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>{site.address}</li>
            <li><a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-8">
        <Newsletter />
      </Container>
      <Container className="flex flex-col gap-3 border-t border-white/10 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} DHANYA. Sample catalogue for demonstration. Prices, reviews and origins are not live trade data.</p>
        <p className="flex gap-4">
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms and conditions</Link>
        </p>
      </Container>
    </footer>
  );
}
