import { useState } from "react";
import { Phone, Mail, Clock, X } from "lucide-react";

const serviceParticuliers = [
  "Raccordement definitif",
  "Raccordement provisoire",
  "Viabilisation de terrain",
  "Augmentation de puissance",
];

const serviceProfessionnels = [
  "Raccordement collectif",
  "Raccordement production",
  "Bornes de recharge",
  "Installations photovoltaiques",
];

const legalLinks = [
  { label: "Mentions legales", href: "/mentions-legales" },
  { label: "Confidentialite", href: "/politique-confidentialite" },
  { label: "CGV", href: "/conditions-generales" },
];

const SiteFooter = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <footer className="bg-[hsl(228,50%,16%)] text-white/80 pb-16 md:pb-0">
        <div className="section-container py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo-illu.png" alt="Raccordement Enedis" className="h-9 w-9 brightness-0 invert" />
                <div className="w-px h-7 bg-white/20" />
                <div className="leading-none">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                    Portail en ligne
                  </span>
                  <span className="block text-[15px] font-heading text-white mt-0.5 tracking-tight">
                    Raccordement Enedis
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Service en ligne de preparation de dossier de raccordement electrique.
                Nous simplifions vos demarches aupres d'Enedis.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone className="h-4 w-4 text-blue-300 flex-shrink-0" />
                  <span>01 88 61 50 00</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Mail className="h-4 w-4 text-blue-300 flex-shrink-0" />
                  <span>contact@demande-raccordement.fr</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Clock className="h-4 w-4 text-blue-300 flex-shrink-0" />
                  <span>Lun-Ven 9h-18h</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Particuliers
              </h3>
              <ul className="space-y-2.5">
                {serviceParticuliers.map((s) => (
                  <li key={s}>
                    <a href="/services" className="text-sm hover:text-white transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Professionnels
              </h3>
              <ul className="space-y-2.5">
                {serviceProfessionnels.map((s) => (
                  <li key={s}>
                    <a href="/services" className="text-sm hover:text-white transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Informations
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a href="/comment-ca-marche" className="text-sm hover:text-white transition-colors">
                    Comment ca marche
                  </a>
                </li>
                <li>
                  <a href="/enedis" className="text-sm hover:text-white transition-colors">
                    A propos d'Enedis
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-sm hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar — legal links */}
        <div className="border-t border-white/10">
          <div className="section-container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-white/40">
              &copy; {new Date().getFullYear()} Demande Raccordement. Tous droits reserves.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => setDrawerOpen(true)}
                className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                Information
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Information drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[80]" onClick={() => setDrawerOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[60vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border/60">
              <h3 className="font-heading text-lg text-foreground font-semibold">Information</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ce site propose un service independant de preparation et de constitution de dossiers
                de raccordement electrique. Nous ne sommes pas Enedis et nous ne sommes pas affilies
                a Enedis.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enedis est le gestionnaire du reseau public de distribution d'electricite en France.
                Notre role est de vous accompagner dans la preparation de votre dossier afin de
                faciliter vos demarches aupres d'Enedis.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enedis est une marque deposee. Toutes les marques citees sur ce site appartiennent
                a leurs proprietaires respectifs.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteFooter;
