import { ShoppingCart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bondPaper from "@/assets/bond-paper-new.jpg";
import coatedPaper from "@/assets/coated-paper.jpg";
import enhancedCoated from "@/assets/coated-paper-new.jpg";
import photoPaper from "@/assets/photo-paper-new.jpg";
import canvas from "@/assets/carwrap.jpg";
import vinylImage from "@/assets/vinyl-new.jpg";
import glossVinyl from "@/assets/gloss-vinyl.jpg";
import castVinyl from "@/assets/cast-vinyl.jpg";
import blockoutBanner from "@/assets/blockout-banner.jpg";
import dtfFilm from "@/assets/dtf-film.jpg";
import dtfPowder from "@/assets/dtf-powder.jpg";
import glossLaminate from "@/assets/gloss-laminate.jpg";
import mattLaminate from "@/assets/matt-laminate.jpg";
import mountingAdhesive from "@/assets/mounting-adhesive.jpg";

const Products = () => {
  const products = [
    {
      name: "Bond Paper",
      category: "Inkjet Media",
      description:
        "A standard uncoated 80gsm paper used to print CAD drawings, landscaping plans, blueprints and templates. Bond paper is acid-free and won't yellow over time. Fits most large-format printers and engineering copiers.",
      image: bondPaper,
      specs: [
        { label: "Thickness", value: "80gsm" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "294mm, 420mm, 594mm, 610mm, 841mm, 914mm, 1118mm, 1270mm, 1370mm, 1524mm" },
        { label: "Length", value: "50m, 100m, 150m" },
        { label: "Printer Compatibility", value: "Inkjet, Solvent, Eco-solvent, Latex and UV" },
      ],
    },
    {
      name: "Coated Paper",
      category: "Inkjet Media",
      description:
        "A matt white coated paper which has a special inkjet coating to allow the ink not to bleed in order to produce very sharp images. For indoor poster use.",
      image: coatedPaper,
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
      category: "Inkjet Media",
      description:
        "Premium coated paper optimized for higher color gamut, sharper detail and faster drying. Ideal for premium indoor posters and proofing.",
      image: enhancedCoated,
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
      category: "Inkjet Media",
      description:
        "A very high quality resin coated paper used for photographic reproduction. Excellent colour gamut, vivid images.",
      image: photoPaper,
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
      category: "Inkjet Media",
      description:
        "A good quality polyester/cotton blended canvas with an inkjet coating. Used to print photographic and art reproductions. Can be stretched over a frame without the edges cracking.",
      image: canvas,
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
      category: "Inkjet Media",
      description:
        "An exceptional quality pure cotton canvas with an inkjet coating. Used to print photographic and art reproductions. Can be stretched over a frame without the edges cracking.",
      image: canvas,
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
      category: "Inkjet Media",
      description:
        "Multipurpose self-adhesive vinyl for indoor graphics and short-term signage. Optimized for inkjet with clean, vivid print quality.",
      image: vinylImage,
      specs: [
        { label: "Thickness", value: "100-150 Microns" },
        { label: "Finish", value: "Matt / Gloss" },
        { label: "Available Sizes", value: "610mm, 914mm, 1370mm, 1520mm" },
        { label: "Length", value: "50m" },
        { label: "Printer Compatibility", value: "Inkjet, Latex and UV" },
      ],
    },
    {
      name: "Matt Vinyl",
      category: "Solvent Media",
      description: "Durable outdoor vinyl with a matt finish. Perfect for signage and wraps.",
      image: vinylImage,
      specs: [
        { label: "Thickness", value: "150 Microns" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "610mm, 914mm, 1370mm, 1520mm" },
        { label: "Length", value: "50m" },
        { label: "Printer Compatibility", value: "Solvent, Eco-solvent, Latex, UV" },
      ],
    },
    {
      name: "Gloss Vinyl",
      category: "Solvent Media",
      description: "High-gloss outdoor vinyl for vibrant signage and vehicle wraps.",
      image: glossVinyl,
      specs: [
        { label: "Thickness", value: "150 Microns" },
        { label: "Finish", value: "Gloss" },
        { label: "Available Sizes", value: "610mm, 914mm, 1370mm, 1520mm" },
        { label: "Length", value: "50m" },
        { label: "Printer Compatibility", value: "Solvent, Eco-solvent, Latex, UV" },
      ],
    },
    {
      name: "Cast Vinyl",
      category: "Solvent Media",
      description: "Premium cast vinyl for vehicle wraps and complex curved surfaces.",
      image: castVinyl,
      specs: [
        { label: "Thickness", value: "80 Microns" },
        { label: "Finish", value: "Gloss" },
        { label: "Available Sizes", value: "1370mm, 1520mm" },
        { label: "Length", value: "50m" },
        { label: "Printer Compatibility", value: "Solvent, Eco-solvent, Latex, UV" },
      ],
    },
    {
      name: "Blockout PVC",
      category: "Solvent Media",
      description:
        "A high-strength laminated flex (1000 x 1000 DIN) designed for outdoor use for billboards and banners. The black back gives 100% opacity so if the sun shines from behind, it does not interfere with the image printed on it.",
      image: blockoutBanner,
      specs: [
        { label: "Thickness", value: "510 gsm" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "1370mm, 1600mm, 3200mm" },
        { label: "Length", value: "50m" },
        { label: "Printer Compatibility", value: "Solvent, Eco-solvent, Latex, UV" },
      ],
    },
    {
      name: "DTF Film",
      category: "DTF Media",
      description: "Direct-to-Film transfer film for garment printing. No weeding required.",
      image: dtfFilm,
      specs: [
        { label: "Thickness", value: "75 Microns" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "300mm, 400mm, 600mm" },
        { label: "Length", value: "100m" },
        { label: "Printer Compatibility", value: "DTF Printers" },
      ],
    },
    {
      name: "DTF Powder",
      category: "DTF Media",
      description: "Hot-melt adhesive powder for DTF transfers. Creates durable bond with fabrics.",
      image: dtfPowder,
      specs: [
        { label: "Particle Size", value: "80-120 mesh" },
        { label: "Melting Point", value: "110-120°C" },
        { label: "Package Size", value: "1kg, 5kg, 10kg" },
        { label: "Application", value: "All fabric types" },
      ],
    },
    {
      name: "Gloss Lamination",
      category: "Finishing Films",
      description:
        "Crystal clear gloss laminate for print protection and enhancement. UV resistant with excellent clarity.",
      image: glossLaminate,
      specs: [
        { label: "Thickness", value: "75 Microns, 100 Microns" },
        { label: "Finish", value: "Gloss" },
        { label: "Available Sizes", value: "1370mm, 1520mm" },
        { label: "Length", value: "50m, 100m" },
        { label: "Application", value: "Cold lamination" },
      ],
    },
    {
      name: "Matt Lamination",
      category: "Finishing Films",
      description:
        "Anti-glare matt laminate for professional finish without reflections. Perfect for indoor displays and posters.",
      image: mattLaminate,
      specs: [
        { label: "Thickness", value: "75 Microns, 100 Microns" },
        { label: "Finish", value: "Matt" },
        { label: "Available Sizes", value: "1370mm, 1520mm" },
        { label: "Length", value: "50m, 100m" },
        { label: "Application", value: "Cold lamination" },
      ],
    },
    {
      name: "Mounting Adhesive",
      category: "Finishing Films",
      description: "Double-sided adhesive film for mounting prints to rigid substrates.",
      image: mountingAdhesive,
      specs: [
        { label: "Thickness", value: "100 Microns" },
        { label: "Adhesive Type", value: "Permanent" },
        { label: "Available Sizes", value: "1370mm, 1520mm" },
        { label: "Length", value: "50m" },
        { label: "Application", value: "Foamboard, PVC, Aluminium" },
      ],
    },
    {
      name: "Double-sided Mounting Film",
      category: "Finishing Films",
      description:
        "A clear polyester mounting film, coated on both sides with a permanent pressure sensitive acrylic adhesive, one of which is protected by a Kraft siliconized release liner and one side a film release liner. The perfect product for the mounting of graphics onto various substrates such as correx etc.",
      image: mountingAdhesive,
      specs: [
        { label: "Thickness", value: "45 Micron" },
        { label: "Finish", value: "N/A" },
        { label: "Available Sizes", value: "1040mm, 1270mm" },
        { label: "Length", value: "33m" },
      ],
    },
    {
      name: "Optically Clear Double-sided Mounting Film",
      category: "Finishing Films",
      description:
        "A 100% optically transparent polyester film. Both sides of the film have a high-viscosity solvent-acrylic adhesive that are protected by a clear film lining. Used for special applications that require full clarity, such as mounting a print to acrylic or glass.",
      image: mountingAdhesive,
      specs: [
        { label: "Thickness", value: "25 Micron" },
        { label: "Finish", value: "N/A" },
        { label: "Available Sizes", value: "1300mm" },
        { label: "Length", value: "25m, 50m" },
      ],
    },
  ];

  const categories = [
    { id: "inkjet", name: "Inkjet Media", description: "Indoor papers and films for high quality prints" },
    { id: "solvent", name: "Solvent Media", description: "Durable outdoor vinyl for signage and wraps" },
    { id: "dtf", name: "DTF Media", description: "Direct-to-Film transfer products" },
    { id: "finishing", name: "Finishing Films", description: "Lamination and mounting solutions" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/30 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
              <p className="text-lg text-muted-foreground">
                Professional-grade media for every printing application. Browse our comprehensive range 
                of inkjet media, solvent vinyl, DTF products, and finishing films.
              </p>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="border-b bg-card sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto py-4">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-secondary transition-colors"
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products by Category */}
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h2>
                <p className="text-lg text-muted-foreground">{category.description}</p>
              </div>

              <div className="space-y-16">
                {products
                  .filter((product) => product.category === category.name)
                  .map((product, index) => {
                    const imageSection = (
                      <div>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
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
                                  key={spec.label}
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
                      <div key={product.name} className="grid gap-8 items-center md:grid-cols-2">
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
        ))}

        {/* CTA Section */}
        <section className="bg-secondary/30 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-cyan/10 to-magenta/10 border-2">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need help choosing the right product?
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our experts can recommend the perfect media for your specific application and printer.
                </p>
                <Button size="lg" asChild>
                  <a href="/contact">Contact Us Today</a>
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
