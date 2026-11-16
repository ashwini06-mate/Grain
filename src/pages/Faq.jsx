import { faqs } from "../data/content";
import { usePageMeta } from "../hooks/usePageMeta";
import { Container, PageHero } from "../components/ui";
import FaqList from "../components/FaqList";

export default function Faq() {
  usePageMeta("FAQ", "Answers about DHANYA sourcing, varieties, pack sizes, delivery, bulk orders, returns and demo payments.");
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered plainly." text="These answers describe the demonstration catalogue. Replace the returns note with your own policy before a real launch." />
      <Container className="py-12">
        <FaqList items={faqs} />
      </Container>
    </>
  );
}
