import { Stars } from "./ui";

export default function ReviewCard({ review, compact = false }) {
  return (
    <figure className={`rounded-3xl border border-forest/10 bg-white p-5 shadow-sm ${compact ? "" : "sm:p-6"}`}>
      <figcaption className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium text-forest">{review.name}</p>
          <p className="text-sm text-ink/55">
            {review.city}
            {review.role ? ` · ${review.role}` : ""}
          </p>
        </div>
        {review.rating && <Stars value={review.rating} />}
      </figcaption>
      <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">{review.quote || review.text}</blockquote>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-olive">Sample review</p>
    </figure>
  );
}
