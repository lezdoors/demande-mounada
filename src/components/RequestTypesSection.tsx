import { HouseSimple, HardHat, GearSix, Buildings } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const services = [
  {
    icon: HouseSimple,
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
    icon: GearSix,
    title: "Modification de branchement",
    description: "Deplacement de compteur, changement de coffret ou modification de l'alimentation.",
    cta: "Faire ma demande",
  },
  {
    icon: Buildings,
    title: "Raccordement collectif",
    description: "Lotissements, coproprietes et operations d'amenagement multi-lots.",
    cta: "Faire ma demande",
  },
];

const RequestTypesSection = () => {
  const ref = useScrollFadeIn();
  const navigate = useNavigate();

  return (
    <section id="services" className="py-24 bg-white">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-12">
          <h2 className="font-heading text-[40px] font-semibold text-foreground mb-6">
            Nos services de raccordement
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Quel que soit votre projet, nous preparons votre dossier Enedis de A a Z.
          </p>
        </div>

        {/* Horizontal swipe on mobile, grid on desktop */}
        <div className="sm:grid sm:grid-cols-4 sm:gap-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {services.map((service) => (
            <article
              key={service.title}
              className="group card-elevated p-6 text-center flex flex-col items-center min-w-[72%] sm:min-w-0 snap-start"
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 icon-hover">
                <service.icon className="h-12 w-12 text-primary" weight="duotone" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-2 leading-tight">
                {service.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <Button
                variant="cta"
                size="sm"
                className="btn-lift w-full rounded-md text-xs uppercase tracking-wider font-semibold whitespace-normal h-auto py-2.5"
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
