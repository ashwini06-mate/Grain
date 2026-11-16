import { useState } from "react";
import { Link } from "react-router-dom";
import { photos } from "../data/photos";
import { regions } from "../data/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container, PageHero, Photo } from "../components/ui";

const groups = ["North", "West", "Central", "East", "South"];

export default function Sourcing() {
  usePageMeta("Our Sourcing", "How the DHANYA sample catalogue organises rice and wheat by agricultural region.");
  const [active, setActive] = useState(regions[0].id);
  const region = regions.find((item) => item.id === active) || regions[0];

  return (
    <>
      <PageHero
        eyebrow="Our sourcing"
        title="A map made of regions, not slogans."
        text="Each grain in the shop names a sample origin. Choose a region to see which varieties the demonstration catalogue attaches to it."
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[2rem]">
          <Photo src={photos.ricePiles} alt="Piles of white and red rice grains" className="min-h-[28rem]" />
          <div className="absolute inset-0 bg-forest/55" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-cream sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-wheat">Illustrative region guide</p>
            <p className="mt-2 max-w-md text-sm text-cream/80">Pins are grouped by part of India. They are a guide to the sample data, not a surveyed field map.</p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-olive">{region.group}</p>
          <h2 className="mt-2 text-4xl text-forest">{region.name}</h2>
          <p className="mt-2 text-sm font-medium text-olive">{region.grains}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/75">{region.description}</p>
          <Link to={`/shop?origin=${encodeURIComponent(region.name)}`} className="mt-6 inline-flex h-auto min-h-11 items-center rounded-full bg-forest px-5 py-3 text-center text-sm font-semibold text-cream">
            View grains from {region.name}
          </Link>
        </div>
      </Container>
      <Container className="space-y-8 pb-16">
        {groups.map((group) => (
          <section key={group}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-olive">{group}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {regions
                .filter((item) => item.group === group)
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(item.id)}
                    aria-pressed={item.id === active}
                    className={`h-11 rounded-full px-4 text-sm font-semibold ${item.id === active ? "bg-forest text-cream" : "bg-white text-forest"}`}
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
