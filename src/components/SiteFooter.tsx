const footerLinks = [
  { label: "Accueil", href: "#" },
  { label: "Nos services", href: "#services" },
  { label: "Comment ça marche", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "#" },
  { label: "Politique de confidentialité", href: "#" },
  { label: "Conditions générales", href: "#" },
];

const SiteFooter = () => {
  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="section-container py-16">
        <div className="grid sm:grid-cols-3 gap-12">
          <div>
            <div className="font-heading text-lg font-semibold text-foreground mb-4">
              Demande <span className="text-primary">Raccordement</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Service en ligne de préparation de demande de raccordement électrique.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              Informations légales
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Demande Raccordement. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
