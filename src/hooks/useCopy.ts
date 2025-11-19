import { useCallback, useMemo } from "react";
import { useContentSelector, type CopyDictionary, type CopyKey } from "@/utils/content";

const loggedMissing = new Set<string>();

export interface CopyHelpers {
  t: (key: CopyKey | string, fallback?: string) => string;
  copy: CopyDictionary;
  keys: string[];
}

export const useCopy = (): CopyHelpers => {
  const copy = useContentSelector((state) => state.copy);

  const t = useCallback(
    (key: CopyKey | string, fallback = "") => {
      const value = copy[key as keyof CopyDictionary];
      if (typeof value === "string") {
        return value;
      }
      if (!loggedMissing.has(key)) {
        console.warn(`[content] Missing copy for key "${key}"`);
        loggedMissing.add(key);
      }
      return fallback || `{{${key}}}`;
    },
    [copy],
  );

  const keys = useMemo(() => Object.keys(copy), [copy]);

  return { t, copy, keys };
};
