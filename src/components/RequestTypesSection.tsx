import { Home, HardHat, Map, Zap } from "lucide-react";
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
    icon: Zap,
    title: "Raccordement Enedis",
    description: "Toute demande de raccordement au reseau electrique Enedis.",
    cta: "Faire ma demande",
  },
  {
    icon: Map,
    title: "Viabilisation de terrain",
    description: "Amenagement des reseaux electriques avant construction.",
    cta: "Faire ma demande",
  },
];

const RequestTypesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="services" className="py-16 sm:py-20 bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl text-foreground mb-3">
            Nos services de raccordement
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Quel que soit votre projet, nous preparons votre dossier Enedis de A a Z.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group bg-card border border-border rounded-xl sm:rounded-2xl p-2.5 sm:p-5 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300"
            >
              <div className="h-10 w-10 sm:h-20 sm:w-20 flex items-center justify-center mb-2 sm:mb-4">
                <service.icon className="h-6 w-6 sm:h-12 sm:w-12 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" strokeWidth={1} />
              </div>
              <h3 className="font-heading text-[10px] sm:text-base text-foreground mb-1 sm:mb-2 leading-tight">
                {service.title}
              </h3>
              <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <Button
                variant="cta"
                size="sm"
                className="w-full rounded-md text-[8px] sm:text-xs uppercase tracking-wider font-semibold whitespace-normal h-auto py-1.5 sm:py-2.5"
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
