import { PencilSimple, MagnifyingGlass, SealCheck, Lightning } from "@phosphor-icons/react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const steps = [
  {
    number: "01",
    icon: PencilSimple,
    title: "Demande en ligne",
    description:
      "Remplissez notre formulaire en quelques minutes avec les informations de votre projet de raccordement.",
  },
  {
    number: "02",
    icon: MagnifyingGlass,
    title: "Etude du dossier",
    description:
      "Nos experts verifient et completent votre dossier pour garantir sa conformite aux exigences Enedis.",
  },
  {
    number: "03",
    icon: SealCheck,
    title: "Devis Enedis",
    description:
      "Votre dossier est transmis a Enedis qui realise l'etude technique et vous adresse un devis de raccordement.",
  },
  {
    number: "04",
    icon: Lightning,
    title: "Realisation des travaux",
    description:
      "Apres acceptation du devis, Enedis planifie et realise les travaux de raccordement sur votre terrain.",
  },
];

const ProcessSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="process" className="py-24 bg-[hsl(210,30%,97%)]">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-[40px] font-semibold text-foreground mb-4">
            Comment ca marche
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus simple en 4 etapes pour obtenir votre raccordement electrique.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-primary/15" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="group relative text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-6 mx-auto ring-4 ring-[hsl(210,30%,97%)] group-hover:ring-primary/20 transition-all">
                  <step.icon className="h-7 w-7" weight="duotone" />
                </div>
                <div className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
                  Etape {step.number}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
