import { withBaseUrl } from "./solventImagePaths";

const finishingFilmsBasePath = withBaseUrl(
  "05 Finishing Films-20251119T195126Z-1-001/05 Finishing Films"
);

export const finishingImagePaths = {
  lamination: `${finishingFilmsBasePath}/Lamination.jpg`,
  mountingAdhesive: `${finishingFilmsBasePath}/Mounting Film Clear Adhesive Double release-liner.jpg`,
  mountingAdhesiveOpticallyClear: `${finishingFilmsBasePath}/Mounting Film Optically Clear Adhesive Double release-liner.jpg`,
} as const;
