const trimTrailingSlash = (path: string) =>
  path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
const trimLeadingSlash = (path: string) =>
  path.startsWith("/") ? path.slice(1) : path;

const normalizeBasePath = (path: string) => {
  const trimmed = trimTrailingSlash(path);
  return trimmed === "/" ? "" : trimmed;
};

const resolveBasePath = () => {
  if (typeof document !== "undefined") {
    const absoluteBase = new URL(
      import.meta.env.BASE_URL || "/",
      document.baseURI
    ).pathname;
    return normalizeBasePath(absoluteBase);
  }
  const base = import.meta.env.BASE_URL || "/";
  return base.startsWith("/") ? normalizeBasePath(base) : "";
};

const basePath = resolveBasePath();

const withBaseUrl = (relativePath: string) => {
  const normalizedRelative = trimLeadingSlash(relativePath);
  const prefix = basePath === "" ? "/" : `${basePath}/`;
  return `${prefix}${normalizedRelative}`.replace(/\/{2,}/g, "/");
};

const inkjetMediaBasePath = withBaseUrl(
  "01 Inkjet Media-20251107T134323Z-1-001/01 Inkjet Media"
);

export const inkjetImagePaths = {
  bondPaper: `${inkjetMediaBasePath}/1. Paper/Bond Paper/01 Bond-paper-1.jpg`,
  coatedPaper: `${inkjetMediaBasePath}/1. Paper/Coated Paper/poster-paper-solvent.jpg`,
  enhancedCoated: `${inkjetMediaBasePath}/1. Paper/Enhanced Coated Paper/Enhanced Coated Paper.png`,
  photoPaper: `${inkjetMediaBasePath}/2. Photo Paper/01 Photo Paper Prints.jpg`,
  canvasLight: `${inkjetMediaBasePath}/3. Canvas/CANVAS LIGHT/03 Canvas 8 - Blocked Sample.jpeg`,
  canvasClassic: `${inkjetMediaBasePath}/3. Canvas/CLASSIC CANVAS/02 Canvas 13 - Printed Sample.png`,
  vinyl: `${inkjetMediaBasePath}/4. Inkjet Vinyl Matt/ChatGPT Image Oct 16, 2025, 11_00_23 AM.png`,
} as const;
