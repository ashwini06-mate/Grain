import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { origins, products, varieties } from "../data/products";
import { filterProducts } from "../utils/filter";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container, PageHero, ProductSkeleton } from "../components/ui";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import SearchBar from "../components/SearchBar";

const copy = {
  rice: {
    title: "Rice Collection",
    text: "Basmati, everyday and regional rice, from a 1 kg pouch to a 50 kg sack where the lot allows it.",
  },
  wheat: {
    title: "Wheat Collection",
    text: "Whole wheat grain for chakki milling and daily rotis. These listings are grain, not packed atta.",
  },
  shop: {
    title: "Shop All",
    text: "Search, filter and sort the full DHANYA sample catalogue of rice and wheat.",
  },
};

export default function Shop({ preset }) {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visible, setVisible] = useState(9);
  const [booting, setBooting] = useState(true);

  const q = params.get("q") || "";
  const collection = params.get("collection") || "";
  const variety = params.get("variety") || "";
  const origin = params.get("origin") || "";
  const price = params.get("price") || "";
  const sort = params.get("sort") || "popular";
  const view = params.get("view") || "grid";
  const category = preset || "";
  const varietyList = variety ? variety.split(",").filter(Boolean) : [];
  const originList = origin ? origin.split(",").filter(Boolean) : [];

  const page = copy[preset || "shop"];
  usePageMeta(page.title, page.text);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisible(9);
  }, [q, collection, variety, origin, price, sort, category]);

  const results = useMemo(
    () =>
      filterProducts(products, {
        category,
        q,
        collection,
        varieties: varietyList,
        origins: originList,
        price,
        sort,
      }),
    [category, q, collection, variety, origin, price, sort],
  );

  function update(next) {
    const merged = { q, collection, variety, origin, price, sort, view, ...next };
    const sp = new URLSearchParams();
    Object.entries(merged).forEach(([key, value]) => {
      if (value) sp.set(key, value);
    });
    setParams(sp, { replace: true });
  }

  function toggle(list, value) {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  const shown = results.slice(0, visible);
  const activeCount = [collection, price, q, ...varietyList, ...originList].filter(Boolean).length;

  return (
    <>
      <PageHero eyebrow={preset === "rice" ? "Rice" : preset === "wheat" ? "Wheat" : "Catalogue"} title={page.title} text={page.text} />
      <Container className="grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <ProductFilters
          category={category}
          collection={collection}
          varietyList={varietyList}
          originList={originList}
          price={price}
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          onCollection={(value) => update({ collection: value })}
          onToggleVariety={(value) => update({ variety: toggle(varietyList, value).join(",") })}
          onToggleOrigin={(value) => update({ origin: toggle(originList, value).join(",") })}
          onPrice={(value) => update({ price: value })}
          onClear={() => setParams({}, { replace: true })}
        />
        <div>
          <div className="flex flex-col gap-3 rounded-3xl border border-forest/10 bg-white p-3 sm:p-4">
            <SearchBar value={q} onChange={(value) => update({ q: value })} onSubmit={(event) => event.preventDefault()} />
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="inline-flex h-11 items-center gap-2 rounded-full border border-forest/15 px-4 text-sm font-semibold lg:hidden" onClick={() => setFiltersOpen(true)}>
                <SlidersHorizontal size={16} />
                Filters{activeCount ? ` (${activeCount})` : ""}
              </button>
              <div className="ml-auto flex shrink-0 rounded-full border border-forest/15 p-1 sm:order-3 sm:ml-0">
                <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} className={`flex h-9 w-9 items-center justify-center rounded-full ${view === "grid" ? "bg-forest text-cream" : ""}`} onClick={() => update({ view: "grid" })}>
                  <LayoutGrid size={16} />
                </button>
                <button type="button" aria-label="List view" aria-pressed={view === "list"} className={`flex h-9 w-9 items-center justify-center rounded-full ${view === "list" ? "bg-forest text-cream" : ""}`} onClick={() => update({ view: "list" })}>
                  <List size={16} />
                </button>
              </div>
              <label className="flex w-full min-w-0 items-center gap-2 text-sm sm:ml-auto sm:w-auto">
                <span className="shrink-0 text-ink/55">Sort</span>
                <select value={sort} onChange={(event) => update({ sort: event.target.value })} className="h-11 w-full min-w-0 rounded-full border border-forest/15 bg-cream px-3 sm:w-52" aria-label="Sort products">
                  <option value="popular">Popularity</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="newest">Newest</option>
                </select>
              </label>
            </div>
          </div>

          <p className="mt-4 text-sm text-ink/60">
            Showing {Math.min(visible, results.length)} of {results.length}
            {category ? ` ${category}` : " grains"}
          </p>

          {booting ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-forest/20 bg-white px-6 py-16 text-center">
              <h2 className="font-display text-4xl text-forest">No grains match</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink/65">Try another variety, clear the price band, or search a region such as Punjab or Maharashtra.</p>
              <button type="button" onClick={() => setParams({}, { replace: true })} className="mt-6 h-11 rounded-full bg-forest px-5 text-sm font-semibold text-cream">
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className={view === "list" ? "mt-5 space-y-4" : "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
                {shown.map((product) => (
                  <ProductCard key={product.id} product={product} layout={view === "list" ? "list" : "grid"} />
                ))}
              </div>
              {visible < results.length && (
                <div className="mt-8 text-center">
                  <button type="button" onClick={() => setVisible((count) => count + 9)} className="h-12 rounded-full border border-forest/20 bg-white px-6 text-sm font-semibold text-forest">
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
          <p className="sr-only">
            Available varieties {varieties.join(", ")}. Origins {origins.join(", ")}.
          </p>
        </div>
      </Container>
    </>
  );
}
