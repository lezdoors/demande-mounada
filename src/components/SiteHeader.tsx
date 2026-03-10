import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Search, HelpCircle, ChevronRight } from "lucide-react";

const audienceLinks = [
  { label: "Particulier", href: "/form" },
  { label: "Professionnel ou entreprise", href: "/form" },
  { label: "Collectivité locale", href: "/form" },
];

const secondaryLinks = [
  { label: "Fournisseur d'électricité", href: "/enedis" },
  { label: "Acteur du système électrique", href: "/enedis" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — audience segments (Enedis-style, desktop only) */}
      <div className="hidden lg:block bg-white border-b border-border/50">
        <div className="section-container flex items-center justify-between h-9">
          <div className="flex items-center">
            <a
              href="/"
              className="p-1 mr-5 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Accueil"
            >
              <Home className="h-3.5 w-3.5" />
            </a>
            <nav className="flex items-center gap-7">
              {audienceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <nav className="flex items-center gap-7">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="section-container flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/logo-illu.png"
              alt="Demande Raccordement"
              className="h-8 w-8 opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="w-px h-7 bg-border" />
            <div className="leading-none">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                Portail en ligne
              </span>
              <span className="block text-[15px] font-heading text-foreground mt-0.5 tracking-tight">
                Raccordement Enedis
              </span>
            </div>
          </a>

          {/* Center — pill buttons (Enedis-style capsules) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/services"
              className="flex items-center gap-2.5 px-5 py-2 border border-border rounded-full text-sm text-foreground hover:border-primary/30 hover:text-primary transition-all"
            >
              <Menu className="h-4 w-4" />
              Nos services
            </a>
            <a
              href="/comment-ca-marche"
              className="flex items-center gap-2.5 px-5 py-2 border border-border rounded-full text-sm text-foreground hover:border-primary/30 hover:text-primary transition-all"
            >
              <HelpCircle className="h-4 w-4" />
              Comment ça marche
            </a>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/faq"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Besoin d'aide ?
            </a>
            <Button
              variant="cta"
              size="sm"
              className="rounded-full px-6 shadow-cta"
              onClick={() => navigate("/form")}
            >
              Commencer
            </Button>
            <button
              className="p-2 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="Rechercher"
              onClick={() => navigate("/faq")}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-white">
          <nav className="section-container py-4 flex flex-col gap-0.5">
            {/* Audience segments */}
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50 px-3 pt-1 pb-2">
              Vous êtes
            </div>
            {audienceLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between px-3 py-2.5 text-sm text-foreground rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
              </a>
            ))}

            <div className="h-px bg-border my-2" />

            {/* Navigation links */}
            <a href="/services" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
              Nos services
            </a>
            <a href="/comment-ca-marche" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
              Comment ça marche
            </a>
            <a href="/enedis" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
              À propos d'Enedis
            </a>
            <a href="/faq" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
              FAQ
            </a>
            <a href="/contact" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors" onClick={() => setMobileOpen(false)}>
              Contact
            </a>

            <div className="pt-3 mt-2 border-t border-border">
              <Button
                variant="cta"
                className="w-full rounded-full shadow-cta"
                onClick={() => { setMobileOpen(false); navigate("/form"); }}
              >
                Commencer ma demande
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
