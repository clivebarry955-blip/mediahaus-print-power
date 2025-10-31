import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram, ChevronDown } from "lucide-react";
import TikTokIcon from "@/components/icons/TikTok";
import XIcon from "@/components/icons/X";
import { Button } from "../components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

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

  const navLinks: Array<
    {
      label: string;
      href: string;
      children?: { label: string; href: string }[];
    }
  > = [
    { label: "Home", href: "/" },
    {
      label: "Inkjet Media",
      href: "/inkjet-media",
    },
    {
      label: "Solvent Media",
      href: "/solvent-media",
      children: [
        { label: "PVC", href: "/solvent-media#pvc" },
        { label: "Paper", href: "/solvent-media#paper" },
        { label: "Vinyl", href: "/solvent-media#vinyl" },
        { label: "Wallpaper", href: "/solvent-media#wallpaper" },
        { label: "Other", href: "/solvent-media#other" },
      ],
    },
    { label: "DTF Media", href: "/dtg-films" },
    { label: "Finishing Films", href: "/finishing-films" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20 md:h-20">
          <Link to="/" className="flex items-center gap-3" aria-label="Mediahaus home">
            <img src="/logo.png" alt="Mediahaus logo" className="h-8 md:h-10 w-auto block dark:hidden" />
            <img src="/Mediahaus logo no lens.png" alt="Mediahaus logo" className="h-8 md:h-10 w-auto hidden dark:block" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.children
                ? location.pathname.startsWith(link.href)
                : location.pathname === link.href;

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
                      {link.label}
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
                          {child.label}
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
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-accent' : 'text-foreground hover:text-accent'}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 pr-2 mr-2 border-r border-border">
              <a
                href="https://www.facebook.com/profile.php?id=61563956113914"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram (coming soon)"
                className="text-muted-foreground hover:text-accent transition-colors"
                title="Instagram (coming soon)"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/mediahaus"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="text-muted-foreground hover:text-accent transition-colors"
                title="X"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@mediahausmarketin?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="text-muted-foreground hover:text-accent transition-colors"
                title="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
            <ThemeToggle />
            <Button asChild>
              <a href="/contact">Request Quote</a>
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
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;

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
                      <span>{link.label}</span>
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
                            {child.label}
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
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'bg-secondary text-accent' : 'text-foreground hover:bg-secondary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="flex items-center gap-4 px-4 py-3">
              <a
                href="https://www.facebook.com/profile.php?id=61563956113914"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram (coming soon)" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://x.com/mediahaus" target="_blank" rel="noreferrer" aria-label="X" className="text-muted-foreground hover:text-accent transition-colors">
                <XIcon className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@mediahausmarketin?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-accent transition-colors">
                <TikTokIcon className="h-5 w-5" />
              </a>
              <ThemeToggle />
            </div>
            <div className="px-4 pt-2">
              <Button asChild className="w-full">
                <a href="/contact">Request Quote</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
