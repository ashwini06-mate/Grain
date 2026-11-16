import { Link } from "react-router-dom";
import { Photo } from "./ui";

export default function CategoryCard({ category, className = "" }) {
  return (
    <Link to={category.to} className={`group relative block overflow-hidden rounded-3xl ${className}`}>
      <Photo src={category.image} alt={category.alt} className="h-full min-h-56 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <h3 className="font-display text-3xl leading-tight">{category.title}</h3>
        <p className="mt-2 max-w-xs text-sm text-cream/80">{category.text}</p>
      </div>
    </Link>
  );
}
