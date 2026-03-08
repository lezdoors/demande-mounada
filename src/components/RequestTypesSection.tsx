import { Home, Zap, TrendingUp, MapPin, Building, MoreHorizontal } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const requestTypes = [
  {
    icon: Home,
    title: "Raccordement d'une maison neuve",
    description: "Première mise en service électrique pour une construction neuve sur un terrain non raccordé.",
  },
  {
    icon: Zap,
    title: "Raccordement provisoire",
    description: "Alimentation électrique temporaire pour un chantier ou un événement de durée limitée.",
  },
  {
    icon: TrendingUp,
    title: "Augmentation de puissance",
    description: "Modification de la puissance de raccordement pour répondre à de nouveaux besoins.",
  },
  {
    icon: MapPin,
    title: "Raccordement de terrain",
    description: "Raccordement d'une parcelle en vue d'un projet de construction ou d'aménagement.",
  },
  {
    icon: Building,
    title: "Raccordement pour local professionnel",
    description: "Mise en service pour un commerce, bureau, atelier ou tout local à usage professionnel.",
  },
  {
    icon: MoreHorizontal,
    title: "Autres demandes de raccordement",
    description: "Toute autre situation nécessitant une demande spécifique de raccordement électrique.",
  },
];

const RequestTypesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="services" className="section-padding bg-muted/40">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Types de demandes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sélectionnez le type de raccordement correspondant à votre situation pour commencer votre demande.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requestTypes.map((item) => (
            <article
              key={item.title}
              className="bg-card border border-border rounded-lg p-7 hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {item.description}
              </p>
              <a
                href="#"
                className="text-sm text-primary font-medium hover:underline underline-offset-2 transition-colors"
              >
                En savoir plus
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RequestTypesSection;
