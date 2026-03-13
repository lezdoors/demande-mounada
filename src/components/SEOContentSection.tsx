import { MapPin } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const regions = [
  "Ile-de-France",
  "Auvergne-Rhone-Alpes",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Provence-Alpes-Cote d'Azur",
  "Hauts-de-France",
  "Grand Est",
  "Pays de la Loire",
  "Bretagne",
  "Normandie",
  "Bourgogne-Franche-Comte",
  "Centre-Val de Loire",
];

const SEOContentSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div ref={ref} className="scroll-fade-in mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-foreground mb-6 text-center">
              Le raccordement electrique en France
            </h2>

            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                Le raccordement electrique consiste a relier votre installation interieure
                au reseau public de distribution d'electricite gere par Enedis (ex-ERDF).
                Cette demarche est obligatoire pour toute construction neuve, renovation
                importante ou installation de production d'electricite.
              </p>
              <p>
                La demande de raccordement doit etre adressee a Enedis, le gestionnaire du
                reseau de distribution d'electricite qui couvre 95% du territoire francais.
                Le delai de raccordement varie de 2 semaines (raccordement provisoire) a
                plusieurs mois (raccordement definitif avec extension de reseau).
              </p>
              <p>
                Notre service vous accompagne dans la constitution de votre dossier de
                raccordement en verifiant la completude des documents, la coherence des
                informations techniques et la conformite aux exigences administratives.
                Nous intervenons sur tous les types de raccordement : definitif, provisoire,
                viabilisation, augmentation de puissance, collectif et production.
              </p>
            </div>
          </div>

          <div className="bg-muted/50 rounded-3xl shadow-sm p-8">
            <h3 className="font-heading text-xl text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Couverture nationale
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {regions.map((region) => (
                <div
                  key={region}
                  className="text-sm text-muted-foreground bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition px-4 py-2.5 text-center"
                >
                  {region}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Service disponible sur l'ensemble du territoire desservi par Enedis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContentSection;
