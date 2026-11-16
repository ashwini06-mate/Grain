import { Link } from "react-router-dom";
import { photos } from "../data/photos";
import { audiences } from "../data/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container, PageHero, Photo } from "../components/ui";

const values = [
  { title: "Plain language", text: "Variety, pack size and sample origin are written where a buyer can see them." },
  { title: "Homes and kitchens", text: "The same grain can be a 1 kg pouch for a family or a 25 kg sack for a small restaurant." },
  { title: "No stretched claims", text: "DHANYA does not describe grain as medicine, and it does not call lots pesticide-free." },
  { title: "A bulk desk", text: "Hotels, shops and distributors can send a quantity without pretending checkout is a contract." },
];

export default function About() {
  usePageMeta("About Us", "DHANYA is an Indian grains brand for households, retailers, restaurants, hotels and bulk buyers.");
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Grain, told simply."
        text="DHANYA is written as an Indian sourcing and selling desk for rice and wheat. This website is a client demonstration of how that brand can look and sell."
      />
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2">
        <Photo src={photos.wheatEar} alt="Close-up of wheat grains" className="min-h-80 rounded-[2rem]" />
        <div>
          <h2 className="text-4xl text-forest sm:text-5xl">From the field story to the sack on the shelf</h2>
          <p className="mt-4 leading-relaxed text-ink/75">
            The business sources rice and wheat from agricultural regions across India, with attention to grain quality, freshness, consistency and careful selection. It serves households, retailers, restaurants, hotels and bulk buyers, and it describes delivery across India.
          </p>
          <p className="mt-4 leading-relaxed text-ink/75">
            On this demonstration site, every price, review and origin line is sample content. The shopping flow is real: search, pack sizes, cart, checkout and WhatsApp enquiries all work in the browser.
          </p>
          <Link to="/sourcing" className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-6 text-sm font-semibold text-cream">
            See the regions
          </Link>
        </div>
      </Container>
      <Container className="grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <article key={value.title} className="rounded-3xl bg-white p-6">
            <h3 className="font-display text-3xl text-forest">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{value.text}</p>
          </article>
        ))}
      </Container>
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-4xl text-forest">Who the catalogue is for</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item) => (
              <article key={item.title} className="rounded-3xl border border-forest/10 p-5">
                <h3 className="font-display text-3xl text-forest">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
