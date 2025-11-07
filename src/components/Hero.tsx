import { Button } from "../components/ui/button";
import { CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            More than 25 years of experience in the graphics industry
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Mediahaus has over 25 years of expertise in the graphics industry, providing high-quality printing solutions to meet your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button size="lg" asChild>
              <a href="#products">Explore Our Products</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Request Quote</a>
            </Button>
          </div>

        </div>

        <div className="relative">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="/barry clive.jpg"
              alt="Custom vinyl car wrap showcasing vibrant multicolor design"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan to-magenta opacity-20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
