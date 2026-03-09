import { Home, HardHat, Map, Zap, Building2, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const services = [
  {
    icon: Home,
    title: "Raccordement definitif",
    description:
      "Raccordement electrique permanent pour votre maison neuve ou votre batiment. Nous preparons l'ensemble du dossier Enedis.",
    cta: "Faire ma demande",
  },
  {
    icon: HardHat,
    title: "Raccordement provisoire",
    description:
      "Alimentation electrique temporaire pour votre chantier de construction. Compteur de chantier installe sous 10 jours.",
    cta: "Faire ma demande",
  },
  {
    icon: Map,
    title: "Viabilisation de terrain",
    description:
      "Amenagement des reseaux electriques sur votre terrain avant construction. Etape indispensable pour tout projet neuf.",
    cta: "Faire ma demande",
  },
  {
    icon: Zap,
    title: "Augmentation de puissance",
    description:
      "Modification de votre branchement pour repondre a de nouveaux besoins energetiques : pompe a chaleur, borne de recharge.",
    cta: "Faire ma demande",
  },
  {
    icon: Building2,
    title: "Raccordement collectif",
    description:
      "Raccordement pour immeubles, lotissements ou coproprietes. Gestion multi-logements avec un dossier centralise.",
    cta: "Faire ma demande",
  },
  {
    icon: Sun,
    title: "Raccordement production",
    description:
      "Raccordement pour installations photovoltaiques et production d'electricite. Injection reseau et autoconsommation.",
    cta: "Faire ma demande",
  },
];

const RequestTypesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="services" className="section-padding bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Nos services de raccordement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quel que soit votre projet, nous preparons votre dossier Enedis de A a Z.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary/12 transition-colors">
                <service.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {service.description}
              </p>
              <Button
                variant="cta"
                className="w-full rounded-full"
              >
                {service.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RequestTypesSection;
