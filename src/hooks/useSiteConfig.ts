import { useMemo } from "react";
import { useContentSelector, type SiteConfig } from "@/utils/content";

export const useSiteConfig = (): SiteConfig => {
  return useContentSelector((state) => state.site);
};

export const useNavigation = () => {
  const site = useSiteConfig();
  return useMemo(() => site.navigation, [site]);
};
