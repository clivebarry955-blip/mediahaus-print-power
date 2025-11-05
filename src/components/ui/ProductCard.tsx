import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

const ProductCard = ({ name, description, image, specs }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="md:w-1/2 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <CardDescription className="text-sm text-muted-foreground mb-4">
              {description}
            </CardDescription>

            <div className="space-y-2 mb-6">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-[auto,1fr]"
                >
                  <dt className="font-medium text-muted-foreground">{spec.label}:</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </div>

            <Button asChild className="w-full mt-auto rainbow-glow">
              <a href="/contact">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Request Quote
              </a>
            </Button>
          </CardContent>
        </div>
        <div className="md:w-1/2 bg-muted h-56 md:h-auto md:min-h-[220px] flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
