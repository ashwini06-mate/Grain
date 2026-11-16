import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../data/products";
import { useStore } from "../context/StoreContext";

export default function SearchBar({ value, onChange, onSubmit, id = "shop-search" }) {
  return (
    <form onSubmit={onSubmit} className="relative" role="search">
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-forest/50" />
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search rice, wheat, region"
        className="field pl-11"
      />
    </form>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products
      .filter((product) => `${product.name} ${product.variety} ${product.origin}`.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  if (!searchOpen) return null;

  function go(event) {
    event?.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/45 p-4 sm:p-10">
      <button type="button" className="absolute inset-0" aria-label="Close search" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto max-w-2xl rounded-3xl bg-cream p-4 shadow-2xl sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="min-w-0 font-display text-2xl text-forest sm:text-3xl">Search the catalogue</h2>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close search" onClick={() => setSearchOpen(false)}>
            <X />
          </button>
        </div>
        <SearchBar id="overlay-search" value={query} onChange={setQuery} onSubmit={go} />
        <ul className="mt-4 divide-y divide-forest/10">
          {results.length === 0 && <li className="py-6 text-sm text-ink/60">No grains match that search.</li>}
          {results.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
                onClick={() => {
                  setSearchOpen(false);
                  navigate(`/product/${product.id}`);
                }}
              >
                <span>
                  <span className="block font-medium text-forest">{product.name}</span>
                  <span className="text-sm text-ink/55">{product.variety} · {product.origin}</span>
                </span>
                <span className="text-xs uppercase tracking-wide text-olive">{product.category}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
