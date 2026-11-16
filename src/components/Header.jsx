import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, Heart, UserRound, ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { navLinks, site } from "../data/site";
import { useStore } from "../context/StoreContext";
import { Container } from "./ui";

const linkClass = ({ isActive }) =>
  `text-[13px] tracking-wide transition hover:text-forest ${isActive ? "text-forest" : "text-ink/70"}`;

export default function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useStore();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search, setMenuOpen, setSearchOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-cream/90 backdrop-blur-md">
      <div className="bg-forest text-cream">
        <Container className="flex items-center justify-between gap-3 py-2 text-[11px] tracking-wide sm:text-xs">
          <p className="truncate">Demonstration catalogue · Selected rice and wheat</p>
          <p className="hidden shrink-0 sm:block">Free delivery above ₹999</p>
        </Container>
      </div>
      <Container className="flex h-16 items-center gap-1 sm:h-[4.5rem] sm:gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-forest sm:h-11 sm:w-11 xl:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={22} />
        </button>
        <Link to="/" className="mr-auto flex min-w-0 items-center gap-1.5 sm:gap-2 lg:mr-0" aria-label="DHANYA home">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-wheat sm:h-9 sm:w-9">
            <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
              <path d="M12 3c1.8 3.6 2.8 6.2 2.8 9.2a2.8 2.8 0 1 1-5.6 0C9.2 9.2 10.2 6.6 12 3z" fill="currentColor" />
            </svg>
          </span>
          <span className="min-w-0 leading-none">
            <span className="block whitespace-nowrap font-display text-2xl tracking-wide text-forest sm:text-3xl">{site.name}</span>
            <span className="hidden truncate text-[10px] uppercase tracking-[0.18em] text-olive md:block">{site.tagline}</span>
          </span>
        </Link>
        <nav className="ml-4 hidden min-w-0 items-center gap-x-3 xl:flex 2xl:gap-x-5" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center">
          <IconButton label="Search grains" onClick={() => setSearchOpen(true)}>
            <Search size={20} />
          </IconButton>
          <Link to="/wishlist" className="relative hidden h-10 w-10 items-center justify-center rounded-full text-forest sm:inline-flex sm:h-11 sm:w-11" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && <Badge value={wishlist.length} />}
          </Link>
          <Link to="/account" className="hidden h-11 w-11 items-center justify-center rounded-full text-forest md:inline-flex" aria-label="Account">
            <UserRound size={20} />
          </Link>
          <IconButton label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`} onClick={() => setCartOpen(true)}>
            <ShoppingBag size={20} />
            {count > 0 && <Badge value={count} />}
          </IconButton>
        </div>
      </Container>
    </header>
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-forest text-cream xl:hidden">
          <Container className="flex h-16 shrink-0 items-center justify-between">
            <span className="font-display text-3xl">DHANYA</span>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X />
            </button>
          </Container>
          <nav className="flex-1 overflow-y-auto px-6 pb-8" aria-label="Mobile">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className="block border-b border-white/10 py-3 font-display text-3xl sm:py-4 sm:text-4xl" onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/wishlist" className="block border-b border-white/10 py-3 font-display text-3xl sm:hidden sm:py-4" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>
            <Link to="/account" className="block border-b border-white/10 py-3 font-display text-3xl md:hidden sm:py-4 sm:text-4xl" onClick={() => setMenuOpen(false)}>
              Account
            </Link>
            <Link to="/faq" className="block py-3 font-display text-3xl sm:py-4 sm:text-4xl" onClick={() => setMenuOpen(false)}>
              FAQ
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

function IconButton({ label, onClick, children }) {
  return (
    <button type="button" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-forest sm:h-11 sm:w-11" aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function Badge({ value }) {
  return (
    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-wheat px-1 text-[10px] font-bold text-ink">
      {value}
    </span>
  );
}
