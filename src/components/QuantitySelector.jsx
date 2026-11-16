export default function QuantitySelector({ value, onChange, min = 1, max = 20, label = "Quantity" }) {
  return (
    <div className="inline-flex items-center rounded-full border border-forest/15 bg-white">
      <button
        type="button"
        className="h-11 w-11 rounded-full text-lg text-forest disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="h-11 w-11 rounded-full text-lg text-forest disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  );
}
