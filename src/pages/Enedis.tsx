import { useNavigate } from "react-router-dom";
import {
  Building,
  Network,
  Plug,
  ArrowRight,
  FileText,
  Search,
  Euro,
  ThumbsUp,
  Hammer,
  Power,
  Home,
  HardHat,
  Zap,
  Building2,
  MapPin,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const processSteps = [
  {
    number: "01",
    icon: FileText,
    title: "Depot de la demande",
    description:
      "Constitution et envoi du dossier de raccordement a Enedis avec tous les documents necessaires (plan de situation, plan de masse, permis de construire).",
  },
  {
    number: "02",
    icon: Search,
    title: "Etude technique",
    description:
      "Enedis realise une etude technique pour determiner les travaux necessaires au raccordement de votre installation au reseau.",
  },
  {
    number: "03",
    icon: Euro,
    title: "Proposition financiere",
    description:
      "Enedis vous adresse une proposition de raccordement detaillant le cout des travaux, les delais et les conditions techniques.",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Acceptation",
    description:
      "Vous signez et retournez la proposition financiere avec le reglement. Enedis planifie alors les travaux de raccordement.",
  },
  {
    number: "05",
    icon: Hammer,
    title: "Travaux de raccordement",
    description:
      "Enedis et ses prestataires realisent les travaux d'extension et de branchement au reseau electrique sur votre terrain.",
  },
  {
    number: "06",
    icon: Power,
    title: "Mise en service",
    description:
      "Un technicien Enedis procede a la mise en service de votre installation et a l'activation de votre compteur Linky.",
  },
];

const raccordementTypes = [
  {
    icon: Home,
    title: "Raccordement definitif",
    description:
      "Pour les constructions neuves et les batiments existants necessitant un nouveau branchement permanent au reseau.",
  },
  {
    icon: HardHat,
    title: "Raccordement provisoire",
    description:
      "Alimentation temporaire de chantier (compteur de chantier) le temps des travaux de construction.",
  },
  {
    icon: Zap,
    title: "Augmentation de puissance",
    description:
      "Modification de la puissance delivree pour repondre a de nouveaux besoins (triphase, kVA supplementaires).",
  },
  {
    icon: Building2,
    title: "Raccordement collectif",
    description:
      "Raccordement de lotissements, coproprietes et operations d'amenagement necessitant plusieurs points de livraison.",
  },
];

const differences = [
  {
    icon: Network,
    label: "Enedis",
    role: "Gestionnaire du reseau",
    description:
      "Exploite, entretient et developpe le reseau public de distribution d'electricite. Responsable du raccordement, du compteur Linky et de l'acheminement de l'electricite.",
    color: "bg-primary/8 text-primary",
  },
  {
    icon: Building,
    label: "EDF / TotalEnergies / Engie",
    role: "Fournisseurs d'electricite",
    description:
      "Vendent l'electricite aux consommateurs. Gerent les contrats de fourniture, la facturation et le service client. Le choix du fournisseur n'impacte pas le raccordement.",
    color: "bg-orange-50 text-orange-600",
  },
];

const Enedis = () => {
  const navigate = useNavigate();
  const heroRef = useScrollFadeIn();
  const whatRef = useScrollFadeIn();
  const diffRef = useScrollFadeIn();
  const processRef = useScrollFadeIn();
  const typesRef = useScrollFadeIn();
  const zoneRef = useScrollFadeIn();
  const ctaRef = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 bg-muted/40">
          <div className="section-container">
            <div ref={heroRef} className="scroll-fade-in text-center max-w-3xl mx-auto">
              <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                Guide Enedis
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
                Tout savoir sur Enedis et le raccordement electrique
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprendre le role d'Enedis, les etapes du raccordement et les differences avec les fournisseurs d'electricite.
              </p>
            </div>
          </div>
        </section>

        {/* Qu'est-ce qu'Enedis ? */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div ref={whatRef} className="scroll-fade-in">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-6 text-center">
                  Qu'est-ce qu'Enedis ?
                </h2>
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <Network className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        <strong className="text-foreground">Enedis</strong> (ex-ERDF) est le gestionnaire du reseau public de distribution d'electricite en France metropolitaine (hors zones desservies par les ELD). Filiale d'EDF, Enedis exploite, entretient et developpe le reseau de distribution qui achemine l'electricite jusqu'aux consommateurs.
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        Enedis est responsable de plus de 1,4 million de kilometres de lignes electriques et dessert 37 millions de clients sur 95% du territoire francais.
                      </p>
                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                        <div className="flex items-start gap-2.5">
                          <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2} />
                          <p className="text-sm text-foreground">
                            <strong>Important :</strong> Enedis n'est pas un fournisseur d'electricite. Enedis gere le reseau et le raccordement, quel que soit le fournisseur d'electricite que vous choisissez (EDF, TotalEnergies, Engie, etc.).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enedis vs EDF vs fournisseurs */}
        <section className="section-padding bg-muted/40">
          <div className="section-container">
            <div ref={diffRef} className="scroll-fade-in">
              <div className="text-center mb-12">
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
                  Enedis vs EDF vs fournisseurs
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Une distinction essentielle a comprendre avant de faire votre demande de raccordement.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                {differences.map((item) => (
                  <div
                    key={item.label}
                    className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`h-12 w-12 rounded-xl ${item.color} flex items-center justify-center mb-5`}>
                      <item.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl text-foreground mb-1">
                      {item.label}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-primary mb-3">
                      {item.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-2xl p-5 sm:p-7 text-center">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    <strong className="text-foreground">En resume :</strong> le raccordement au reseau passe toujours par Enedis, quel que soit le fournisseur d'electricite que vous choisissez ensuite.
                    Votre fournisseur (EDF, TotalEnergies, Engie, etc.) n'intervient qu'apres la mise en service pour la fourniture d'electricite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Le processus de raccordement */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div ref={processRef} className="scroll-fade-in">
              <div className="text-center mb-14">
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
                  Le processus de raccordement Enedis
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Du depot de la demande a la mise en service, le raccordement suit un processus en 6 etapes.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {processSteps.map((step) => (
                  <div key={step.number} className="relative">
                    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                          <step.icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <div className="text-xs font-semibold text-primary uppercase tracking-widest">
                          Etape {step.number}
                        </div>
                      </div>
                      <h3 className="font-heading text-base sm:text-lg text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Les types de raccordement */}
        <section className="section-padding bg-muted/40">
          <div className="section-container">
            <div ref={typesRef} className="scroll-fade-in">
              <div className="text-center mb-14">
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
                  Les types de raccordement
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  Quatre types de raccordement pour repondre a tous les besoins.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {raccordementTypes.map((type) => (
                  <div
                    key={type.title}
                    className="bg-card border border-border rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                      <type.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg text-foreground mb-2">
                      {type.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Zone de desserte */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div ref={zoneRef} className="scroll-fade-in">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
                    Zone de desserte
                  </h2>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-10">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        Enedis couvre <strong className="text-foreground">95% du territoire francais metropolitain</strong>. Le reseau de distribution gere par Enedis dessert 37 millions de points de livraison dans plus de 33 000 communes.
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        Les <strong className="text-foreground">5% restants</strong> sont geres par des <strong className="text-foreground">ELD (Entreprises Locales de Distribution)</strong>. Il s'agit de regies municipales ou de syndicats d'electricite historiques qui gerent leur propre reseau de distribution dans certaines communes.
                      </p>
                      <div className="bg-muted/60 border border-border rounded-xl p-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Comment savoir si vous etes en zone Enedis ?</strong> Verifiez sur le site officiel d'Enedis ou contactez votre mairie. Si votre commune est desservie par une ELD, la demande de raccordement doit etre effectuee directement aupres de cette ELD.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
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
              <Plug className="h-10 w-10 text-primary-foreground/40 mx-auto mb-6" strokeWidth={1} />
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-5">
                Nous preparons votre dossier Enedis
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/80 max-w-xl mx-auto mb-10">
                Confiez-nous votre demande de raccordement. Notre equipe d'experts constitue et depose votre dossier complet aupres d'Enedis.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-full px-10 font-medium hover:scale-[1.02] transition-all text-base"
                onClick={() => navigate("/form")}
              >
                Commencer ma demande
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Enedis;
