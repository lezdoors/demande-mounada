import { Plug, Settings, Gauge, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

const EnedisInfoSection = () => {
  const ref = useScrollFadeIn();
  const ref2 = useScrollFadeIn();

  return (
    <section id="enedis" className="section-padding bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-3">
            Comment Enedis raccorde votre logement
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enedis est le gestionnaire du reseau public de distribution d'electricite en France.
            Nous preparons votre dossier pour faciliter toutes vos demarches.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-20">
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

        {/* Lemonade-style "Instant everything" illustration section */}
        <div ref={ref2} className="scroll-fade-in bg-muted/50 rounded-3xl py-16 sm:py-20 px-6">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
              Rapide, simple, efficace
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Formulaire 100% en ligne, traitement rapide sous 48h, accompagnement expert inclus.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto flex items-center justify-center">
            {/* Left callout */}
            <div className="hidden sm:block absolute left-0 top-1/4 text-right">
              <p className="text-sm text-muted-foreground">En seulement</p>
              <p className="text-2xl font-heading text-foreground">5 minutes</p>
              <svg className="ml-auto mr-4 mt-1" width="40" height="30" viewBox="0 0 40 30" fill="none">
                <path d="M38 2C28 2 16 8 12 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground/40" />
                <path d="M16 24L12 28L8 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40" />
              </svg>
            </div>

            {/* Right callout */}
            <div className="hidden sm:block absolute right-0 top-1/4 text-left">
              <p className="text-2xl font-heading text-foreground">48h</p>
              <p className="text-sm text-muted-foreground">de traitement</p>
              <svg className="ml-4 mt-1" width="40" height="30" viewBox="0 0 40 30" fill="none">
                <path d="M2 2C12 2 24 8 28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground/40" />
                <path d="M24 24L28 28L32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40" />
              </svg>
            </div>

            {/* Phone mockups */}
            <div className="relative w-56 sm:w-64">
              {/* Phone 1 — form */}
              <div className="relative bg-white rounded-[2rem] border-[3px] border-foreground/10 p-3 shadow-xl">
                <div className="flex items-center justify-center gap-1 mb-3">
                  <div className="w-16 h-1 rounded-full bg-foreground/10" />
                </div>
                <div className="space-y-3 px-2 pb-4">
                  <div className="h-3 w-3/4 bg-foreground/8 rounded-full" />
                  <div className="h-3 w-full bg-foreground/8 rounded-full" />
                  <div className="h-3 w-5/6 bg-foreground/8 rounded-full" />
                  <div className="h-8 w-full bg-foreground/5 rounded-lg border border-foreground/8 mt-2" />
                  <div className="h-8 w-full bg-foreground/5 rounded-lg border border-foreground/8" />
                  <div className="h-8 w-full bg-foreground/5 rounded-lg border border-foreground/8" />
                  <div className="h-9 w-full bg-primary rounded-lg flex items-center justify-center mt-2">
                    <span className="text-[10px] text-white font-semibold uppercase tracking-wider">Envoyer</span>
                  </div>
                </div>
              </div>

              {/* Phone 2 — confirmation, overlapping */}
              <div className="absolute -right-16 sm:-right-20 top-8 w-44 sm:w-48 bg-white rounded-[2rem] border-[3px] border-foreground/10 p-3 shadow-xl">
                <div className="flex items-center justify-center gap-1 mb-3">
                  <div className="w-12 h-1 rounded-full bg-foreground/10" />
                </div>
                <div className="flex flex-col items-center px-2 pb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="h-2.5 w-20 bg-foreground/10 rounded-full mb-2" />
                  <div className="h-2 w-24 bg-foreground/6 rounded-full mb-1" />
                  <div className="h-2 w-16 bg-foreground/6 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile callouts */}
          <div className="sm:hidden flex justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-2xl font-heading text-foreground">5 min</p>
              <p className="text-xs text-muted-foreground">pour remplir</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-heading text-foreground">48h</p>
              <p className="text-xs text-muted-foreground">de traitement</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="cta" size="lg" className="rounded-md px-10 text-base">
              Faire ma demande maintenant
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnedisInfoSection;
