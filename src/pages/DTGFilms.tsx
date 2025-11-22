import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dtfFilm from "@/assets/dtf-film.jpg";
import dtfPowder from "@/assets/dtf-powder.jpg";
import ProductCard from "@/components/ui/ProductCard";

const DTGFilms = () => {
  const products = [
    {
      name: "DTF Film",
      description: "Direct-to-Film transfer film for garment printing. No weeding required.",
      image: dtfFilm,
      specs: [
        { label: "Thickness", value: "75 Microns" },
        { label: "Finish", value: "Single matt, double matt" },
        { label: "Sizes", value: "300mm, 600mm" },
        { label: "Length", value: "100m" },
        { label: "Application", value: "All  fabric types." },
      ],
    },
    {
      name: "DTF Powder",
      description: "Hot-melt adhesive powder for DTF transfers. Creates durable bond with fabrics.",
      image: dtfPowder,
      specs: [
        { label: "Particle Size", value: "80-120 mesh" },
        { label: "Melting Point", value: "110-120°C" },
        { label: "Package Size", value: "1kg, 2kg, 5kg" },
        { label: "Application", value: "All fabric types" },
      ],
    },
  ];

  return (
    <div>
      <Header />
      <main>
        <section className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">DTF Media</h1>
              <p className="text-lg text-muted-foreground">
                Direct-to-garment transfer films (no weeding).
              </p>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 gap-8 xl:gap-10 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                name={product.name}
                description={product.description}
                image={product.image}
                specs={product.specs}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DTGFilms;
