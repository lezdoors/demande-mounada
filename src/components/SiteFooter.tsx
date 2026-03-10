import { Phone, Mail, Clock } from "lucide-react";

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
  { label: "Politique de confidentialite", href: "/politique-confidentialite" },
  { label: "Conditions generales de vente", href: "/conditions-generales" },
];

const SiteFooter = () => {
  return (
    <footer className="bg-[hsl(228,50%,16%)] text-white/80 pb-16 md:pb-0">
      <div className="section-container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-heading text-xl text-white mb-4">
              Demande <span className="text-blue-300">Raccordement</span>
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
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Demande Raccordement. Tous droits reserves.
          </p>
          <p className="text-xs">
            Ce service n'est pas affilie a Enedis. Enedis est une marque deposee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
