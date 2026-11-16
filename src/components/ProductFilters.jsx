import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { origins, varieties } from "../data/products";
import { priceBands } from "../utils/filter";

export default function ProductFilters({
  category,
  collection,
  varietyList,
  originList,
  price,
  onCollection,
  onToggleVariety,
  onToggleOrigin,
  onPrice,
  onClear,
  open,
  onClose,
}) {
  const panel = (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-3xl text-forest">Filters</h2>
        <button type="button" onClick={onClear} className="text-sm font-semibold text-olive">
          Clear all
        </button>
      </div>
      <FilterGroup title="Grain">
        <div className="flex flex-wrap gap-2">
          <FilterLink to="/shop" active={!category}>All</FilterLink>
          <FilterLink to="/rice" active={category === "rice"}>Rice</FilterLink>
          <FilterLink to="/wheat" active={category === "wheat"}>Wheat</FilterLink>
        </div>
      </FilterGroup>
      <FilterGroup title="Collection">
        {["premium", "everyday", "traditional"].map((item) => (
          <Check
            key={item}
            checked={collection === item}
            onChange={() => onCollection(collection === item ? "" : item)}
            label={item[0].toUpperCase() + item.slice(1)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Variety">
        <div className="max-h-52 space-y-2 overflow-auto pr-1">
          {varieties
            .filter((item) => (category ? availableVariety(category, item) : true))
            .map((item) => (
              <Check key={item} checked={varietyList.includes(item)} onChange={() => onToggleVariety(item)} label={item} />
            ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Origin">
        <div className="max-h-48 space-y-2 overflow-auto pr-1">
          {origins.map((item) => (
            <Check key={item} checked={originList.includes(item)} onChange={() => onToggleOrigin(item)} label={item} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price of 5 kg pack">
        {priceBands.map((band) => (
          <Check key={band.id} checked={price === band.id} onChange={() => onPrice(price === band.id ? "" : band.id)} label={band.label} />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-auto lg:rounded-3xl lg:border lg:border-forest/10 lg:bg-white lg:p-5">
        {panel}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close filters" onClick={onClose} />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm overflow-auto bg-cream p-5 shadow-xl">
            <button type="button" className="mb-4 inline-flex h-11 items-center gap-2 text-sm font-semibold" onClick={onClose}>
              <X size={16} /> Close
            </button>
            {panel}
          </div>
        </div>
      )}
    </>
  );
}

function availableVariety(category, variety) {
  const rice = ["Basmati", "Sona Masoori", "Kolam", "Indrayani", "Ambemohar", "Jeera", "Brown Rice", "Red Rice", "Gobindobhog", "Non-Basmati", "Hand-pounded", "Daily Cook"];
  return category === "rice" ? rice.includes(variety) : !rice.includes(variety);
}

function FilterGroup({ title, children }) {
  return (
    <fieldset className="mt-6 border-t border-forest/10 pt-4">
      <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-olive">{title}</legend>
      <div className="mt-3 space-y-2">{children}</div>
    </fieldset>
  );
}

function Check({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-forest" />
      <span>{label}</span>
    </label>
  );
}

function FilterLink({ to, active, children }) {
  return (
    <Link to={to} className={`rounded-full px-3 py-1.5 text-sm ${active ? "bg-forest text-cream" : "bg-cream text-forest"}`} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}
