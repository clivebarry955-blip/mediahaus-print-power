import { useCallback, useMemo } from "react";
import { useContentSelector, type MediaDictionary, type MediaKey } from "@/utils/content";
import { useCopy } from "./useCopy";

export interface ResolvedMedia {
  id: MediaKey | string;
  src: string;
  altKey?: string;
  alt?: string;
  description?: string;
  altText: string;
}

export interface MediaHelpers {
  entries: ResolvedMedia[];
  getMedia: (id: MediaKey | string) => ResolvedMedia | undefined;
  media: MediaDictionary;
}

const fallbackPlaceholder = "https://via.placeholder.com/800x600?text=Media";

export const useMedia = (): MediaHelpers => {
  const media = useContentSelector((state) => state.media);
  const { t } = useCopy();

  const resolve = useCallback(
    (id: MediaKey | string): ResolvedMedia | undefined => {
      const asset = media[id as keyof MediaDictionary];
      if (!asset) {
        return undefined;
      }
      return {
        id,
        ...asset,
        altText: asset.altKey ? t(asset.altKey, asset.alt ?? `Image ${id}`) : asset.alt ?? `Image ${id}`,
      };
    },
    [media, t],
  );

  const entries = useMemo(() => {
    return Object.entries(media).map(([key, value]) => ({
      id: key as MediaKey,
      ...value,
      src: value.src || fallbackPlaceholder,
      altText: value.altKey ? t(value.altKey, value.alt ?? `Image ${key}`) : value.alt ?? `Image ${key}`,
    }));
  }, [media, t]);

  return {
    media,
    entries,
    getMedia: resolve,
  };
};
