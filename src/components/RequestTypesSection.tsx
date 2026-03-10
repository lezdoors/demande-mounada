import { HousePlug, Construction, Zap, Shovel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const services = [
  {
    icon: HousePlug,
    title: "Raccordement definitif",
    description: "Raccordement permanent pour votre maison neuve ou batiment.",
    cta: "Faire ma demande",
  },
  {
    icon: Construction,
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
    icon: Shovel,
    title: "Viabilisation de terrain",
    description: "Amenagement des reseaux electriques avant construction.",
    cta: "Faire ma demande",
  },
];

const RequestTypesSection = () => {
  const ref = useScrollFadeIn();
  const navigate = useNavigate();

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
              <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-2 sm:mb-4 group-hover:bg-primary/15 transition-colors">
                <service.icon className="h-5 w-5 sm:h-8 sm:w-8 text-primary" strokeWidth={1.5} fill="currentColor" fillOpacity={0.15} />
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
                onClick={() => navigate("/form")}
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
