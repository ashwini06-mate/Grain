import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-forest/10 rounded-3xl border border-forest/10 bg-white">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
            >
              <span className="font-medium text-forest">{item.q}</span>
              <ChevronDown size={18} className={`shrink-0 transition ${expanded ? "rotate-180" : ""}`} />
            </button>
            {expanded && <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
