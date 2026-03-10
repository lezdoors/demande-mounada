import { useNavigate } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import {
  PenLine,
  ScanSearch,
  Send,
  Microscope,
  BadgeCheck,
  PlugZap,
  ArrowRight,
  Phone,
  CheckCircle2,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: "01",
    icon: PenLine,
    title: "Remplissez le formulaire en ligne",
    description:
      "En quelques minutes, renseignez les informations de votre projet : type de raccordement, adresse, puissance souhaitee, informations personnelles. Notre formulaire intelligent s'adapte a votre situation.",
    details: [
      "Type de raccordement (provisoire, definitif, viabilisation)",
      "Adresse et localisation du terrain",
      "Puissance souhaitee et type d'alimentation",
      "Informations du demandeur",
    ],
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "Verification et preparation du dossier",
    description:
      "Nos experts verifient la coherence de votre demande, completent les elements manquants et preparent un dossier conforme aux exigences d'Enedis.",
    details: [
      "Verification de la coherence des informations",
      "Mise en conformite avec les exigences Enedis",
      "Complement des elements techniques",
      "Controle qualite du dossier",
    ],
  },
  {
    number: "03",
    icon: Send,
    title: "Soumission a Enedis",
    description:
      "Votre dossier est transmis directement a Enedis pour etude. Nous nous assurons que tous les elements sont presents pour eviter les allers-retours.",
    details: [
      "Transmission directe a Enedis",
      "Dossier complet des le premier envoi",
      "Numero de reference attribue",
      "Confirmation de reception",
    ],
  },
  {
    number: "04",
    icon: Microscope,
    title: "Etude technique par Enedis",
    description:
      "Enedis etudie la faisabilite technique de votre raccordement et prepare une proposition financiere (devis).",
    details: [
      "Analyse de la faisabilite technique",
      "Evaluation de la distance au reseau",
      "Calcul des couts de raccordement",
      "Preparation du devis personnalise",
    ],
  },
  {
    number: "05",
    icon: BadgeCheck,
    title: "Proposition de raccordement",
    description:
      "Vous recevez le devis d'Enedis. Nous vous aidons a comprendre la proposition et vous accompagnons dans la prise de decision.",
    details: [
      "Reception du devis Enedis",
      "Explication des postes de couts",
      "Accompagnement dans la decision",
      "Aide a l'acceptation du devis",
    ],
  },
  {
    number: "06",
    icon: PlugZap,
    title: "Travaux et mise en service",
    description:
      "Apres acceptation du devis, Enedis planifie et realise les travaux. A l'issue, votre compteur Linky est installe et mis en service.",
    details: [
      "Planification des travaux par Enedis",
      "Realisation du raccordement",
      "Installation du compteur Linky",
      "Mise en service de l'alimentation",
    ],
  },
];

const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const ref = useScrollFadeIn();
  const isEven = index % 2 === 0;

  return (
    <div className="relative">
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="absolute left-6 sm:left-8 top-20 bottom-0 w-px bg-border z-0 hidden md:block" />
      )}

      <div
        ref={ref}
        className={`scroll-fade-in relative z-10 rounded-2xl border border-border p-6 sm:p-8 md:p-10 ${
          isEven ? "bg-card" : "bg-muted/40"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Number + icon */}
          <div className="flex-shrink-0 flex md:flex-col items-center md:items-start gap-4">
            <div className="flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-primary text-primary-foreground font-heading text-xl sm:text-2xl font-bold">
              {step.number}
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
              <step.icon className="h-5 w-5" strokeWidth={1.5} fill="currentColor" fillOpacity={0.15} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-xl sm:text-2xl text-foreground mb-3">
              {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              {step.description}
            </p>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {step.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentCaMarche = () => {
  usePageMeta({
    title: "Comment Faire une Demande de Raccordement Enedis | Étapes",
    description: "Les 6 étapes de votre demande de raccordement Enedis : formulaire, vérification, soumission, devis, travaux, mise en service.",
  });
  const navigate = useNavigate();
  const heroRef = useScrollFadeIn();
  const ctaRef = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="section-padding bg-muted/40 border-b border-border">
          <div className="section-container">
            <div ref={heroRef} className="scroll-fade-in text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
                Comment ca marche
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                De votre demande en ligne jusqu'a la mise en service de votre compteur,
                decouvrez les 6 etapes de votre raccordement electrique.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="section-padding">
          <div className="section-container max-w-4xl mx-auto">
            {/* Timeline header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                6 etapes
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <StepCard key={step.number} step={step} index={i} />
              ))}
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
                Pret a demarrer ?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
                Lancez votre demande de raccordement en quelques minutes. Notre equipe prend en charge votre dossier sous 48h.
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

export default CommentCaMarche;
