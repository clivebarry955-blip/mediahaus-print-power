import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmartImage from "@/components/SmartImage";
import Text from "@/components/Text";
import { useCopy } from "@/hooks/useCopy";
import { useProducts } from "@/hooks/useProducts";

const Products = () => {
  const { t } = useCopy();
  const { categories, products } = useProducts();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Text as="h1" id="products.hero.title" className="text-4xl md:text-5xl font-heading font-semibold mb-4" />
              <Text as="p" id="products.hero.body" className="text-lg text-muted-foreground" />
            </div>
          </div>
        </section>

        <section className="border-b bg-card sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto py-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-secondary transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {categories.map((category) => {
          const categoryProducts = products.filter((product) => product.categoryId === category.id);
          if (categoryProducts.length === 0) return null;
          return (
            <section key={category.id} id={category.id} className="py-12 md:py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h2>
                  <p className="text-lg text-muted-foreground">{category.description}</p>
                </div>

                <div className="space-y-16">
                  {categoryProducts.map((product, index) => {
                    const imageSection = (
                      <div>
                        <SmartImage
                          id={product.imageId}
                          alt={product.name}
                          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                          sizes="(min-width: 768px) 45vw, 100vw"
                        />
                      </div>
                    );

                    const contentSection = (
                      <div>
                        <h3 className="text-3xl font-bold mb-4">{product.name}</h3>
                        <p className="text-muted-foreground mb-6">{product.description}</p>

                        <Card className="mb-6">
                          <CardHeader>
                            <CardTitle className="text-xl">Specifications</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <dl className="space-y-3">
                              {product.specs.map((spec) => (
                                <div
                                  key={`${product.id}-${spec.label}`}
                                  className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-[auto,1fr]"
                                >
                                  <dt className="font-medium text-muted-foreground">{spec.label}:</dt>
                                  <dd>{spec.value}</dd>
                                </div>
                              ))}
                            </dl>
                          </CardContent>
                        </Card>

                        <div className="flex flex-wrap gap-4">
                          <Button asChild>
                            <a href="/contact">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Request Quote
                            </a>
                          </Button>
                          <Button variant="outline" asChild>
                            <a href="/contact">Learn More</a>
                          </Button>
                        </div>
                      </div>
                    );

                    const isEven = index % 2 === 0;

                    return (
                      <div key={product.id} className="grid gap-8 items-center md:grid-cols-2">
                        {isEven ? (
                          <>
                            {imageSection}
                            {contentSection}
                          </>
                        ) : (
                          <>
                            {contentSection}
                            {imageSection}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        <section className="bg-secondary/30 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-cyan/10 to-magenta/10 border-2">
              <CardContent className="p-8 md:p-12 text-center">
                <Text as="h2" id="products.cta.heading" className="text-2xl md:text-3xl font-bold mb-4" />
                <Text
                  as="p"
                  id="products.cta.body"
                  className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto"
                />
                <Button size="lg" asChild>
                  <a href="/contact">{t("products.cta.cta")}</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
