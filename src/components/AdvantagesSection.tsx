import { Shield, Clock, Users, Headphones } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const stats = [
  { value: "180 000+", label: "dossiers traites" },
  { value: "48h", label: "delai moyen de traitement" },
  { value: "98%", label: "taux de satisfaction" },
  { value: "24/7", label: "suivi en ligne" },
];

const advantages = [
  {
    icon: Shield,
    title: "Dossier garanti conforme",
    description:
      "Chaque dossier est verifie par nos experts pour garantir sa conformite aux exigences Enedis. Zero rejet, zero retard.",
  },
  {
    icon: Clock,
    title: "Traitement rapide",
    description:
      "Votre dossier est pris en charge sous 48h et transmis directement a Enedis pour accelerer les delais.",
  },
  {
    icon: Users,
    title: "Expert dedie",
    description:
      "Un interlocuteur unique vous accompagne du debut a la fin de votre projet de raccordement.",
  },
  {
    icon: Headphones,
    title: "Support continu",
    description:
      "Une equipe disponible par telephone et email pour repondre a toutes vos questions sur votre dossier.",
  },
];

const AdvantagesSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="section-padding bg-muted/40">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Pourquoi nous choisir
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des milliers de particuliers et professionnels nous font confiance pour leurs demarches de raccordement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-7 hover:shadow-md transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                <item.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl sm:text-4xl text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
