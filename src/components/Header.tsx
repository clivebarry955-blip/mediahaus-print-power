import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram, ChevronDown } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTok";
import XIcon from "@/components/icons/X";
import { Button } from "../components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useCopy } from "@/hooks/useCopy";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import SmartImage from "@/components/SmartImage";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const DROPDOWN_CLOSE_DELAY = 500; // ms hold before closing

  const openDropdown = (key: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDesktopDropdown(key);
  };

  const scheduleClose = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpenDesktopDropdown((cur) => (cur === key ? null : cur));
      closeTimer.current = null;
    }, DROPDOWN_CLOSE_DELAY);
  };
  const location = useLocation();
  const site = useSiteConfig();
  const { t } = useCopy();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20 md:h-20">
          <Link to="/" className="flex items-center gap-3" aria-label="Mediahaus home">
            <SmartImage
              id={site.media.logoLight}
              className="h-8 md:h-10 w-auto object-contain block dark:hidden"
            />
            <SmartImage
              id={site.media.logoDark}
              className="h-8 md:h-10 w-auto object-contain hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {site.navigation.primary.map((link) => {
              const isActive = link.children
                ? location.pathname.startsWith(link.href)
                : location.pathname === link.href;
              const label = t(link.labelKey, link.labelKey);

              // Dropdown for items with children (desktop)
              if (link.children && link.children.length > 0) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => openDropdown(link.href)}
                    onMouseLeave={() => scheduleClose(link.href)}
                  >
                    <Link
                      to={link.href}
                      className={`px-4 py-2 text-sm font-medium transition-colors inline-flex items-center ${isActive ? 'text-accent' : 'text-foreground hover:text-accent'}`}
                    >
                      {label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                    <div
                      className={`absolute left-0 top-full w-56 bg-popover border border-border rounded-md shadow-md py-2 transition-opacity ${
                        openDesktopDropdown === link.href ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
                      }`}
                      onMouseEnter={() => openDropdown(link.href)}
                      onMouseLeave={() => scheduleClose(link.href)}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
                        >
                          {t(child.labelKey, child.labelKey)}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              // Regular link (desktop)
              return link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-accent' : 'text-foreground hover:text-accent'}`}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-accent' : 'text-foreground hover:text-accent'}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 pr-2 mr-2 border-r border-border">
              {[
                { id: "facebook", icon: Facebook, href: site.social.facebook, label: "Facebook" },
                { id: "instagram", icon: Instagram, href: site.social.instagram, label: "Instagram (coming soon)" },
                { id: "x", icon: XIcon, href: site.social.x, label: "X" },
                { id: "tiktok", icon: TikTokIcon, href: site.social.tiktok, label: "TikTok" },
              ]
                .filter((item) => item.href)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.label}
                      className="text-muted-foreground hover:text-accent transition-colors"
                      title={item.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
            </div>
            <ThemeToggle />
            <Button asChild>
              <a href={site.navigation.cta.href}>{t(site.navigation.cta.labelKey, "Request Quote")}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            {site.navigation.primary.map((link) => {
              const isActive = location.pathname === link.href;
              const label = t(link.labelKey, link.labelKey);

              // Dropdown (mobile)
              if (link.children && link.children.length > 0) {
                const isOpen = openMobileDropdown === link.href;
                return (
                  <div key={link.href} className="">
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium ${isActive ? 'bg-secondary text-accent' : 'text-foreground hover:bg-secondary'}`}
                      onClick={() => setOpenMobileDropdown(isOpen ? null : link.href)}
                    >
                      <span>{label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="pl-4">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setOpenMobileDropdown(null);
                            }}
                          >
                            {t(child.labelKey, child.labelKey)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // Regular link (mobile)
              return link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-secondary text-accent' : 'text-foreground hover:bg-secondary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-secondary text-accent' : 'text-foreground hover:bg-secondary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              );
            })}
            <div className="flex items-center gap-4 px-4 py-3">
              {[
                { id: "facebook", icon: Facebook, href: site.social.facebook, label: "Facebook" },
                { id: "instagram", icon: Instagram, href: site.social.instagram, label: "Instagram" },
                { id: "x", icon: XIcon, href: site.social.x, label: "X" },
                { id: "tiktok", icon: TikTokIcon, href: site.social.tiktok, label: "TikTok" },
              ]
                .filter((item) => item.href)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.label}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              <ThemeToggle />
            </div>
            <div className="px-4 pt-2">
              <Button asChild className="w-full">
                <a href={site.navigation.cta.href}>{t(site.navigation.cta.labelKey, "Request Quote")}</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
