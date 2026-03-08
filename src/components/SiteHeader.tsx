import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

const topLinks = [
  { label: "Contact", href: "#contact" },
  { label: "Foire aux questions", href: "#faq" },
  { label: "Qui sommes-nous", href: "#about" },
  { label: "Blog", href: "#blog" },
];

const mainLinks = [
  { label: "Accueil", href: "#" },
  { label: "Nos services", href: "#services" },
  { label: "Comment ça marche", href: "#process" },
  { label: "Documents requis", href: "#documents" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Top utility bar */}
      <div className="hidden lg:block border-b border-border bg-muted/50">
        <div className="section-container flex items-center justify-between py-2">
          <div />
          <div className="flex items-center gap-6">
            {topLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <div className="text-xs">
                <span className="font-medium text-foreground">01 88 61 50 00</span>
                <span className="text-muted-foreground ml-1">(Non surtaxé)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="section-container flex items-center justify-between h-16 lg:h-14">
        <a href="#" className="font-heading text-lg font-semibold text-foreground tracking-tight">
          Demande <span className="text-primary">Raccordement</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              {link.label}
            </a>
          ))}
          <Button variant="cta" size="sm" className="ml-4">
            Commencer ma demande
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="section-container py-4 flex flex-col gap-1">
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-border">
              <Button variant="cta" className="w-full">
                Commencer ma demande
              </Button>
              <div className="flex items-center gap-2 mt-3 px-3">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">01 88 61 50 00 (Non surtaxé)</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
