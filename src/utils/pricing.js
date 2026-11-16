import { featuredWeight, weightBySize } from "../data/products";

export function inr(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function discountPercent(original, price) {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

export function perKg(weight) {
  const kg = parseFloat(weight.size);
  if (!kg) return null;
  return Math.round(weight.price / kg);
}

export function deliveryFee(subtotal, lines) {
  if (subtotal <= 0) return 0;
  const hasBulkPack = lines.some((line) => parseFloat(line.size) >= 25);
  if (subtotal >= 2499) return 0;
  if (hasBulkPack) return 149;
  if (subtotal >= 999) return 0;
  return 79;
}

export function resolveLines(cart, getProduct) {
  return cart
    .map((line) => {
      const product = getProduct(line.productId);
      if (!product) return null;
      const weight = weightBySize(product, line.size);
      return {
        ...line,
        product,
        size: weight.size,
        unitPrice: weight.price,
        unitOriginal: weight.original,
        lineTotal: weight.price * line.qty,
      };
    })
    .filter(Boolean);
}

export function cartMoney(lines) {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const delivery = deliveryFee(subtotal, lines);
  return { subtotal, delivery, total: subtotal + delivery };
}

export function popularity(product) {
  return product.rating * product.reviewCount;
}

export { featuredWeight };
