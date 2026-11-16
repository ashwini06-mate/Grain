import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container } from "../components/ui";

export default function NotFound() {
  usePageMeta("Page not found", "This page is not part of the DHANYA website.");
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">404</p>
      <h1 className="mt-3 font-display text-5xl text-forest sm:text-6xl">This page is not in the catalogue.</h1>
      <p className="mx-auto mt-4 max-w-md text-ink/70">The link may be old. The shop, sourcing story and bulk desk are all still open.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className="inline-flex h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-semibold text-cream">Go home</Link>
        <Link to="/shop" className="inline-flex h-12 items-center justify-center rounded-full border border-forest/15 px-6 text-sm font-semibold text-forest">Browse grains</Link>
      </div>
    </Container>
  );
}
