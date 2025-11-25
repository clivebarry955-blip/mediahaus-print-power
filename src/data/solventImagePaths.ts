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

export const withBaseUrl = (relativePath: string) => {
  const normalizedRelative = trimLeadingSlash(relativePath);
  const prefix = basePath === "" ? "/" : `${basePath}/`;
  return `${prefix}${normalizedRelative}`.replace(/\/{2,}/g, "/");
};

const solventMediaBasePath = withBaseUrl(
  "02 Solvent-UV-Latex Media-20251113T113043Z-1-001/02 Solvent-UV-Latex Media"
);
const reflectiveVinylBasePath = withBaseUrl(
  "09 Reflective Vinyl-20251113T135627Z-1-001/09 Reflective Vinyl"
);
const averyWallVinylBasePath = withBaseUrl(
  "Avery wall vinyl-20251113T135700Z-1-001 (3)/Avery wall vinyl"
);
const picassoCanvasBasePath = withBaseUrl(
  "03 Picasso Canvas-20251119T195126Z-1-001/03 Picasso Canvas"
);

export const solventImagePaths = {
  bondPaper: `${solventMediaBasePath}/01 Paper/01 Bond Paper/Bond paper 1.jpg`,
  trisolvePosterPaper: `${solventMediaBasePath}/01 Paper/02 Trisolve Poster Paper/gis.jpg`,
  tearResistantSyntheticPaper: `${solventMediaBasePath}/01 Paper/03 Tear-Resistant Synthetic Paper/03 Tear-Resistant Synthetic Paper USE.png`,
  photoPaper: `${solventMediaBasePath}/01 Paper/04 Photo Paper/01 Photo Paper.jpg`,
  magneticPaper: `${solventMediaBasePath}/01 Paper/05 Magnetic Paper/Magnetic-Sheet_lg.jpg`,
  hausMonomericVinyl1Year: `${solventMediaBasePath}/02 Vinyls/01 Haus Monomeric Vinyl/01 Mono 1Y Gloss White Vinyl.jpg`,
  hausMonomericVinyl3Year: `${solventMediaBasePath}/02 Vinyls/01 Haus Monomeric Vinyl/01 Mono 3Y Matt White Vinyl.jpg`,
  oraJet3164: `${solventMediaBasePath}/02 Vinyls/02 Orajet Vinyl/aUCYh87euMfwNCqLRH3vOBCD8YFOvkbg45ER1RUpW1jLdIWyHQuN8RHHzqcyRGf1__59156.jpg`,
  hausHighTackVinyl: `${solventMediaBasePath}/02 Vinyls/03 Haus High-Tack Vinyl/Custom-Stickers-High-Tack-A-Gallery-@x2.jpg`,
  hausPerforatedVinyl: `${solventMediaBasePath}/02 Vinyls/04 Haus Perforated Vinyl/BPW7054-4.jpg`,
  hausFrostedVinyl: `${solventMediaBasePath}/02 Vinyls/05 Haus Frosted Vinyl/01 Frosted Vinyl Sample USE.jpg`,
  hausEezidotVinyl: `${solventMediaBasePath}/02 Vinyls/06 Haus Eezidot Vinyl/01 Easydot4 USE.jpg`,
  hausReflectiveVinyl: `${reflectiveVinylBasePath}/Haus Reflective/01 Haus Reflective White Printable.jpg`,
  averyReflectiveVinyl: `${reflectiveVinylBasePath}/Avery Reflective/retro-vinyl-printing.jpg`,
  haus5YearPolymericVinyl: `${solventMediaBasePath}/02 Vinyls/07 Polymeric Vinyl/Haus Polymeric/Haus Polymeric.jpg`,
  oraJetPolymericVinyl: `${solventMediaBasePath}/02 Vinyls/07 Polymeric Vinyl/Orajet Polymeric/OraJet_3740_PVC_Free_35b6107c-42a7-447d-a1ea-1940d2ba6c92_grande.webp`,
  averyWallVinylMp2611: `${averyWallVinylBasePath}/1502908461973.jpg`,
  averyMPI1105: `${solventMediaBasePath}/02 Vinyls/08 CAST Vinyl/Avery/MPI-1105-Speedmaster-Key-Visual-5-515Wx515H.jpg`,
  mactacCastVinylJT10700: `${solventMediaBasePath}/02 Vinyls/08 CAST Vinyl/Mactac/cq5dam.web.1280.1280.jpeg`,
  blockoutPVC: `${solventMediaBasePath}/03 PVC/01 Block-out PVC Gloss & Matt/blockout-pvc.jpg`,
  rollUpPVC: `${solventMediaBasePath}/03 PVC/02 Roll-Up PVC/Rollup PVC 510g.jpg`,
  backlitPVC: `${solventMediaBasePath}/03 PVC/03 Backlit PVC/Backlit PVC.webp`,
  meshWithLiner: `${solventMediaBasePath}/03 PVC/04 Mesh with Liner/Mesh with liner 1.jpg`,
  tShirtTransferVinyl: `${solventMediaBasePath}/05 Other/01 PU Print T-Shirt Transfer Vinyl/LightTransfer_1748x.webp`,
  backlitFilm: withBaseUrl("Backlit Film.jpg"),
  hausPolyesterCanvas: `${solventMediaBasePath}/04 Canvas & Wall/01 Polyester Canvas Lite/01 Polyester Canvas 260gsm.jpg`,
  hausCottonCanvas: `${solventMediaBasePath}/04 Canvas & Wall/02 Cotton Canvas/01 Cotton Canvas 350gsm.jpg`,
  picassoCanvas: `${picassoCanvasBasePath}/01 Picasso Canvas 370gsm.jpg`,
  muramourSableWallpaper: `${solventMediaBasePath}/04 Canvas & Wall/03 Wallpaper Muramour/01 Muramour SABLE.jpg`,
  muraspecGraphiteWallpaper: `${solventMediaBasePath}/04 Canvas & Wall/04 Wallpaper Muraspec Graphite/01 Digiwall Sandstone.jpg`,
  texSelfAdhesiveWallpaper: `${solventMediaBasePath}/04 Canvas & Wall/05 Wallpaper GVTEX Self-adhesive/00 GVTex Self-Adhesive.jpg`,
} as const;
