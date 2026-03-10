import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Nos services", href: "#services" },
  { label: "Comment ca marche", href: "#process" },
  { label: "Enedis", href: "#enedis" },
  { label: "FAQ", href: "#faq" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo: house icon + text */}
        <a href="/" className="flex items-center gap-2.5">
          <img src="/logo-illu.png" alt="" className="h-9 w-9" />
          <div className="leading-tight">
            <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Portail en ligne
            </span>
            <span className="block text-sm font-heading text-foreground">
              Raccordement Enedis
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="cta" size="sm" className="rounded-full px-6" onClick={() => navigate("/form")}>
            Commencer
          </Button>
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="section-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-border">
              <Button variant="cta" className="w-full rounded-full" onClick={() => { setMobileOpen(false); navigate("/form"); }}>
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
