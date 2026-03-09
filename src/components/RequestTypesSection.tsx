import { Home, HardHat, Map, Zap, Building2, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const services = [
  {
    icon: Home,
    title: "Raccordement definitif",
    description: "Raccordement permanent pour votre maison neuve ou batiment.",
    cta: "Faire ma demande",
  },
  {
    icon: HardHat,
    title: "Raccordement provisoire",
    description: "Alimentation temporaire pour votre chantier de construction.",
    cta: "Faire ma demande",
  },
  {
    icon: Map,
    title: "Viabilisation de terrain",
    description: "Amenagement des reseaux electriques avant construction.",
    cta: "Faire ma demande",
  },
  {
    icon: Zap,
    title: "Augmentation de puissance",
    description: "Modification de branchement pour de nouveaux besoins energetiques.",
    cta: "Faire ma demande",
  },
  {
    icon: Building2,
    title: "Raccordement collectif",
    description: "Raccordement pour immeubles, lotissements ou coproprietes.",
    cta: "Faire ma demande",
  },
  {
    icon: Sun,
    title: "Raccordement production",
    description: "Raccordement pour panneaux solaires et production d'electricite.",
    cta: "Faire ma demande",
  },
];

const RequestTypesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="services" className="py-16 sm:py-20 bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
            Nos services de raccordement
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Quel que soit votre projet, nous preparons votre dossier Enedis de A a Z.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group bg-card border border-border rounded-2xl p-5 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300"
            >
              <div className="h-20 w-20 flex items-center justify-center mb-4">
                <service.icon className="h-12 w-12 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" strokeWidth={1} />
              </div>
              <h3 className="font-heading text-base text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <Button
                variant="cta"
                size="sm"
                className="w-full rounded-md text-xs uppercase tracking-wider font-semibold whitespace-normal h-auto py-2.5"
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
