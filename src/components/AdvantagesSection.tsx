import { ShieldCheck, Timer, UsersThree, Headset } from "@phosphor-icons/react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const stats = [
  { value: "48h", label: "delai moyen de traitement" },
  { value: "95%", label: "couverture du territoire" },
  { value: "100%", label: "en ligne" },
  { value: "24/7", label: "suivi en ligne" },
];

const advantages = [
  {
    icon: ShieldCheck,
    title: "Dossier garanti conforme",
    description:
      "Chaque dossier est verifie par nos experts pour garantir sa conformite aux exigences Enedis. Zero rejet, zero retard.",
  },
  {
    icon: Timer,
    title: "Traitement rapide",
    description:
      "Votre dossier est pris en charge sous 48h et transmis directement a Enedis pour accelerer les delais.",
  },
  {
    icon: UsersThree,
    title: "Expert dedie",
    description:
      "Un interlocuteur unique vous accompagne du debut a la fin de votre projet de raccordement.",
  },
  {
    icon: Headset,
    title: "Support continu",
    description:
      "Une equipe disponible par telephone et email pour repondre a toutes vos questions sur votre dossier.",
  },
];

const AdvantagesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="py-24 bg-[hsl(210,30%,97%)]">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-[40px] font-semibold text-foreground mb-6">
            Pourquoi nous choisir
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un accompagnement complet pour toutes vos demarches de raccordement electrique.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="card-elevated bg-card border border-border p-7"
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 icon-hover">
                <item.icon className="h-7 w-7 text-primary" weight="duotone" />
              </div>
              <h3 className="font-heading text-lg text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
