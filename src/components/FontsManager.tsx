import { useEffect } from "react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const withDisplaySwap = (url?: string) => {
  if (!url) return undefined;
  return url.includes("display=") ? url : `${url}${url.includes("?") ? "&" : "?"}display=swap`;
};

const ensureFontLink = (id: string, href?: string) => {
  if (typeof document === "undefined" || !href) return;
  const head = document.head;
  const selector = `link[data-font-slot=\"${id}\"]`;
  const existing = head.querySelector<HTMLLinkElement>(selector);
  if (existing) {
    if (existing.href !== href) {
      existing.href = href;
    }
    return;
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.setAttribute("data-font-slot", id);
  link.crossOrigin = "anonymous";
  head.appendChild(link);
};

const FontsManager = () => {
  const site = useSiteConfig();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    root.style.setProperty("--font-primary", site.fonts.primary.stack);
    if (site.fonts.secondary) {
      root.style.setProperty("--font-secondary", site.fonts.secondary.stack);
    }
    root.style.setProperty("--font-base", `${site.fontSizes.basePx}px`);
    root.style.setProperty("--font-heading-scale", site.fontSizes.headingScale.toString());
    root.style.setProperty("--font-body-scale", site.fontSizes.bodyScale.toString());

    if (site.theme.radius) {
      root.style.setProperty("--radius", `${site.theme.radius}rem`);
    }
    Object.entries(site.theme.colors).forEach(([token, value]) => {
      root.style.setProperty(`--${token}`, value);
    });

    ensureFontLink("primary", withDisplaySwap(site.fonts.primary.importUrl));
    ensureFontLink("secondary", withDisplaySwap(site.fonts.secondary?.importUrl));
  }, [site]);

  return null;
};

export default FontsManager;
