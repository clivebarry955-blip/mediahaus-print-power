#!/usr/bin/env node
import { readFile } from "fs/promises";
import { resolve } from "path";
import { z } from "zod";

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
    basePx: z.number(),
    headingScale: z.number(),
    bodyScale: z.number(),
  }),
  theme: z.object({
    radius: z.number().optional(),
    colors: z.record(z.string()),
  }),
  media: z.record(z.string()),
  navigation: z.object({
    primary: z.array(navigationItemSchema),
    cta: z.object({ href: z.string(), labelKey: z.string() }),
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

const readJson = async (file) => {
  const path = resolve(process.cwd(), file);
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw);
};

try {
  const [site, copy, media] = await Promise.all([
    readJson("content/site.json"),
    readJson("content/copy.json"),
    readJson("content/media.json"),
  ]);

  const siteResult = siteSchema.safeParse(site);
  const copyResult = copySchema.safeParse(copy);
  const mediaResult = mediaSchema.safeParse(media);

  const failures = [
    { label: "site.json", result: siteResult },
    { label: "copy.json", result: copyResult },
    { label: "media.json", result: mediaResult },
  ].filter((check) => !check.result.success);

  if (failures.length) {
    failures.forEach((failure) => {
      console.error(`\n❌ ${failure.label} failed validation:`);
      console.error(failure.result.error?.format?.() ?? failure.result.error);
    });
    process.exit(1);
  }

  console.log(`✅ content ok (site:${Object.keys(site).length} fields, copy:${Object.keys(copy).length} keys, media:${Object.keys(media).length} assets)`);
} catch (error) {
  console.error("❌ content:check failed", error);
  process.exit(1);
}
