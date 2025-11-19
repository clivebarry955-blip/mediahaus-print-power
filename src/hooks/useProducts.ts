import { useContentSelector, type ProductsContent } from "@/utils/content";

export const useProducts = (): ProductsContent => {
  return useContentSelector((state) => state.products);
};
