import { useNavigate } from "react-router-dom";
import {
  Home,
  HardHat,
  Zap,
  Building2,
  Shovel,
  Sun,
  Car,
  Wind,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const mainServices = [
  {
    icon: Home,
    title: "Raccordement definitif",
    subtitle: "Construction neuve",
    description:
      "Raccordement permanent pour construction neuve (maison individuelle, immeuble). Branchement au reseau electrique Enedis avec mise en service du compteur Linky.",
    delay: "2 a 6 mois selon extension reseau",
    features: [
      "Maison individuelle ou immeuble",
      "Branchement definitif au reseau",
      "Mise en service compteur Linky",
      "Dossier complet prepare pour Enedis",
    ],
  },
  {
    icon: HardHat,
    title: "Raccordement provisoire",
    subtitle: "Compteur de chantier",
    description:
      "Alimentation electrique temporaire pour chantier (compteur de chantier). Installation rapide pour alimenter vos travaux de construction.",
    delay: "2 a 4 semaines",
    badge: "Forte demande",
    features: [
      "Alimentation temporaire de chantier",
      "Installation rapide",
      "Transition vers raccordement definitif",
      "Suivi complet du dossier",
    ],
  },
  {
    icon: Zap,
    title: "Augmentation de puissance",
    subtitle: "Modification d'installation",
    description:
      "Changement de puissance de votre installation (passage de monophase a triphase, augmentation des kVA). Pour pompes a chaleur, bornes de recharge, equipements industriels.",
    delay: "2 a 8 semaines",
    features: [
      "Passage monophase a triphase",
      "Augmentation des kVA",
      "Pompes a chaleur et bornes de recharge",
      "Equipements industriels",
    ],
  },
  {
    icon: Building2,
    title: "Raccordement collectif",
    subtitle: "Lotissements et coproprietes",
    description:
      "Raccordement pour lotissements, coproprietes et operations d'amenagement. Coordination avec promoteurs et amenageurs pour les projets multi-lots.",
    delay: "3 a 12 mois",
    features: [
      "Lotissements et coproprietes",
      "Operations d'amenagement",
      "Coordination promoteurs",
      "Projets multi-lots",
    ],
  },
];

const specializedServices = [
  {
    icon: Shovel,
    title: "Viabilisation de terrain",
    description:
      "Preparation et amenagement des reseaux electriques avant construction. Coordination avec les differents concessionnaires de reseaux.",
    features: ["Etude de faisabilite", "Coordination multi-reseaux", "Suivi des travaux"],
  },
  {
    icon: Sun,
    title: "Installations photovoltaiques",
    description:
      "Raccordement de vos panneaux solaires au reseau Enedis. Autoconsommation ou revente totale, nous gerons le dossier complet.",
    features: ["Autoconsommation", "Revente totale", "Contrat d'acces reseau"],
  },
  {
    icon: Car,
    title: "Bornes de recharge vehicules electriques",
    description:
      "Raccordement ou augmentation de puissance pour l'installation de bornes de recharge de vehicules electriques.",
    features: ["Particuliers", "Coproprietes", "Entreprises et flottes"],
  },
  {
    icon: Wind,
    title: "Pompes a chaleur",
    description:
      "Augmentation de puissance necessaire pour l'installation d'une pompe a chaleur. Verification de la capacite de votre branchement existant.",
    features: ["Diagnostic puissance", "Mise a niveau branchement", "Certificats de conformite"],
  },
];

const Services = () => {
  const navigate = useNavigate();
  const heroRef = useScrollFadeIn();
  const mainRef = useScrollFadeIn();
  const specializedRef = useScrollFadeIn();
  const ctaRef = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 bg-muted/40">
          <div className="section-container">
            <div ref={heroRef} className="scroll-fade-in text-center max-w-3xl mx-auto">
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                Nos services
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
                Tous nos services de raccordement electrique
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Quel que soit votre projet, nous preparons votre dossier Enedis de A a Z.
                De la demande initiale a la mise en service, notre equipe vous accompagne a chaque etape.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div ref={mainRef} className="scroll-fade-in text-center mb-14">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
                Services principaux
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Les quatre types de raccordement les plus demandes aupres d'Enedis.
              </p>
            </div>

            <div className="grid gap-6 lg:gap-8">
              {mainServices.map((service, i) => (
                <article
                  key={service.title}
                  className="group bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                    {/* Icon + meta */}
                    <div className="flex-shrink-0">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                        <service.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-heading text-xl sm:text-2xl text-foreground">
                          {service.title}
                        </h3>
                        {service.badge && (
                          <span className="text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-primary mb-3">
                        {service.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="grid sm:grid-cols-2 gap-2.5 mb-5">
                        {service.features.map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                            <span className="text-sm text-muted-foreground">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Delay + CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 flex-shrink-0" strokeWidth={1.5} />
                          <span>Delai indicatif : {service.delay}</span>
                        </div>
                        <Button
                          variant="cta"
                          size="sm"
                          className="rounded-full px-6 sm:ml-auto"
                          onClick={() => navigate("/form")}
                        >
                          Faire ma demande
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="section-padding bg-muted/40">
          <div className="section-container">
            <div ref={specializedRef} className="scroll-fade-in text-center mb-14">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
                Services specialises
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Des solutions adaptees aux projets qui necessitent une expertise technique specifique.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {specializedServices.map((service) => (
                <div
                  key={service.title}
                  className="group bg-card border border-border rounded-2xl p-5 sm:p-7 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg text-foreground mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs font-medium bg-primary/6 text-primary px-3 py-1 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 sm:py-28 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, hsl(210 20% 98%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(210 20% 98%) 0%, transparent 50%)",
              }}
            />
          </div>
          <div className="section-container text-center relative z-10">
            <div ref={ctaRef} className="scroll-fade-in">
              <Star className="h-10 w-10 text-primary-foreground/40 mx-auto mb-6" strokeWidth={1} />
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-5">
                Pret a demarrer votre projet ?
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
                Remplissez notre formulaire en ligne en quelques minutes.
                Notre equipe prend en charge votre dossier sous 48h.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full px-10 font-medium hover:scale-[1.02] transition-all text-base"
                onClick={() => navigate("/form")}
              >
                Commencer ma demande
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Services;
