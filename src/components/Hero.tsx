import { Button } from "../components/ui/button";
import Text from "@/components/Text";
import SmartImage from "@/components/SmartImage";
import { useCopy } from "@/hooks/useCopy";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const Hero = () => {
  const { t } = useCopy();
  const site = useSiteConfig();

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-6">
          <Text
            as="h1"
            id="hero.title"
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight text-balance"
          />
          <Text as="p" id="hero.subtitle" className="text-lg md:text-xl text-muted-foreground" />

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button size="lg" asChild className="font-semibold font-primary">
              <a href="#products">{t("hero.primaryCta")}</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="font-semibold font-primary">
              <a href="/contact">{t("hero.secondaryCta")}</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <SmartImage
              id={site.media.hero}
              className="w-full h-auto object-cover"
              alt={t("media.hero.alt", "Production team at work")}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan to-magenta opacity-20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
