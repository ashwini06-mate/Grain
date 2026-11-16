import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink/60">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight size={14} aria-hidden="true" />}
              {last || !item.to ? (
                <span className="text-forest" aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="hover:text-forest">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
