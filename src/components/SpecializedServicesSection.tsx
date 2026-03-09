import { Shovel, Sun, Wind, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const specializedServices = [
  {
    icon: Shovel,
    title: "Viabilisation de terrain",
    description:
      "Preparation complete de votre terrain pour le raccordement aux reseaux. Coordination avec les differents concessionnaires.",
    features: ["Etude de faisabilite", "Coordination multi-reseaux", "Suivi des travaux"],
  },
  {
    icon: Sun,
    title: "Installations photovoltaiques",
    description:
      "Raccordement de vos panneaux solaires au reseau Enedis. Autoconsommation ou revente totale, nous gerons le dossier complet.",
    features: ["Autoconsommation", "Revente totale", "Contrat d'acces"],
  },
  {
    icon: Wind,
    title: "Pompes a chaleur",
    description:
      "Augmentation de puissance necessaire pour l'installation d'une pompe a chaleur. Verification de la capacite de votre branchement.",
    features: ["Diagnostic puissance", "Mise a niveau", "Certificats"],
  },
  {
    icon: Zap,
    title: "Bornes de recharge",
    description:
      "Raccordement ou augmentation de puissance pour l'installation de bornes de recharge de vehicules electriques.",
    features: ["Particuliers", "Coproprietes", "Entreprises"],
  },
];

const SpecializedServicesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl text-foreground mb-3">
            Services specialises
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Des solutions adaptees aux projets qui necessitent une expertise technique specifique.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {specializedServices.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-8 w-8 sm:h-14 sm:w-14 rounded-lg sm:rounded-2xl bg-primary/8 flex items-center justify-center mb-3 sm:mb-6 group-hover:bg-primary/12 transition-colors">
                <service.icon className="h-4 w-4 sm:h-7 sm:w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xs sm:text-xl text-foreground mb-1 sm:mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="hidden sm:block text-sm text-muted-foreground leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="hidden sm:flex flex-wrap gap-2 mb-6">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs font-medium bg-primary/6 text-primary px-3 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Button variant="ctaOutline" className="w-full rounded-full text-[8px] sm:text-sm h-auto py-1.5 sm:py-2.5">
                En savoir plus
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializedServicesSection;
