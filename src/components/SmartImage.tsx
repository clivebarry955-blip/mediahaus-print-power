import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useMedia } from "@/hooks/useMedia";
import type { MediaKey } from "@/utils/content";

const placeholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='sans-serif' font-size='20'%3EMedia missing%3C/text%3E%3C/svg%3E";

export interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  id: MediaKey | string;
  sizes?: string;
}

const SmartImage = ({
  id,
  className,
  sizes = "100vw",
  loading = "lazy",
  alt,
  ...rest
}: SmartImageProps) => {
  const { getMedia } = useMedia();
  const asset = getMedia(id);

  return (
    <img
      src={asset?.src ?? placeholder}
      alt={alt ?? asset?.altText ?? `Image ${id}`}
      className={cn("object-cover", className)}
      sizes={sizes}
      loading={loading}
      {...rest}
    />
  );
};

export default SmartImage;
