import { ClipboardList, Search, FileCheck, Truck } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Demande en ligne",
    description:
      "Remplissez notre formulaire en quelques minutes avec les informations de votre projet de raccordement.",
  },
  {
    number: "02",
    icon: Search,
    title: "Etude du dossier",
    description:
      "Nos experts verifient et completent votre dossier pour garantir sa conformite aux exigences Enedis.",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Devis Enedis",
    description:
      "Votre dossier est transmis a Enedis qui realise l'etude technique et vous adresse un devis de raccordement.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Realisation des travaux",
    description:
      "Apres acceptation du devis, Enedis planifie et realise les travaux de raccordement sur votre terrain.",
  },
];

const ProcessSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="process" className="section-padding bg-muted/40">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Comment ca marche
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus simple en 4 etapes pour obtenir votre raccordement electrique.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-6 mx-auto">
                <step.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <div className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
                Etape {step.number}
              </div>
              <h3 className="font-heading text-lg text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 border-t-2 border-dashed border-primary/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
