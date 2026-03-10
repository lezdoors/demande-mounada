import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { Headset, Plug, Building2, Cpu, FileText, ArrowRight, Phone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    id: "services",
    label: "Nos services",
    icon: Headset,
    items: [
      {
        question: "Qu'est-ce que le service de preparation de dossier ?",
        answer:
          "Nous preparons et structurons votre dossier de demande de raccordement electrique pour soumission a Enedis. Notre service comprend la verification de tous les documents, le remplissage conforme des formulaires, et le suivi de votre dossier.",
      },
      {
        question: "Combien coute votre service ?",
        answer:
          "Notre service de preparation de dossier est facture 129,80 EUR TTC. Ce tarif comprend l'etude de votre projet, la preparation complete du dossier et l'accompagnement jusqu'a la soumission a Enedis.",
      },
      {
        question: "Etes-vous affilie a Enedis ?",
        answer:
          "Non, nous sommes un service independant de preparation de dossier. Nous ne sommes pas affilies a Enedis. Notre role est de vous aider a constituer un dossier complet et conforme pour faciliter le traitement de votre demande par Enedis.",
      },
      {
        question: "Comment suivre l'avancement de ma demande ?",
        answer:
          "Apres soumission de votre dossier, vous recevez un numero de reference. Vous pouvez suivre l'avancement en ligne ou contacter notre equipe qui vous informe a chaque etape : reception, etude technique, devis, planification des travaux.",
      },
    ],
  },
  {
    id: "raccordement",
    label: "Le raccordement",
    icon: Plug,
    items: [
      {
        question: "Quel est le delai pour un raccordement electrique ?",
        answer:
          "Le delai varie selon le type de raccordement. Un raccordement provisoire peut etre realise en 2 a 4 semaines. Un raccordement definitif sans extension de reseau prend 2 a 3 mois. Avec extension de reseau, comptez 4 a 6 mois.",
      },
      {
        question: "Combien coute un raccordement Enedis ?",
        answer:
          "Le cout depend de la distance au reseau, de la puissance demandee et du type de raccordement. Enedis etablit un devis personnalise apres etude technique. Les tarifs sont reglementes et publies par la CRE (Commission de Regulation de l'Energie).",
      },
      {
        question: "Quels documents faut-il fournir ?",
        answer:
          "Les documents principaux sont : l'autorisation d'urbanisme (permis de construire ou declaration prealable), un plan de situation, un plan de masse, des photos du terrain et les coordonnees du demandeur.",
      },
      {
        question:
          "Peut-on faire un raccordement provisoire pour un chantier ?",
        answer:
          "Oui, le raccordement provisoire (compteur de chantier) est prevu pour alimenter un chantier de construction. Il est temporaire et sera remplace par le raccordement definitif a la fin des travaux.",
      },
    ],
  },
  {
    id: "enedis",
    label: "Enedis",
    icon: Building2,
    items: [
      {
        question: "Quelle est la difference entre Enedis et EDF ?",
        answer:
          "Enedis (ex-ERDF) gere le reseau de distribution d'electricite et les raccordements. EDF est un fournisseur d'electricite. Pour un raccordement, la demande est adressee a Enedis. Le choix du fournisseur (EDF, TotalEnergies, etc.) intervient apres.",
      },
      {
        question: "Qu'est-ce qu'une ELD ?",
        answer:
          "Une ELD (Entreprise Locale de Distribution) est un distributeur d'electricite local qui dessert certaines communes. Enedis couvre 95% du territoire metropolitain, les 5% restants sont geres par environ 160 ELD.",
      },
      {
        question: "Comment contacter Enedis ?",
        answer:
          "Enedis est joignable au 09 69 32 18 00 (appel non surtaxe). Vous pouvez egalement utiliser le site enedis.fr pour effectuer vos demarches en ligne. Notre service peut aussi gerer ces demarches pour vous.",
      },
      {
        question: "Qu'est-ce que le compteur Linky ?",
        answer:
          "Le compteur Linky est le compteur communicant deploye par Enedis. Il permet le releve a distance, le suivi de consommation en temps reel et facilite certaines operations comme le changement de puissance.",
      },
    ],
  },
  {
    id: "technique",
    label: "Technique",
    icon: Cpu,
    items: [
      {
        question: "Quelle puissance choisir pour mon raccordement ?",
        answer:
          "Pour une maison standard, 6 a 9 kVA en monophase suffit. Pour une maison avec chauffage electrique, pompe a chaleur ou borne de recharge, 12 kVA ou plus en triphase peut etre necessaire. Notre formulaire vous guide dans ce choix.",
      },
      {
        question: "Monophase ou triphase ?",
        answer:
          "Le monophase (230V) convient a la majorite des habitations. Le triphase (400V) est recommande pour les puissances superieures a 12 kVA, les equipements industriels ou les longues distances entre compteur et tableau.",
      },
      {
        question: "Mon terrain n'est pas encore viabilise, que faire ?",
        answer:
          "La viabilisation consiste a amener les reseaux jusqu'a votre terrain. Nous pouvons preparer votre dossier de demande de viabilisation electrique aupres d'Enedis dans le cadre d'un projet de construction.",
      },
      {
        question: "Qu'est-ce que le hors d'eau hors d'air ?",
        answer:
          "Le hors d'eau hors d'air designe l'etat d'avancement d'une construction ou la toiture est posee (hors d'eau) et les menuiseries exterieures installees (hors d'air). C'est souvent un prealable pour le raccordement definitif.",
      },
    ],
  },
  {
    id: "administratif",
    label: "Administratif",
    icon: FileText,
    items: [
      {
        question:
          "Faut-il un permis de construire pour un raccordement ?",
        answer:
          "Un permis de construire ou une declaration prealable de travaux est generalement necessaire pour un raccordement definitif lie a une construction neuve. Pour un raccordement provisoire ou une augmentation de puissance, il n'est pas requis.",
      },
      {
        question: "Qui doit faire la demande de raccordement ?",
        answer:
          "La demande peut etre faite par le proprietaire, le maitre d'ouvrage, ou toute personne mandatee. Pour un raccordement collectif, c'est generalement l'amenageur ou le promoteur qui effectue la demande.",
      },
      {
        question: "Peut-on choisir son fournisseur d'electricite ?",
        answer:
          "Oui, depuis l'ouverture du marche en 2007, vous etes libre de choisir votre fournisseur (EDF, TotalEnergies, Engie, etc.). Le raccordement par Enedis est independant du choix du fournisseur.",
      },
      {
        question:
          "Que se passe-t-il apres la soumission du dossier ?",
        answer:
          "Enedis accuse reception, realise une etude technique, puis vous envoie une proposition de raccordement avec devis. Apres acceptation et paiement, les travaux sont planifies et realises.",
      },
    ],
  },
];

const Faq = () => {
  usePageMeta({
    title: "FAQ Raccordement Enedis — Questions Fréquentes",
    description: "Réponses aux questions fréquentes sur le raccordement électrique Enedis : délais, coûts, documents, procédure.",
  });
  const navigate = useNavigate();
  const heroRef = useScrollFadeIn();
  const ctaRef = useScrollFadeIn();
  const [activeCategory, setActiveCategory] = useState("services");

  const activeCat = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="section-padding bg-muted/40 border-b border-border">
          <div className="section-container">
            <div ref={heroRef} className="scroll-fade-in text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                Questions frequentes
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Retrouvez les reponses aux questions les plus courantes sur le raccordement
                electrique, nos services et les demarches aupres d'Enedis.
              </p>
            </div>
          </div>
        </section>

        {/* Category tabs + FAQ content */}
        <section className="section-padding">
          <div className="section-container max-w-4xl mx-auto">
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                      transition-all duration-200 border
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Accordion for active category */}
            <Accordion type="single" collapsible className="space-y-3">
              {activeCat.items.map((faq, i) => (
                <AccordionItem
                  key={`${activeCat.id}-${i}`}
                  value={`${activeCat.id}-${i}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm"
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

            {/* All categories in sequence below for SEO / full-page view */}
            <div className="mt-16 space-y-14">
              {categories
                .filter((c) => c.id !== activeCategory)
                .map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div key={cat.id}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <h2 className="font-heading text-xl text-foreground">
                          {cat.label}
                        </h2>
                      </div>
                      <Accordion type="single" collapsible className="space-y-3">
                        {cat.items.map((faq, i) => (
                          <AccordionItem
                            key={`${cat.id}-${i}`}
                            value={`${cat.id}-${i}`}
                            className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm"
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
                  );
                })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 sm:py-28 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, hsl(210 20% 98%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(210 20% 98%) 0%, transparent 50%)",
              }}
            />
          </div>
          <div className="section-container text-center relative z-10">
            <div ref={ctaRef} className="scroll-fade-in">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-5">
                Vous avez d'autres questions ?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
                Notre equipe est disponible pour vous accompagner dans votre projet de raccordement electrique.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-10 font-medium hover:scale-[1.02] transition-all text-base"
                  onClick={() => navigate("/form")}
                >
                  Commencer ma demande
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <a
                  href="tel:0188615000"
                  className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  01 88 61 50 00 (Non surtaxe)
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Faq;
