import { Star } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const testimonials = [
  {
    quote:
      "Dossier traite en 48h, raccordement effectue dans les delais annonces. Service tres professionnel.",
    author: "Marc D.",
    location: "Lyon (69)",
    rating: 5,
  },
  {
    quote:
      "Compteur de chantier installe rapidement grace a leur prise en charge complete du dossier.",
    author: "Sophie L.",
    location: "Bordeaux (33)",
    rating: 5,
  },
  {
    quote:
      "Excellent accompagnement pour la viabilisation de mon terrain. Coordination Enedis impeccable.",
    author: "Jean-Pierre M.",
    location: "Toulouse (31)",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="py-16 bg-background">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              4.8/5 base sur les retours clients
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="card-elevated border border-border/60 px-4 py-3 sm:px-5 sm:py-4"
              >
                <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed mb-2 sm:mb-3">
                  "{t.quote}"
                </p>
                <p className="text-[11px] sm:text-xs text-muted-foreground/70">
                  {t.author} — {t.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
