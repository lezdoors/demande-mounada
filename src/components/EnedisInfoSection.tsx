import { Plug, Settings, Gauge, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const enedisServices = [
  {
    icon: Plug,
    title: "Raccordement neuf",
    description: "Extension ou creation du reseau electrique jusqu'a votre propriete.",
  },
  {
    icon: Settings,
    title: "Modification de branchement",
    description: "Deplacement de compteur, changement de coffret ou modification de l'alimentation.",
  },
  {
    icon: Gauge,
    title: "Changement de puissance",
    description: "Adaptation de la puissance delivree en fonction de vos nouveaux equipements.",
  },
  {
    icon: ShieldCheck,
    title: "Mise en conformite",
    description: "Mise aux normes de votre installation electrique selon les reglementations en vigueur.",
  },
];

const advantages = [
  "Dossier complet et conforme aux exigences Enedis",
  "Traitement prioritaire de votre demande",
  "Suivi personnalise par un expert dedie",
  "Aucune demarche administrative de votre part",
  "Delais de raccordement optimises",
  "Assistance jusqu'a la mise en service",
];

const EnedisInfoSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="enedis" className="section-padding bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Comment Enedis raccorde votre logement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enedis est le gestionnaire du reseau public de distribution d'electricite en France.
            Nous preparons votre dossier pour faciliter toutes vos demarches.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {enedisServices.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-2xl p-7 hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                <service.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary/4 border border-primary/10 rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-8 text-center">
              Pourquoi passer par notre service
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {advantages.map((adv) => (
                <div key={adv} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{adv}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="cta" size="lg" className="rounded-full px-10">
                Commencer ma demande
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnedisInfoSection;
