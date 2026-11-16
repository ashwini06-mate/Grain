import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, MapPinned, ShieldCheck, Boxes } from "lucide-react";
import { photos } from "../data/photos";
import { products } from "../data/products";
import { benefits, categories, faqs, regions, steps, testimonials } from "../data/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container, Photo } from "../components/ui";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ReviewCard from "../components/ReviewCard";
import FaqList from "../components/FaqList";
import { useStore } from "../context/StoreContext";
import { getProduct } from "../data/products";

const icons = [Leaf, MapPinned, ShieldCheck, Boxes];

export default function Home() {
  usePageMeta(
    "Pure Grains, Better Living",
    "Discover carefully selected rice and wheat, sourced from trusted agricultural regions and delivered to your doorstep.",
  );
  const { recent } = useStore();
  const recentProducts = recent.map(getProduct).filter(Boolean);
  const bestsellers = products.filter((product) => product.bestseller).slice(0, 8);

  return (
    <>
      <section className="relative min-h-[36rem] overflow-hidden sm:min-h-[92vh]">
        <Photo src={photos.hero} alt="White, cream and red rice grains" priority className="absolute inset-0 h-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/92 via-forest/75 to-forest/25" />
        <Container className="relative flex min-h-[36rem] flex-col justify-end pb-12 pt-16 sm:min-h-[92vh] sm:pb-20 sm:pt-28">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="max-w-full text-[11px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-wheat sm:text-xs sm:tracking-[0.28em]">DHANYA · Pure Grains, Better Living</p>
            <h1 className="mt-4 max-w-4xl text-[2.6rem] leading-[0.95] text-cream min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
              Good Grains. Honest Sourcing. Better Living.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              Discover carefully selected rice and wheat, sourced from trusted agricultural regions and delivered to your doorstep.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="inline-flex h-12 items-center justify-center rounded-full bg-wheat px-6 text-sm font-semibold text-ink">
                Explore Our Collection
              </Link>
              <Link to="/sourcing" className="inline-flex h-12 items-center justify-center rounded-full border border-cream/40 px-6 text-sm font-semibold text-cream">
                Explore Our Sourcing
              </Link>
            </div>
          </motion.div>
          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-x-3 gap-y-4 sm:mt-12 sm:grid-cols-4 sm:gap-4">
            {[
              ["26", "Sample grains"],
              ["12", "Regions named"],
              ["1–50 kg", "Pack sizes"],
              ["India", "Delivery notes"],
            ].map(([value, label]) => (
              <div key={label} className="min-w-0 border-t border-cream/25 pt-3">
                <dt className="font-display text-2xl text-cream sm:text-3xl">{value}</dt>
                <dd className="text-[10px] uppercase tracking-wide text-cream/70 sm:text-xs">{label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <div className="overflow-hidden border-b border-forest/10 bg-white py-3">
        <div className="marquee-track flex w-max gap-8 px-4 text-xs font-semibold uppercase tracking-[0.22em] text-olive">
          {Array.from({ length: 2 }).map((_, copy) => (
            <p key={copy} className="flex gap-8">
              {["Basmati", "Sona Masoori", "Ambemohar", "Gobindobhog", "Sharbati", "Lokwan", "Kolam", "Malwa Wheat"].map((name) => (
                <span key={`${copy}-${name}`}>{name}</span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle eyebrow="Collections" title="Grain for the way you cook" text="Six ways into the catalogue, from festive basmati to the wheat sack that goes to the chakki." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category, index) => (
              <CategoryCard key={category.title} category={category} className={index === 0 ? "sm:col-span-2 lg:row-span-2 lg:min-h-[24rem] xl:min-h-[32rem]" : "min-h-64"} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionTitle eyebrow="Bestsellers" title="Grains people open first" text="Prices shown are for the 5 kg pack. Open a grain to choose 1 kg, 10 kg, 25 kg or 50 kg where it is listed." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle eyebrow="Why DHANYA" title="A calmer way to buy grain" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = icons[index];
              return (
                <article key={benefit.title} className="rounded-3xl border border-forest/10 bg-white p-6">
                  <Icon className="text-olive" />
                  <h3 className="mt-4 font-display text-3xl text-forest">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-forest py-16 text-cream sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-wheat">Our sourcing story</p>
            <h2 className="mt-3 max-w-xl text-4xl leading-tight sm:text-6xl">Regions first. Then the grain on your shelf.</h2>
            <p className="mt-5 max-w-xl text-cream/80">
              DHANYA’s catalogue is organised by the agricultural regions attached to each sample lot. Punjab and Haryana carry basmati, Maharashtra carries its local rices, Bengal carries Gobindobhog, and Madhya Pradesh carries the wheat story.
            </p>
            <Link to="/sourcing" className="mt-8 inline-flex h-12 items-center rounded-full bg-wheat px-6 text-sm font-semibold text-ink">
              Read the sourcing map
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {regions.slice(0, 4).map((region) => (
              <Link key={region.id} to={`/shop?origin=${encodeURIComponent(region.name === "Madhya Pradesh" ? "Madhya Pradesh" : region.name)}`} className="rounded-3xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
                <p className="text-xs uppercase tracking-[0.16em] text-wheat">{region.group}</p>
                <h3 className="mt-2 font-display text-3xl">{region.name}</h3>
                <p className="mt-2 text-sm text-cream/75">{region.grains}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle eyebrow="How it works" title="From catalogue to doorstep" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white p-6">
                <span className="font-display text-4xl text-wheat">0{index + 1}</span>
                <h3 className="mt-3 font-display text-3xl text-forest">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="px-4 pb-4 sm:px-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-ink text-cream lg:grid-cols-2 2xl:max-w-[88rem]">
          <Photo src={photos.wheat} alt="Uncooked wheat grains" className="min-h-72" />
          <div className="p-8 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-wheat">Bulk orders</p>
            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">For hotels, kitchens and traders</h2>
            <p className="mt-4 text-cream/75">
              Restaurants, grocery stores, distributors and food businesses can send a quantity, a city and a variety. The form opens WhatsApp with the note ready to send.
            </p>
            <Link to="/bulk" className="mt-8 inline-flex h-12 items-center rounded-full bg-wheat px-6 text-sm font-semibold text-ink">
              Request a Bulk Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionTitle eyebrow="Sample stories" title="What a buyer might notice" text="These cards are written for the demonstration. They are not verified customer reviews." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {testimonials.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </Container>
      </section>

      {recentProducts.length > 0 && (
        <section className="pb-16">
          <Container>
            <SectionTitle eyebrow="Recently viewed" title="Pick up where you left off" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recentProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-white py-16 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="FAQ" title="Before you order" text="Sourcing, packs, delivery, bulk buying and the demo payment flow." />
            <Link to="/faq" className="mt-6 inline-flex text-sm font-semibold text-olive">
              Read all questions
            </Link>
          </div>
          <FaqList items={faqs.slice(0, 5)} />
        </Container>
      </section>
    </>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-olive">{eyebrow}</p>
      <h2 className="mt-2 text-4xl leading-tight text-forest sm:text-5xl">{title}</h2>
      {text && <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">{text}</p>}
    </div>
  );
}
