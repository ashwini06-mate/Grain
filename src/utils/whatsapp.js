import { site } from "../data/site";

export function waLink(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function productEnquiry({ name, size, qty, url }) {
  return [
    "Hello DHANYA,",
    "",
    "I would like to enquire about:",
    name,
    `Pack: ${size}`,
    `Quantity: ${qty}`,
    url ? `Page: ${url}` : null,
    "",
    "Sent from the DHANYA demonstration website.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function bulkEnquiry(form) {
  return [
    "Hello DHANYA, I have a bulk enquiry.",
    "",
    `Business: ${form.business}`,
    `Contact: ${form.person}`,
    `Mobile: ${form.mobile}`,
    `Email: ${form.email}`,
    `Business type: ${form.type}`,
    `Requirement: ${form.requirement}`,
    `Variety: ${form.variety || "Not specified"}`,
    `Quantity: ${form.quantity} ${form.unit}`,
    `Delivery city: ${form.city}`,
    form.message ? `Note: ${form.message}` : null,
    "",
    "Sent from the DHANYA bulk desk.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function contactEnquiry(form) {
  return [
    "Hello DHANYA,",
    "",
    `Name: ${form.name}`,
    `Mobile: ${form.mobile}`,
    `Email: ${form.email}`,
    "",
    form.message,
    "",
    "Sent from the contact page.",
  ].join("\n");
}
