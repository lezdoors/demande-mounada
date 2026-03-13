import { HouseSimple, HardHat, Shovel, GearSix, Buildings, SunDim } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const specializedServices = [
  {
    icon: HouseSimple,
    title: "Raccordement Maison Neuve",
    description:
      "Branchement definitif au reseau Enedis avec mise en service du compteur Linky.",
  },
  {
    icon: HardHat,
    title: "Raccordement Provisoire",
    description:
      "Compteur de chantier pour alimenter vos travaux de construction.",
  },
  {
    icon: Shovel,
    title: "Viabilisation de Terrain",
    description:
      "Raccordement terrain nu et coordination avec les concessionnaires reseaux.",
  },
  {
    icon: GearSix,
    title: "Modification de Raccordement",
    description:
      "Deplacement compteur, changement puissance ou modification de branchement.",
  },
  {
    icon: Buildings,
    title: "Raccordement Collectif",
    description:
      "Lotissements, coproprietes et operations d'amenagement multi-lots.",
  },
  {
    icon: SunDim,
    title: "Raccordement Photovoltaique",
    description:
      "Raccordement panneaux solaires au reseau pour autoconsommation ou revente.",
  },
];

const SpecializedServicesSection = () => {
  const ref = useScrollFadeIn();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-12">
          <h2 className="font-heading text-[40px] font-semibold text-foreground mb-6">
            Tous nos services de raccordement
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Quel que soit votre projet, nous preparons votre dossier Enedis de A a Z.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {specializedServices.map((service) => (
            <div
              key={service.title}
              className="group card-elevated p-6"
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 icon-hover">
                <service.icon className="h-12 w-12 text-primary" weight="duotone" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2 leading-tight">
                {service.title}
              </h3>
              <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <Button
                variant="ctaOutline"
                className="btn-lift w-full rounded-full text-[7px] sm:text-xs h-auto py-1 sm:py-2"
                onClick={() => navigate("/form")}
              >
                Faire ma demande
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializedServicesSection;
