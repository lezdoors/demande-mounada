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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="group card-elevated p-3 sm:p-6 text-center flex flex-col items-center"
            >
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2 sm:mb-4 icon-hover">
                <service.icon className="h-6 w-6 sm:h-12 sm:w-12 text-primary" weight="duotone" />
              </div>
              <h3 className="font-heading text-[13px] sm:text-xl font-semibold text-foreground mb-1 sm:mb-2 leading-tight">
                {service.title}
              </h3>
              <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <Button
                variant="cta"
                size="sm"
                className="btn-lift w-full rounded-md text-[10px] sm:text-xs uppercase tracking-wider font-semibold whitespace-normal h-auto py-1.5 sm:py-2.5"
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
