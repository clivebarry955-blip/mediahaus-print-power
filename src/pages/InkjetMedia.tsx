import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { inkjetImagePaths } from "@/data/inkjetImagePaths";
// Using shared ProductCard for consistent layout and full images


const InkjetMedia = () => {
  const products = [
    {
      name: "Bond Paper",
      description:
        "A standard uncoated 80gsm paper used to print cad drawings, landscaping plans, blueprints and templates. Bond paper is acid-free and won’t yellow over time. Fits most large-format printers and engineering copiers.",
      image: inkjetImagePaths.bondPaper,
      specs: [
        { label: "Thickness", value: "80gsm" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "294mm, 420mm, 594mm, 610mm, 841mm, 914mm, 1118mm, 1270mm, 1370mm, 1524mm" },
        { label: "Length", value: "50m, 100m, 150m" },
        { label: "Printer Compatibility", value: "Inkjet, Eco-solvent, Latex and UV" },
      ],
    },
    {
      name: "Coated Paper",
      description:
        "A matt white coated paper which has a special inkjet coating to allow the ink not to bleed in order to produce very sharp images. For indoor poster use.",
      image: inkjetImagePaths.coatedPaper,
      specs: [
        { label: "Thickness", value: "90gsm, 125gsm, 180gsm" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "610mm, 914mm, 1118mm" },
        { label: "Length", value: "30m, 45m" },
        { label: "Printer Compatibility", value: "Inkjet, Latex and UV" },
      ],
    },
    {
      name: "Enhanced Coated Paper",
      description:
        "Premium coated paper optimized for higher color gamut, sharper detail and faster drying. Ideal for premium indoor posters and proofing.",
      image: inkjetImagePaths.enhancedCoated,
      specs: [
        { label: "Thickness", value: "200gsm" },
        { label: "Finish", value: "Satin / Matt" },
        { label: "Available Sizes", value: "610mm, 914mm, 1118mm" },
        { label: "Length", value: "30m" },
        { label: "Printer Compatibility", value: "Inkjet, Latex and UV" },
      ],
    },
    {
      name: "Photo Paper",
      description:
        "A very high quality resin coated paper used for photographic reproduction. Excellent colour gamut, vivid images.",
      image: inkjetImagePaths.photoPaper,
      specs: [
        { label: "Thickness", value: "190gsm, 260gsm" },
        { label: "Finish", value: "Matt, satin, lustre, gloss" },
        { label: "Available Sizes", value: "610mm, 914mm, 1118mm" },
        { label: "Length", value: "30m" },
        { label: "Printer Compatibility", value: "Inkjet, Latex and UV" },
      ],
    },
    {
      name: "Polyester Canvas (Canvas Light)",
      description:
        "A good quality polyester/cotton blended canvas with an inkjet coating. Used to print photographic and art reproductions. Can be stretched over a frame without the edges cracking.",
      image: inkjetImagePaths.canvasLight,
      specs: [
        { label: "Thickness", value: "260gsm" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "432mm, 610mm, 914mm, 1118mm, 1524mm" },
        { label: "Length", value: "18m" },
        { label: "Printer Compatibility", value: "Inkjet, Latex and UV" },
      ],
    },
    {
      name: "Cotton Canvas (Classic Canvas)",
      description:
        "An exceptional quality pure cotton canvas with an inkjet coating. Used to print photographic and art reproductions. Can be stretched over a frame without the edges cracking.",
      image: inkjetImagePaths.canvasClassic,
      specs: [
        { label: "Thickness", value: "350gsm" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "432mm, 610mm, 914mm, 1118mm, 1524mm" },
        { label: "Length", value: "18m" },
        { label: "Printer Compatibility", value: "Inkjet, Latex and UV" },
      ],
    },
    {
      name: "Self-Adhesive Vinyl (Inkjet)",
      description:
        "Multipurpose self-adhesive vinyl for indoor graphics and short-term signage. Optimized for inkjet with clean, vivid print quality.",
      image: inkjetImagePaths.vinyl,
      specs: [
        { label: "Thickness", value: "100–150 Microns" },
        { label: "Finish", value: "Matt / Gloss" },
        { label: "Available Sizes", value: "610mm, 914mm, 1370mm, 1520mm" },
        { label: "Length", value: "50m" },
        { label: "Printer Compatibility", value: "Inkjet, Latex and UV" },
      ],
    },
    // Canvas entries retained below
  ];

  return (
    <div>
      <Header />
      <main>
        <section className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Inkjet Media</h1>
              <p className="text-lg text-muted-foreground">
                Premium indoor media for professional prints.
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

export { InkjetMedia };
