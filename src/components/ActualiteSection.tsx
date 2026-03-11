import { Calendar } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const articles = [
  {
    date: "28 novembre 2025",
    title: "Nouveaux delais de raccordement Enedis 2026",
    summary:
      "Enedis annonce une reduction des delais de traitement pour les demandes de raccordement residentiel. Decouvrez les nouveaux engagements.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
  },
  {
    date: "12 decembre 2025",
    title: "Tarifs raccordement : ce qui change en 2026",
    summary:
      "La Commission de regulation de l'energie a publie les nouveaux baremes applicables aux raccordements electriques pour l'annee 2026.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
  {
    date: "22 novembre 2025",
    title: "Viabilisation de terrain : les etapes cles du raccordement",
    summary:
      "Decouvrez les demarches essentielles pour viabiliser un terrain et raccorder votre parcelle au reseau electrique Enedis.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
];

const ActualiteSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="section-padding bg-muted/30">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in mb-10">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            Actualites
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground">
            Informations raccordement
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mt-3" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </div>
                <h3 className="font-heading text-base sm:text-lg text-foreground mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActualiteSection;
