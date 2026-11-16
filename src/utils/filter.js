import { featuredWeight } from "../data/products";
import { popularity } from "./pricing";

export const priceBands = [
  { id: "under-500", label: "Under ₹500" },
  { id: "500-1000", label: "₹500 – ₹1,000" },
  { id: "1000-2000", label: "₹1,000 – ₹2,000" },
  { id: "above-2000", label: "Above ₹2,000" },
];

function inBand(price, band) {
  if (band === "under-500") return price < 500;
  if (band === "500-1000") return price >= 500 && price <= 1000;
  if (band === "1000-2000") return price >= 1000 && price <= 2000;
  if (band === "above-2000") return price > 2000;
  return true;
}

export function filterProducts(list, criteria) {
  const q = criteria.q?.trim().toLowerCase();
  const filtered = list.filter((product) => {
    if (criteria.category && product.category !== criteria.category) return false;
    if (criteria.collection && product.collection !== criteria.collection) return false;
    if (criteria.varieties?.length && !criteria.varieties.includes(product.variety)) return false;
    if (criteria.origins?.length && !criteria.origins.includes(product.origin)) return false;
    if (criteria.price && !inBand(featuredWeight(product).price, criteria.price)) return false;
    if (q) {
      const hay = `${product.name} ${product.variety} ${product.origin} ${product.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  const sort = criteria.sort || "popular";
  if (sort === "price-asc") {
    sorted.sort((a, b) => featuredWeight(a).price - featuredWeight(b).price);
  } else if (sort === "price-desc") {
    sorted.sort((a, b) => featuredWeight(b).price - featuredWeight(a).price);
  } else if (sort === "newest") {
    sorted.sort((a, b) => b.addedOrder - a.addedOrder);
  } else {
    sorted.sort((a, b) => popularity(b) - popularity(a));
  }
  return sorted;
}
