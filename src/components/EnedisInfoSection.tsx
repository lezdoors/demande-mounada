import { Lightning, Wrench, Phone, Plug } from "@phosphor-icons/react";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const enedisServices = [
  {
    icon: Lightning,
    title: "Raccordement au Reseau",
    description:
      "Connexion des installations neuves au reseau electrique, incluant les habitations, immeubles, locaux professionnels et installations de production d'energie renouvelable comme les panneaux solaires.",
  },
  {
    icon: Lightning,
    title: "Mise en Service",
    description:
      "Operation technique permettant d'alimenter une installation en electricite apres souscription d'un contrat aupres d'un fournisseur d'energie, minimisant les delais d'attente.",
  },
  {
    icon: Wrench,
    title: "Gestion des Compteurs",
    description:
      "Installation, remplacement et maintenance des compteurs electriques, y compris le deploiement des compteurs communicants Linky, permettant un suivi precis de votre consommation energetique.",
  },
  {
    icon: Phone,
    title: "Depannage 24h/24 et 7j/7",
    description:
      "Intervention rapide en cas de panne ou d'incident sur le reseau electrique public, comme les coupures de courant collectives ou les problemes de tension, assurant une continuite de service.",
  },
];

const advantages = [
  "Conformite garantie avec les normes de securite et reglementations en vigueur",
  "Expertise technique specialisee pour tous types de projets",
  "Optimisation des couts et des delais de raccordement",
  "Integration simplifiee des energies renouvelables",
];

const EnedisInfoSection = () => {
  const ref = useScrollFadeIn();
  const ref2 = useScrollFadeIn();
  const ref3 = useScrollFadeIn();
  const navigate = useNavigate();

  return (
    <section id="enedis" className="section-padding bg-background">
      <div className="section-container">
        {/* Header with badge */}
        <div ref={ref} className="scroll-fade-in mb-10">
          <div className="bg-primary rounded-xl px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl text-primary-foreground font-bold">
              Enedis — Gestionnaire du Reseau Public d'Electricite
            </h2>
            <span className="text-xs sm:text-sm font-medium text-primary-foreground/90 bg-white/15 px-4 py-1.5 rounded-full whitespace-nowrap">
              Couverture de 95% du territoire
            </span>
          </div>

          {/* Intro paragraph */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            Enedis (anciennement ERDF) est le gestionnaire principal du reseau public de distribution d'electricite en France.
            Ses services sont essentiels pour garantir un raccordement de qualite et une alimentation electrique fiable pour les
            particuliers, professionnels et collectivites.
          </p>
        </div>

        {/* Services subheading + cards */}
        <div ref={ref2} className="scroll-fade-in">
          <h3 className="font-heading text-xl sm:text-2xl text-foreground font-bold mb-6">
            Services cles pour votre raccordement
          </h3>

          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {enedisServices.map((service) => (
              <div
                key={service.title}
                className="bg-primary/4 border border-primary/10 rounded-2xl p-6 sm:p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-5 w-5 text-primary-foreground" weight="bold" />
                  </div>
                  <h4 className="font-heading text-base sm:text-lg text-foreground font-bold">
                    {service.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Advantages */}
          <h3 className="font-heading text-xl sm:text-2xl text-foreground font-bold mb-5">
            Avantages d'un accompagnement professionnel
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {advantages.map((a) => (
              <div key={a} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{a}</span>
              </div>
            ))}
          </div>

          {/* Info callout */}
          <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-5 py-4 mb-12">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-sm text-amber-900 leading-relaxed">
                <span className="font-bold">Important pour votre raccordement Enedis :</span> Enedis assure la gestion technique du reseau electrique et des
                compteurs Linky, intervient en cas de panne sur le reseau public, et realise tous les types de branchements electriques,
                independamment du fournisseur d'electricite choisi par le client. Le delai de raccordement Enedis varie selon la region et
                la complexite du projet en France.
              </p>
            </div>
          </div>
        </div>

        {/* Lemonade-style illustration section */}
        <div ref={ref3} className="scroll-fade-in bg-muted/40 rounded-3xl pt-14 sm:pt-16 px-6">
          <div className="text-center mb-6">
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3">
              Rapide, simple, efficace
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Formulaire 100% en ligne, traitement rapide sous 48h, accompagnement expert inclus.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto flex items-center justify-center">
            {/* Left callout */}
            <div className="hidden md:block absolute left-0 top-[28%] text-right">
              <p className="text-base text-muted-foreground">En seulement</p>
              <p className="text-3xl lg:text-4xl font-heading text-foreground font-semibold">5 minutes</p>
              <svg className="ml-auto mr-6 mt-2" width="50" height="40" viewBox="0 0 50 40" fill="none">
                <path d="M48 2C35 2 18 10 14 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground/40" />
                <path d="M19 33L14 38L9 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40" />
              </svg>
            </div>

            {/* Right callout */}
            <div className="hidden md:block absolute right-0 top-[28%] text-left">
              <p className="text-3xl lg:text-4xl font-heading text-foreground font-semibold">48h</p>
              <p className="text-base text-muted-foreground">de traitement</p>
              <svg className="ml-6 mt-2" width="50" height="40" viewBox="0 0 50 40" fill="none">
                <path d="M2 2C15 2 32 10 36 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-muted-foreground/40" />
                <path d="M31 33L36 38L41 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40" />
              </svg>
            </div>

            {/* Phone illustration */}
            <img
              src="/illustration-phones.png"
              alt="Illustration du processus de demande"
              className="w-72 sm:w-80 md:w-96 lg:w-[420px] h-auto"
            />
          </div>

          {/* Mobile callouts */}
          <div className="md:hidden flex justify-center gap-10 py-4">
            <div className="text-center">
              <p className="text-3xl font-heading text-foreground font-semibold">5 min</p>
              <p className="text-sm text-muted-foreground">pour remplir</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-heading text-foreground font-semibold">48h</p>
              <p className="text-sm text-muted-foreground">de traitement</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center -mt-4 pb-10">
            <Button variant="cta" size="lg" className="rounded-md text-base w-72 sm:w-80 md:w-96 lg:w-[420px] shadow-cta" onClick={() => navigate("/form")}>
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
