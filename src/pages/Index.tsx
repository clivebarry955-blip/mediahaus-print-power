import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProductCategories from "@/components/ProductCategories";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        {/* Company Introduction */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Professional Printing Solutions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mediahaus has over 25 years of expertise in the graphics industry, providing high-quality 
              printing solutions to meet your needs. From indoor inkjet to outdoor solvent vinyl, we supply 
              trusted materials, expert advice and fast turnaround to the graphics trade across South Africa.
            </p>
          </div>
        </section>

        <ProductCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
