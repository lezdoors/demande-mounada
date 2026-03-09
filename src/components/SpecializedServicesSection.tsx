import { Shovel, Sun, Wind, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const specializedServices = [
  {
    icon: Shovel,
    title: "Viabilisation de terrain",
    description:
      "Preparation complete de votre terrain pour le raccordement aux reseaux. Coordination avec les differents concessionnaires et gestion des autorisations.",
    features: ["Etude de faisabilite", "Coordination multi-reseaux", "Suivi des travaux"],
  },
  {
    icon: Sun,
    title: "Installations photovoltaiques",
    description:
      "Raccordement de vos panneaux solaires au reseau Enedis. Autoconsommation ou revente totale, nous gerons le dossier technique complet.",
    features: ["Autoconsommation", "Revente totale", "Contrat d'acces"],
  },
  {
    icon: Wind,
    title: "Pompes a chaleur",
    description:
      "Augmentation de puissance necessaire pour l'installation d'une pompe a chaleur. Verification de la capacite de votre branchement actuel.",
    features: ["Diagnostic puissance", "Mise a niveau", "Certificats"],
  },
  {
    icon: Zap,
    title: "Bornes de recharge",
    description:
      "Raccordement ou augmentation de puissance pour l'installation de bornes de recharge de vehicules electriques, en individuel ou en copropriete.",
    features: ["Particuliers", "Coproprietes", "Entreprises"],
  },
];

const SpecializedServicesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Services specialises
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions adaptees aux projets qui necessitent une expertise technique specifique.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {specializedServices.map((service) => (
            <div
              key={service.title}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-primary/12 transition-colors">
                <service.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((f) => (
                  <span
                    key={f}
                    className="text-xs font-medium bg-primary/6 text-primary px-3 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Button variant="ctaOutline" className="rounded-full w-full">
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
