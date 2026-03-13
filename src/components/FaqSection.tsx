import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const faqsLeft = [
  {
    question: "Quel est le delai pour un raccordement electrique ?",
    answer:
      "Le delai varie selon le type de raccordement. Un raccordement provisoire peut etre realise en 2 a 4 semaines. Un raccordement definitif sans extension de reseau prend 2 a 3 mois. Avec extension de reseau, comptez 4 a 6 mois.",
  },
  {
    question: "Combien coute un raccordement Enedis ?",
    answer:
      "Le cout depend de la distance au reseau, de la puissance demandee et du type de raccordement. Enedis etablit un devis personnalise apres etude technique. Notre service de preparation de dossier est facture 129,80 EUR.",
  },
  {
    question: "Quels documents faut-il fournir ?",
    answer:
      "Les documents principaux sont : l'autorisation d'urbanisme (permis de construire ou declaration prealable), un plan de situation, un plan de masse, des photos du terrain et les coordonnees du demandeur. Le formulaire vous guide pour chaque document.",
  },
  {
    question: "Peut-on faire un raccordement provisoire pour un chantier ?",
    answer:
      "Oui, le raccordement provisoire (compteur de chantier) est prevu pour alimenter un chantier de construction. Il est temporaire et sera remplace par le raccordement definitif a la fin des travaux.",
  },
];

const faqsRight = [
  {
    question: "Quelle est la difference entre Enedis et EDF ?",
    answer:
      "Enedis (ex-ERDF) gere le reseau de distribution d'electricite et les raccordements. EDF est un fournisseur d'electricite. Pour un raccordement, la demande est adressee a Enedis. Le choix du fournisseur (EDF, TotalEnergies, etc.) intervient apres.",
  },
  {
    question: "Mon terrain n'est pas encore viabilise, que faire ?",
    answer:
      "La viabilisation consiste a amener les reseaux (electricite, eau, gaz) jusqu'a votre terrain. Nous pouvons preparer votre dossier de demande de viabilisation electrique aupres d'Enedis dans le cadre d'un projet de construction.",
  },
  {
    question: "Comment suivre l'avancement de ma demande ?",
    answer:
      "Apres soumission de votre dossier, vous recevez un numero de reference. Vous pouvez suivre l'avancement en ligne ou contacter notre equipe qui vous informe a chaque etape : reception, etude technique, devis, planification des travaux.",
  },
];

const FaqSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="faq" className="py-24 bg-[hsl(210,30%,97%)]">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-14">
          <h2 className="font-heading text-[40px] font-semibold text-foreground mb-4">
            Questions frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur le raccordement electrique.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqsLeft.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`left-${i}`}
                className="bg-card border border-border rounded-2xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md data-[state=open]:border-primary/10"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-5 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="space-y-3">
            {faqsRight.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`right-${i}`}
                className="bg-card border border-border rounded-2xl px-6 shadow-sm hover:shadow-md transition-all data-[state=open]:shadow-md data-[state=open]:border-primary/10"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-5 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
