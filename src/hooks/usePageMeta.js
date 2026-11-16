import { useEffect } from "react";

export function usePageMeta(title, description) {
  useEffect(() => {
    const full = title ? `${title} · DHANYA` : "DHANYA · Pure Grains, Better Living";
    document.title = full;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", full);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute("content", description);
  }, [title, description]);
}
