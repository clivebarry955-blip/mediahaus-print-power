#!/usr/bin/env node
import { readdir, readFile } from "fs/promises";
import { resolve } from "path";

const projectRoot = process.cwd();
const scanRoot = resolve(projectRoot, "src");

const ignoreDirs = new Set(["node_modules", "dist", ".git", "public", "content", "scripts"]);

const shouldParse = (filename) => /\.(t|j)sx?$/.test(filename);

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      files.push(...(await walk(resolve(dir, entry.name))));
    } else if (entry.isFile() && shouldParse(entry.name)) {
      files.push(resolve(dir, entry.name));
    }
  }
  return files;
};

const textIdRegex = /<Text\b[^>]*?id=\s*["'`]([^"'`]+)["'`]/g;
const copyFnRegex = /\bt\(\s*["'`]([^"'`]+)["'`]/g;

try {
  const files = await walk(scanRoot);
  const [copy, site, mediaEntries] = await Promise.all([
    readFile(resolve(projectRoot, "content/copy.json"), "utf8").then((data) => JSON.parse(data)),
    readFile(resolve(projectRoot, "content/site.json"), "utf8").then((data) => JSON.parse(data)),
    readFile(resolve(projectRoot, "content/media.json"), "utf8").then((data) => JSON.parse(data)),
  ]);
  const discovered = new Set();

  for (const file of files) {
    const content = await readFile(file, "utf8");
    let match;
    while ((match = textIdRegex.exec(content)) !== null) {
      discovered.add(match[1]);
    }
    while ((match = copyFnRegex.exec(content)) !== null) {
      discovered.add(match[1]);
    }
  }

  const addNavigationKeys = (items = []) => {
    items.forEach((item) => {
      if (item.labelKey) discovered.add(item.labelKey);
      if (item.children) addNavigationKeys(item.children);
    });
  };

  if (site.brand?.taglineKey) {
    discovered.add(site.brand.taglineKey);
  }
  if (site.navigation) {
    addNavigationKeys(site.navigation.primary);
    if (site.navigation.cta?.labelKey) {
      discovered.add(site.navigation.cta.labelKey);
    }
  }

  Object.values(mediaEntries).forEach((asset) => {
    if (asset.altKey) discovered.add(asset.altKey);
  });

  const missing = [...discovered].filter((key) => !(key in copy));
  const unused = Object.keys(copy).filter((key) => !discovered.has(key));

  console.log(`🔎 scanned ${files.length} files, found ${discovered.size} copy references.`);
  if (missing.length) {
    console.log("\nMissing keys (referenced in code but absent in copy.json):");
    missing.forEach((key) => console.log(` - ${key}`));
  }
  if (unused.length) {
    console.log("\nUnused keys (present in copy.json but not referenced):");
    unused.forEach((key) => console.log(` - ${key}`));
  }

  if (missing.length) {
    process.exit(1);
  }
} catch (error) {
  console.error("❌ content:extract failed", error);
  process.exit(1);
}
