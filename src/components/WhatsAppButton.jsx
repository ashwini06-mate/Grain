import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { waLink } from "../utils/whatsapp";

export default function WhatsAppButton({ message = "Hello DHANYA, I would like to know more about your grains.", className = "" }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#1f7a43] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#186437] ${className}`}
    >
      <MessageCircle size={18} />
      WhatsApp
    </a>
  );
}

export function FloatingWhatsApp() {
  const { pathname } = useLocation();
  const raised = pathname.startsWith("/product");
  return (
    <a
      href={waLink("Hello DHANYA, I have a question about rice or wheat.")}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp the DHANYA demo desk"
      className={`fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a43] text-white shadow-lg transition hover:scale-105 sm:right-6 ${raised ? "bottom-24 lg:bottom-5" : "bottom-5"}`}
    >
      <MessageCircle />
    </a>
  );
}
