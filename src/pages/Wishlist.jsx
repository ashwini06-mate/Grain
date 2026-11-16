import { Link } from "react-router-dom";
import { getProduct } from "../data/products";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container, PageHero } from "../components/ui";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  usePageMeta("Wishlist", "Grains you saved on this device.");
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <>
      <PageHero eyebrow="Wishlist" title="Saved for later." text="Hearts stay on this device. They are not tied to an account on a server." />
      <Container className="py-10">
        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-forest/20 bg-white px-6 py-16 text-center">
            <h2 className="font-display text-4xl text-forest">No saved grains</h2>
            <p className="mt-2 text-sm text-ink/65">Tap the heart on a product to keep it here.</p>
            <Link to="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm font-semibold text-cream">Browse the shop</Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
