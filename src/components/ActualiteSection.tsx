import { Calendar, ArrowRight } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const articles = [
  {
    date: "Mars 2026",
    title: "Nouveaux tarifs de raccordement Enedis 2026",
    summary:
      "Enedis a publie sa grille tarifaire mise a jour pour les raccordements neufs. Decouvrez les changements et ce qu'ils impliquent pour votre projet.",
    tag: "Tarifs",
  },
  {
    date: "Fevrier 2026",
    title: "Delais de raccordement : les engagements d'Enedis",
    summary:
      "Le regulateur CRE a rappele les engagements de delai d'Enedis pour les differents types de raccordement. Point sur les delais moyens constates.",
    tag: "Reglementation",
  },
  {
    date: "Janvier 2026",
    title: "Raccordement photovoltaique : les etapes cles",
    summary:
      "Guide complet pour raccorder votre installation solaire au reseau Enedis. De la demande de raccordement au contrat d'acces.",
    tag: "Guide",
  },
];

const ActualiteSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="section-padding bg-muted/40">
      <div className="section-container">
        <div ref={ref} className="scroll-fade-in text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Actualites raccordement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les dernieres informations sur le raccordement electrique en France.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/8 px-2.5 py-1 rounded-full">
                    {article.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </div>
                </div>
                <h3 className="font-heading text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {article.summary}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                  Lire l'article
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActualiteSection;
