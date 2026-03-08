import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "À quoi sert ce service ?",
    answer:
      "Ce service vous permet de préparer et structurer votre demande de raccordement électrique en ligne. Il vous guide à travers les informations nécessaires et organise votre dossier de manière claire.",
  },
  {
    question: "Quels documents sont nécessaires ?",
    answer:
      "Les documents requis varient selon votre projet. En général, une autorisation d'urbanisme, un plan de situation, un plan de masse et les coordonnées du demandeur sont demandés. Le formulaire vous indiquera les pièces nécessaires.",
  },
  {
    question: "Combien de temps prend la préparation d'un dossier ?",
    answer:
      "La durée dépend de la complexité de votre projet et de la disponibilité de vos documents. Le formulaire est conçu pour être complété en quelques minutes si vous disposez des informations nécessaires.",
  },
  {
    question: "Ce service convient-il pour une maison neuve ?",
    answer:
      "Oui, le service couvre les demandes de raccordement pour les constructions neuves, qu'il s'agisse de maisons individuelles ou d'autres types de bâtiments.",
  },
  {
    question: "Puis-je faire une demande pour un raccordement provisoire ?",
    answer:
      "Oui, les demandes de raccordement provisoire pour chantier ou événement temporaire sont prises en charge par le service.",
  },
  {
    question: "Que se passe-t-il après la demande ?",
    answer:
      "Une fois votre dossier complété et vérifié, il est structuré pour être transmis au gestionnaire de réseau compétent. Vous recevrez les informations de suivi nécessaires.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="section-padding bg-muted/40">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-3">
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
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
