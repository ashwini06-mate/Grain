import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { featuredWeight, getProduct, relatedProducts, weightBySize } from "../data/products";
import { reviewsFor } from "../data/content";
import { useStore } from "../context/StoreContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { discountPercent, inr, perKg } from "../utils/pricing";
import { productEnquiry } from "../utils/whatsapp";
import { Container, Photo, Stars } from "../components/ui";
import Breadcrumbs from "../components/Breadcrumbs";
import QuantitySelector from "../components/QuantitySelector";
import ProductCard from "../components/ProductCard";
import ReviewCard from "../components/ReviewCard";
import WhatsAppButton from "../components/WhatsAppButton";

export default function ProductDetails() {
  const { id } = useParams();
  const product = getProduct(id);
  const navigate = useNavigate();
  const { addToCart, viewProduct, recent } = useStore();
  const [size, setSize] = useState(product ? featuredWeight(product).size : "");
  const [qty, setQty] = useState(1);
  const [photo, setPhoto] = useState(0);

  useEffect(() => {
    if (!product) return;
    setSize(featuredWeight(product).size);
    setQty(1);
    setPhoto(0);
    viewProduct(product.id);
  }, [product?.id]);

  usePageMeta(product ? product.name : "Grain not found", product?.description || "This grain is not in the DHANYA catalogue.");

  const weight = product ? weightBySize(product, size) : null;
  const related = product ? relatedProducts(product) : [];
  const reviews = product ? reviewsFor(product) : [];
  const viewed = recent.map(getProduct).filter((item) => item && item.id !== product?.id).slice(0, 4);
  const jsonLd = useMemo(() => {
    if (!product || !weight) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: `${product.description} Sample demonstration listing.`,
      image: product.images,
      brand: { "@type": "Brand", name: "DHANYA" },
      category: product.category,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: weight.price,
        availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };
  }, [product, weight]);

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-5xl text-forest">This grain is not listed</h1>
        <p className="mt-3 text-ink/70">It may have been renamed in the sample catalogue.</p>
        <Link to="/shop" className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm font-semibold text-cream">
          Back to the shop
        </Link>
      </Container>
    );
  }

  const soldOut = product.stock <= 0;
  const off = discountPercent(weight.original, weight.price);

  function add(thenCheckout = false) {
    const result = addToCart(product.id, weight.size, qty);
    if (result?.ok && thenCheckout) navigate("/checkout");
  }

  return (
    <Container className="py-8 pb-28 sm:py-12 lg:pb-12">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: product.category === "rice" ? "Rice" : "Wheat", to: product.category === "rice" ? "/rice" : "/wheat" },
          { label: product.name },
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <Photo src={product.images[photo]} alt={product.alt} priority className="aspect-square rounded-[2rem]" />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button key={image + index} type="button" onClick={() => setPhoto(index)} className={`overflow-hidden rounded-2xl border ${photo === index ? "border-forest" : "border-transparent"}`} aria-label={`Show image ${index + 1}`}>
                <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">{product.variety}</p>
          <h1 className="mt-2 text-4xl leading-tight text-forest sm:text-5xl lg:text-6xl">{product.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-ink/60">
            <Stars value={product.rating} />
            <span>{product.rating} · {product.reviewCount} sample reviews</span>
          </div>
          <p className="mt-5 max-w-xl leading-relaxed text-ink/80">{product.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Info label="Origin" value={product.origin} />
            <Info label="Variety" value={product.variety} />
            <Info label="Availability" value={soldOut ? "Out of stock" : product.stock <= 8 ? `${product.stock} packs left` : "In stock"} />
            <Info label="Per kg" value={perKg(weight) ? inr(perKg(weight)) : "—"} />
          </dl>
          <div className="mt-6">
            <p className="text-sm font-medium">Packaging size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.weights.map((option) => (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => setSize(option.size)}
                  aria-pressed={option.size === weight.size}
                  className={`h-11 rounded-full px-4 text-sm font-semibold ${option.size === weight.size ? "bg-forest text-cream" : "border border-forest/15 bg-white text-forest"}`}
                >
                  {option.size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-semibold text-forest">{inr(weight.price)}</p>
              {off > 0 && (
                <p className="text-sm text-ink/55">
                  <span className="line-through">{inr(weight.original)}</span>
                  <span className="ml-2 font-semibold text-olive">{off}% off</span>
                </p>
              )}
            </div>
            <QuantitySelector value={qty} max={Math.max(1, product.stock || 1)} onChange={setQty} />
          </div>
          <div className="mt-6 hidden gap-3 lg:grid sm:grid-cols-2">
            <button type="button" disabled={soldOut} onClick={() => add(false)} className="h-12 rounded-full bg-forest text-sm font-semibold text-cream disabled:opacity-50">
              {soldOut ? "Out of stock" : "Add to cart"}
            </button>
            <button type="button" disabled={soldOut} onClick={() => add(true)} className="h-12 rounded-full bg-wheat text-sm font-semibold text-ink disabled:opacity-50">
              Buy now
            </button>
          </div>
          <WhatsAppButton
            className="mt-3 w-full"
            message={productEnquiry({
              name: product.name,
              size: weight.size,
              qty,
              url: typeof window !== "undefined" ? window.location.href : "",
            })}
          />
          <ul className="mt-6 space-y-2 text-sm text-ink/75">
            {product.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wheat" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink/50">Sample sourcing and pricing for this demonstration catalogue.</p>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-4xl text-forest">Sample reviews</h2>
        <p className="mt-2 text-sm text-ink/60">Written for this demonstration. Not verified buyer feedback.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-4xl text-forest">Related grains</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      {viewed.length > 0 && (
        <section className="mt-14">
          <h2 className="text-4xl text-forest">Recently viewed</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {viewed.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-forest/10 bg-cream/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-forest">{weight.size}</p>
            <p className="font-semibold">{inr(weight.price)}</p>
          </div>
          <button type="button" disabled={soldOut} onClick={() => add(false)} className="ml-auto h-12 flex-1 rounded-full bg-forest text-sm font-semibold text-cream disabled:opacity-50">
            {soldOut ? "Out of stock" : "Add to cart"}
          </button>
        </div>
      </div>
    </Container>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-3">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-olive">{label}</dt>
      <dd className="mt-1 font-medium text-forest">{value}</dd>
    </div>
  );
}
