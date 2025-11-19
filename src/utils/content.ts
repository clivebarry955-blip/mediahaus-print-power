import { useSyncExternalStore } from "react";
import { z } from "zod";
import rawSiteConfig from "../../content/site.json";
import rawCopy from "../../content/copy.json";
import rawMedia from "../../content/media.json";
import rawProducts from "../../content/products.json";

const fontSchema = z.object({
  name: z.string(),
  stack: z.string(),
  importUrl: z.string().optional(),
});

const navigationItemSchema = z.lazy(() =>
  z.object({
    id: z.string(),
    href: z.string(),
    labelKey: z.string(),
    children: z.array(navigationItemSchema).optional(),
  }),
);

const siteSchema = z.object({
  brand: z.object({
    name: z.string(),
    taglineKey: z.string().optional(),
  }),
  fonts: z.object({
    primary: fontSchema,
    secondary: fontSchema.optional(),
  }),
  fontSizes: z.object({
    basePx: z.number().min(10).max(24).default(16),
    headingScale: z.number().min(1).max(1.5).default(1.2),
    bodyScale: z.number().min(0.5).max(2).default(1),
  }),
  theme: z.object({
    radius: z.number().min(0).max(2).default(0.5).optional(),
    colors: z.record(z.string()),
  }),
  media: z.record(z.string()),
  navigation: z.object({
    primary: z.array(navigationItemSchema),
    cta: z.object({
      href: z.string(),
      labelKey: z.string(),
    }),
  }),
  social: z.record(z.string()),
});

const copySchema = z.record(z.string());

const mediaSchema = z.record(
  z.object({
    src: z.string(),
    altKey: z.string().optional(),
    alt: z.string().optional(),
    description: z.string().optional(),
  }),
);

const productSpecSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const productSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string(),
  imageId: z.string(),
  specs: z.array(productSpecSchema),
});

const productCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const productsSchema = z.object({
  categories: z.array(productCategorySchema),
  products: z.array(productSchema),
});

export type SiteNavigationItem = z.infer<typeof navigationItemSchema>;
export type SiteConfig = z.infer<typeof siteSchema>;
export type CopyDictionary = z.infer<typeof copySchema>;
export type MediaDictionary = z.infer<typeof mediaSchema>;

export type ProductSpec = z.infer<typeof productSpecSchema>;
export type ProductItem = z.infer<typeof productSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type ProductsContent = z.infer<typeof productsSchema>;

export type ContentFile = "site" | "copy" | "media" | "products";

interface ContentSnapshot {
  site: SiteConfig;
  copy: CopyDictionary;
  media: MediaDictionary;
  products: ProductsContent;
}

const parseOrFallback = <T>(
  schema: z.ZodType<T>,
  payload: unknown,
  label: string,
  fallback: T,
): T => {
  const result = schema.safeParse(payload);
  if (!result.success) {
    console.warn(`[content] Failed to parse ${label}`, result.error);
    return fallback;
  }
  return result.data;
};

const initialSite = siteSchema.parse(rawSiteConfig);
const initialCopy = copySchema.parse(rawCopy);
const initialMedia = mediaSchema.parse(rawMedia);
const initialProducts = productsSchema.parse(rawProducts);

let snapshot: ContentSnapshot = {
  site: initialSite,
  copy: initialCopy,
  media: initialMedia,
  products: initialProducts,
};

const listeners = new Set<() => void>();

const notify = () => {
  for (const listener of listeners) listener();
};

const updateSnapshot = (next: Partial<ContentSnapshot>) => {
  snapshot = { ...snapshot, ...next };
  notify();
};

export const useContentSelector = <T,>(selector: (state: ContentSnapshot) => T) =>
  useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => selector(snapshot),
    () => selector(snapshot),
  );

export const getContentSnapshot = () => snapshot;

export type CopyKey = keyof typeof rawCopy;
export type MediaKey = keyof typeof rawMedia;

if (import.meta.hot) {
  import.meta.hot.accept("../../content/site.json", (module) => {
    if (module?.default) {
      updateSnapshot({
        site: parseOrFallback(siteSchema, module.default, "site.json", snapshot.site),
      });
    }
  });
  import.meta.hot.accept("../../content/copy.json", (module) => {
    if (module?.default) {
      updateSnapshot({
        copy: parseOrFallback(copySchema, module.default, "copy.json", snapshot.copy),
      });
    }
  });
  import.meta.hot.accept("../../content/media.json", (module) => {
    if (module?.default) {
      updateSnapshot({
        media: parseOrFallback(mediaSchema, module.default, "media.json", snapshot.media),
      });
    }
  });
  import.meta.hot.accept("../../content/products.json", (module) => {
    if (module?.default) {
      updateSnapshot({
        products: parseOrFallback(productsSchema, module.default, "products.json", snapshot.products),
      });
    }
  });
}
