import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTok";
import XIcon from "@/components/icons/X";
import Text from "@/components/Text";
import { useCopy } from "@/hooks/useCopy";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useCopy();
  const site = useSiteConfig();
  const legal = t("footer.legal", `© ${currentYear} ${site.brand.name}`).replace(
    "{year}",
    currentYear.toString(),
  );

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">MEDIAHAUS</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <Link to="/contact" className="text-sm hover:text-foreground transition-colors">
              Contact
            </Link>
            <span className="hidden md:inline-block opacity-40">•</span>
            <div className="flex items-center gap-4">
              {[
                { id: "facebook", icon: Facebook, href: site.social.facebook, label: "Facebook" },
                { id: "tiktok", icon: TikTokIcon, href: site.social.tiktok, label: "TikTok" },
                { id: "instagram", icon: Instagram, href: site.social.instagram, label: "Instagram" },
                { id: "x", icon: XIcon, href: site.social.x, label: "X" },
              ]
                .filter((item) => item.href)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-foreground transition-colors"
                      aria-label={item.label}
                      title={item.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
            </div>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            <p className="font-primary">{legal}</p>
            <Text as="p" id="footer.tagline" className="mt-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
