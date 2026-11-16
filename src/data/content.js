import { photos } from "./photos";

export const categories = [
  {
    title: "Premium Rice",
    text: "Basmati and special lots for festive pots and small kitchens.",
    to: "/rice?collection=premium",
    image: photos.rice,
    alt: "Close-up of premium white rice",
  },
  {
    title: "Everyday Rice",
    text: "Lighter daily varieties for tiffins, dal and family meals.",
    to: "/rice?collection=everyday",
    image: photos.riceBright,
    alt: "Close-up of white rice grains",
  },
  {
    title: "Basmati Rice",
    text: "Long grains from the Punjab and Haryana sample listings.",
    to: "/rice?variety=Basmati",
    image: photos.riceWhite,
    alt: "Uncooked white rice grains",
  },
  {
    title: "Traditional Rice",
    text: "Regional grains such as Indrayani, Ambemohar and Gobindobhog.",
    to: "/rice?collection=traditional",
    image: photos.ricePiles,
    alt: "White and red rice grains",
  },
  {
    title: "Premium Wheat",
    text: "Sharbati, Malwa and milling wheat for soft rotis.",
    to: "/wheat?collection=premium",
    image: photos.wheat,
    alt: "Close-up of wheat grains",
  },
  {
    title: "Everyday Wheat",
    text: "Household wheat in packs from 1 kg to 50 kg.",
    to: "/wheat?collection=everyday",
    image: photos.wheatEar,
    alt: "Uncooked wheat grains",
  },
];

export const benefits = [
  {
    title: "Carefully selected grains",
    text: "Every listing names a variety, a pack size and a sample origin so buyers can compare before they order.",
  },
  {
    title: "Trusted sourcing regions",
    text: "Rice and wheat in this catalogue are attached to regions such as Punjab, Maharashtra, Bengal and Madhya Pradesh.",
  },
  {
    title: "Quality-focused selection",
    text: "Lots are described by grain type and kitchen use. We do not add health or pesticide-free claims.",
  },
  {
    title: "Retail and bulk availability",
    text: "Most grains are packed from 1 kg to 25 kg, with 50 kg on selected lots and a separate bulk desk.",
  },
];

export const steps = [
  { title: "Explore products", text: "Browse rice and wheat, or search by variety, region and pack size." },
  { title: "Choose your grain", text: "Open a product, pick 1 kg through 50 kg, and set a quantity." },
  { title: "Place your order", text: "Check out with a demo payment path, or send a bulk note on WhatsApp." },
  { title: "Receive your delivery", text: "Retail delivery is described for addresses across India in this demonstration." },
];

export const regions = [
  {
    id: "punjab",
    name: "Punjab",
    group: "North",
    grains: "Premium basmati, steam basmati, whole wheat",
    description:
      "The sample catalogue uses Punjab for long-grain basmati and a cleaned whole-wheat lot. Listings spell out the variety and pack rather than a farm certificate.",
  },
  {
    id: "haryana",
    name: "Haryana",
    group: "North",
    grains: "Traditional basmati, aged basmati, chakki wheat",
    description:
      "Haryana appears on basmati listings and on wheat packed for chakki grinding. Prices stay on the product, so a buyer can compare 5 kg and 25 kg directly.",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    group: "West",
    grains: "Traditional wheat",
    description:
      "Rajasthan is attached to the traditional wheat listing. That lot is currently shown as out of stock so the catalogue can demonstrate an unavailable state.",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    group: "West",
    grains: "Jeera rice",
    description:
      "Jeera rice is the Gujarat grain in this range: small grains aimed at quick weekday cooking beside dal and sabzi.",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    group: "West",
    grains: "Kolam, Indrayani, Ambemohar, Lokwan, Maharashtra wheat",
    description:
      "Maharashtra is the widest rice region in the sample data, with Kolam for daily meals and Indrayani and Ambemohar for more aromatic plates, plus two wheat lots.",
  },
  {
    id: "mp",
    name: "Madhya Pradesh",
    group: "Central",
    grains: "Sharbati, MP wheat, milling wheat, Malwa gold",
    description:
      "Madhya Pradesh carries the wheat story: Sharbati and Malwa for rotis, plus a milling lot for homes and small mills.",
  },
  {
    id: "up",
    name: "Uttar Pradesh",
    group: "Central",
    grains: "Everyday non-basmati rice, everyday wheat",
    description:
      "Uttar Pradesh is used for the value rice and wheat packs, including 50 kg sacks where a household buys for the month.",
  },
  {
    id: "wb",
    name: "West Bengal",
    group: "East",
    grains: "Gobindobhog",
    description:
      "Gobindobhog is the Bengal grain in the catalogue: a small aromatic rice described for light gravies and festive plates.",
  },
  {
    id: "andhra",
    name: "Andhra Pradesh",
    group: "South",
    grains: "Sona Masoori",
    description:
      "Sona Masoori is listed with Andhra Pradesh and is one of the everyday rice bestsellers in the sample shop.",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    group: "South",
    grains: "Brown rice, daily cook rice",
    description:
      "Karnataka holds brown rice for a nuttier bite and Daily Cook rice for larger families, including a 50 kg pack.",
  },
  {
    id: "kerala",
    name: "Kerala",
    group: "South",
    grains: "Red rice",
    description:
      "Red rice is the Kerala listing. It is a smaller stock item in the demo so the shop can show a low-stock badge.",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    group: "South",
    grains: "Hand-pounded rice",
    description:
      "Hand-pounded rice is tied to Tamil Nadu in the sample data, with 1 kg, 5 kg and 10 kg packs.",
  },
];

export const faqs = [
  {
    q: "Where are the grains sourced?",
    a: "Each product names a sample origin such as Punjab, Maharashtra or West Bengal. Those notes are demonstration data for this catalogue, not a farm audit or a certificate.",
  },
  {
    q: "Which varieties can I buy?",
    a: "Rice includes basmati, Sona Masoori, Kolam, Indrayani, Ambemohar, Jeera, brown, red, Gobindobhog and everyday non-basmati. Wheat includes Sharbati, Lokwan, MP, Malwa, whole wheat and milling wheat.",
  },
  {
    q: "What pack sizes are available?",
    a: "Most grains are offered in 1 kg, 5 kg, 10 kg and 25 kg. Selected rice and wheat lots also include 50 kg. The price updates when you change the pack on the product page.",
  },
  {
    q: "How does delivery work?",
    a: "This demonstration describes delivery across India. Orders under ₹999 have a ₹79 delivery fee. Orders of ₹999 or more ship free, unless the cart includes a 25 kg or 50 kg pack and is still under ₹2,499, in which case the fee is ₹149.",
  },
  {
    q: "Can hotels and shops buy in bulk?",
    a: "Yes. The bulk desk is for hotels, restaurants, grocery stores, distributors, wholesalers and other food businesses. The form opens WhatsApp with your quantity, city and variety filled in.",
  },
  {
    q: "What is the returns policy?",
    a: "This sample policy accepts a replacement request for a damaged or incorrect pack reported within 48 hours of delivery. The replacement is the same grain and pack. This is demonstration policy text, not a legal warranty.",
  },
  {
    q: "Which payment methods are shown?",
    a: "Checkout offers cash on delivery, UPI and card as a simulated flow. Nothing is charged and no payment gateway is connected. The confirmation page states that clearly.",
  },
  {
    q: "Do you make nutrition or pesticide-free claims?",
    a: "No. DHANYA describes variety, kitchen use, pack size and sample origin. We do not claim medical benefits, certified organic status or pesticide-free grain.",
  },
  {
    q: "Is the wheat already milled into atta?",
    a: "No. Wheat listings are whole grain for home or chakki milling. If you need milled flour, say so in the bulk or WhatsApp note.",
  },
  {
    q: "Are the reviews genuine customer feedback?",
    a: "No. Review cards are sample stories written for this demonstration. They are labelled as such and should be replaced with real feedback before a business goes live.",
  },
];

export const testimonials = [
  {
    name: "A. Mehta",
    city: "Pune",
    role: "Home cook",
    quote: "Sample story: the 5 kg Sona Masoori cooked evenly for weekday lunch, and the pack size was easy to store.",
  },
  {
    name: "R. Iyer",
    city: "Bengaluru",
    role: "Small restaurant",
    quote: "Sample story: we used the kitchen basmati listing to compare 10 kg and 25 kg prices before sending a bulk note.",
  },
  {
    name: "S. Kaur",
    city: "Ludhiana",
    role: "Household buyer",
    quote: "Sample story: the Sharbati page made it clear the sack is whole grain for the chakki, which is what we wanted.",
  },
  {
    name: "N. Deshmukh",
    city: "Nashik",
    role: "Grocery shop",
    quote: "Sample story: filtering by Maharashtra showed Indrayani, Ambemohar and Lokwan in one place for a regional shelf.",
  },
];

export const audiences = [
  { title: "Hotels", text: "Monthly rice and wheat for in-house kitchens and banquet prep." },
  { title: "Restaurants", text: "Basmati and everyday rice in 10 kg, 25 kg and 50 kg packs." },
  { title: "Grocery stores", text: "A short list of varieties you can reorder by the sack." },
  { title: "Distributors", text: "Region-wise lots you can discuss before placing a large indent." },
  { title: "Wholesalers", text: "Quantity in kilograms or quintals, with city of delivery." },
  { title: "Food businesses", text: "Canteens, caterers and cloud kitchens buying on a schedule." },
];

export const sampleReviews = [
  {
    name: "Meera S.",
    city: "Jaipur",
    text: "Sample review: the pack matched the variety name on the label, and the grain looked even in the scoop.",
  },
  {
    name: "Arjun P.",
    city: "Hyderabad",
    text: "Sample review: changing from 5 kg to 10 kg updated the price before I added it to the cart.",
  },
  {
    name: "Fatima K.",
    city: "Kolkata",
    text: "Sample review: the origin line told me this was catalogue data, which made the listing easy to trust as a demo.",
  },
  {
    name: "Vikram N.",
    city: "Indore",
    text: "Sample review: I compared two wheat lots by per-kilo price and kept the one that suited daily rotis.",
  },
];

export function reviewsFor(product) {
  const start = product.addedOrder % sampleReviews.length;
  return [0, 1].map((offset) => {
    const review = sampleReviews[(start + offset) % sampleReviews.length];
    return { ...review, rating: Math.max(4, Math.round(product.rating)) };
  });
}

export const businessTypes = [
  "Hotel",
  "Restaurant",
  "Grocery store",
  "Distributor",
  "Wholesaler",
  "Food business",
  "Other",
];
