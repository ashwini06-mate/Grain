import { useState } from "react";
import { Star } from "lucide-react";
import { discountPercent, inr } from "../utils/pricing";

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[88rem] ${className}`}>{children}</div>;
}

export function Photo({ src, alt, className = "", priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const fills = /\b(absolute|fixed)\b/.test(className);

  return (
    <div className={`${fills ? "" : "relative"} overflow-hidden bg-forest/10 ${className}`}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse bg-olive/20" />}
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <div className="flex h-full min-h-40 w-full items-center justify-center bg-gradient-to-br from-forest to-olive px-4 text-center font-display text-3xl text-cream">
          DHANYA
        </div>
      )}
    </div>
  );
}

export function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={14} className={index < full ? "fill-wheat text-wheat" : "text-forest/20"} />
      ))}
    </span>
  );
}

export function PriceTag({ original, price, compact = false }) {
  const off = discountPercent(original, price);
  return (
    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={`font-semibold text-forest ${compact ? "text-base" : "text-lg"}`}>{inr(price)}</span>
      {off > 0 && <span className="text-sm text-ink/45 line-through">{inr(original)}</span>}
      {off > 0 && <span className="text-xs font-semibold uppercase tracking-wide text-olive">{off}% off</span>}
    </span>
  );
}

export function Field({ label, error, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-ink/55">{hint}</span>}
      {error && <span className="mt-1 block text-sm text-red-800">{error}</span>}
    </label>
  );
}

export function PageHero({ eyebrow, title, text }) {
  return (
    <section className="border-b border-forest/10 bg-white">
      <Container className="py-12 sm:py-16">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight text-forest sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/75 sm:text-lg">{text}</p>}
      </Container>
    </section>
  );
}

export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-forest/10 bg-white">
      <div className="aspect-[4/5] animate-pulse bg-olive/15" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-24 animate-pulse rounded bg-olive/15" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-olive/20" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-olive/15" />
        <div className="h-11 animate-pulse rounded-full bg-olive/15" />
      </div>
    </div>
  );
}
