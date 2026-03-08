import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const steps = [
  {
    number: "01",
    title: "Vous remplissez votre demande en ligne",
    description: "Complétez le formulaire structuré avec les informations relatives à votre projet de raccordement.",
  },
  {
    number: "02",
    title: "Vous ajoutez les informations nécessaires",
    description: "Joignez les documents requis et précisez les détails techniques de votre demande.",
  },
  {
    number: "03",
    title: "Le dossier est structuré et vérifié",
    description: "Votre dossier est organisé selon les exigences administratives pour une présentation claire.",
  },
  {
    number: "04",
    title: "Votre demande est prête à être transmise",
    description: "Une fois finalisé, votre dossier complet est prêt pour transmission au gestionnaire de réseau.",
  },
];

const ProcessSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="process" className="section-padding bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Comment ça marche
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus simple en quatre étapes pour préparer votre dossier de raccordement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative rounded-lg p-6 hover:bg-muted/50 transition-all duration-300"
            >
              <div className="text-5xl font-heading font-bold text-primary/12 mb-4 leading-none">
                {step.number}
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 w-6 border-t-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
