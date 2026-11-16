import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { featuredWeight } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Photo, PriceTag, Stars } from "./ui";

export default function ProductCard({ product, layout = "grid" }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const weight = featuredWeight(product);
  const saved = wishlist.includes(product.id);
  const soldOut = product.stock <= 0;

  const add = () => {
    if (!soldOut) addToCart(product.id, weight.size, 1);
  };

  if (layout === "list") {
    return (
      <article className="grid gap-4 rounded-3xl border border-forest/10 bg-white p-3 shadow-sm sm:grid-cols-[180px_1fr] sm:p-4">
        <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl">
          <Photo src={product.image} alt={product.alt} className="aspect-[4/3] sm:aspect-square" />
        </Link>
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-olive">{product.variety}</p>
              <h3 className="mt-1 font-display text-3xl text-forest">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>
            </div>
            <WishButton saved={saved} onClick={() => toggleWishlist(product.id)} />
          </div>
          <p className="mt-2 text-sm text-ink/65">
            {product.origin} · {weight.size}
            {soldOut ? " · Out of stock" : product.stock <= 8 ? ` · ${product.stock} left` : ""}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/75">{product.description}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Stars value={product.rating} />
            <span className="text-ink/55">{product.rating} · {product.reviewCount} sample reviews</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <PriceTag original={weight.original} price={weight.price} />
            <div className="ml-auto flex flex-wrap gap-2">
              <button type="button" disabled={soldOut} onClick={add} className="h-11 rounded-full bg-forest px-4 text-sm font-semibold text-cream disabled:opacity-50">
                {soldOut ? "Out of stock" : "Add to cart"}
              </button>
              <Link to={`/product/${product.id}`} className="inline-flex h-11 items-center rounded-full border border-forest/15 px-4 text-sm font-semibold text-forest">
                View details
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block overflow-hidden">
          <Photo src={product.image} alt={product.alt} className="aspect-[4/5] transition duration-700 group-hover:scale-[1.03]" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.bestseller && <span className="rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest">Bestseller</span>}
          {product.isNew && <span className="rounded-full bg-wheat px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">New</span>}
          {soldOut && <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream">Sold out</span>}
        </div>
        <WishButton saved={saved} onClick={() => toggleWishlist(product.id)} className="absolute right-3 top-3 bg-cream/95" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-olive">{product.variety}</p>
        <h3 className="mt-1 font-display text-2xl leading-tight text-forest sm:text-[1.7rem] sm:leading-none">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="mt-2 text-sm text-ink/60">
          {product.origin} · {weight.size}
        </p>
        <div className="mt-3">
          <PriceTag original={weight.original} price={weight.price} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink/55">
          <Stars value={product.rating} />
          <span>{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button type="button" disabled={soldOut} onClick={add} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-forest text-sm font-semibold text-cream disabled:opacity-50">
            <ShoppingBag size={16} />
            {soldOut ? "Sold out" : "Add"}
          </button>
          <Link to={`/product/${product.id}`} className="inline-flex h-11 items-center justify-center rounded-full border border-forest/15 text-sm font-semibold text-forest">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

function WishButton({ saved, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={saved}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-forest ${className}`}
    >
      <Heart size={18} className={saved ? "fill-forest" : ""} />
    </button>
  );
}
