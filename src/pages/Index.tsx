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
        <ProductCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
