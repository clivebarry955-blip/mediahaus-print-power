import { ArrowRight, Printer, Palette, Shield, Shirt } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
const indoorMedia = "/Indoor Media.png";
const outdoorMedia = "/Outdoor Media.png";
const finishingFilms = "/Finishing Films.png";
const dtfMedia = "/DTF Media.png";
import Text from "@/components/Text";
import SmartImage from "@/components/SmartImage";
import { useCopy } from "@/hooks/useCopy";

const ProductCategories = () => {
  const { t } = useCopy();
  const categories = [
    {
      title: t("categories.inkjet.title"),
      description: t("categories.inkjet.description"),
      mediaId: "products.inkjet",
      href: "/inkjet-media",
    },
    {
      title: t("categories.solvent.title"),
      description: t("categories.solvent.description"),
      mediaId: "products.solvent",
      href: "/solvent-media",
    },
    {
      title: t("categories.finishing.title"),
      description: t("categories.finishing.description"),
      mediaId: "products.finishing",
      href: "/finishing-films",
    },
    {
      title: t("categories.dtf.title"),
      description: t("categories.dtf.description"),
      mediaId: "products.dtf",
      href: "/dtg-films",
    },
  ];

  return (
    <section id="products" className="container mx-auto px-4 py-12 md:py-20 bg-secondary/30">
      <div className="text-center mb-12">
        <Text as="h2" id="categories.heading" className="text-3xl md:text-4xl font-heading font-semibold mb-4" />
        <Text as="p" id="categories.subheading" className="text-lg text-muted-foreground max-w-2xl mx-auto" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          return (
            <a key={index} href={category.href} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden rounded-t-lg bg-muted">
                  <SmartImage
                    id={category.mediaId}
                    className="w-full h-full object-contain transition-transform duration-300"
                    sizes="(min-width: 768px) 100vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category.title}
                    <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCategories;
