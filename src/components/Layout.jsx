import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import { SearchOverlay } from "./SearchBar";
import { FloatingWhatsApp } from "./WhatsAppButton";
import { useStore } from "../context/StoreContext";

export default function Layout() {
  const { pathname } = useLocation();
  const onProduct = pathname.startsWith("/product");
  const { toasts, dismissToast } = useStore();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="paper flex min-h-screen flex-col">
      <a href="#main" className="absolute -left-[999px] top-4 z-[70] rounded-full bg-wheat px-4 py-2 text-sm font-semibold text-ink focus:left-4">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <FloatingWhatsApp />
      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-forest/15 bg-cream text-forest shadow-md sm:left-6 ${onProduct ? "bottom-28 lg:bottom-5" : "bottom-5"}`}
        >
          <ArrowUp size={18} />
        </button>
      )}
      <div className="pointer-events-none fixed inset-x-0 top-20 z-[60] flex flex-col items-center gap-2 px-4" aria-live="polite">
        {toasts.map((toast) => (
          <button
            key={toast.id}
            type="button"
            onClick={() => dismissToast(toast.id)}
            className={`pointer-events-auto max-w-sm rounded-full px-4 py-2 text-sm shadow-lg ${toast.tone === "error" ? "bg-ink text-cream" : "bg-forest text-cream"}`}
          >
            {toast.message}
          </button>
        ))}
      </div>
    </div>
  );
}
