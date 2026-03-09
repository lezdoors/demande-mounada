import { Star } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const testimonials = [
  {
    ref: "REF-48271935",
    type: "Raccordement definitif",
    quote:
      "Dossier traite en 48h, raccordement effectue dans les delais annonces. Service tres professionnel, je recommande vivement.",
    author: "Marc D.",
    location: "Lyon (69)",
    rating: 5,
  },
  {
    ref: "REF-73916284",
    type: "Raccordement provisoire",
    quote:
      "Compteur de chantier installe rapidement grace a leur prise en charge complete du dossier. Un vrai gain de temps sur mon projet.",
    author: "Sophie L.",
    location: "Bordeaux (33)",
    rating: 5,
  },
  {
    ref: "REF-52084163",
    type: "Viabilisation",
    quote:
      "Excellent accompagnement pour la viabilisation de mon terrain. L'equipe a gere toute la coordination avec Enedis.",
    author: "Jean-Pierre M.",
    location: "Toulouse (31)",
    rating: 5,
  },
  {
    ref: "REF-91537420",
    type: "Augmentation puissance",
    quote:
      "Suite a l'installation de ma pompe a chaleur, j'avais besoin d'augmenter la puissance. Tout a ete gere sans que j'aie a me deplacer.",
    author: "Claire B.",
    location: "Nantes (44)",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="section-padding bg-muted/40">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Rapports de satisfaction
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Decouvrez les retours de nos clients sur leur experience de raccordement.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.ref}
              className="bg-card border border-border rounded-2xl p-7"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded">
                  {t.ref}
                </span>
                <span className="text-xs font-medium text-primary bg-primary/8 px-2.5 py-1 rounded-full">
                  {t.type}
                </span>
              </div>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "text-amber-400 fill-amber-400" : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground">{t.author}</span>
                <span className="text-muted-foreground">-</span>
                <span className="text-muted-foreground">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
