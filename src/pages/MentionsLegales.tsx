import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "1. Editeur du site",
    content: `Le site demande-raccordement.fr est edite par Demande Raccordement, service de preparation de dossier de raccordement electrique.

Email : contact@demande-raccordement.fr
Telephone : 01 88 61 50 00
Directeur de la publication : Naoufal Haddaoui`,
  },
  {
    title: "2. Hebergeur",
    content: `Le site est heberge par :
Vercel Inc.
340 S Lemon Ave #4133
Walnut, CA 91789, USA
https://vercel.com`,
  },
  {
    title: "3. Objet du site",
    content: `Le site demande-raccordement.fr propose un service payant de preparation, verification et structuration des dossiers de demande de raccordement electrique aupres d'Enedis. Ce service a pour but de simplifier les demarches administratives des particuliers et professionnels.`,
  },
  {
    title: "4. Non-affiliation",
    content: `Ce site n'est pas affilie a Enedis, a EDF ni a aucun distributeur d'electricite. Enedis est une marque deposee du groupe EDF. Les references a Enedis sont faites uniquement a titre informatif dans le cadre de la description du service propose.`,
  },
  {
    title: "5. Propriete intellectuelle",
    content: `L'ensemble du contenu du site demande-raccordement.fr (textes, images, graphismes, logo, icones, logiciels, etc.) est protege par le droit d'auteur et le droit de la propriete intellectuelle. Toute reproduction, representation, modification, publication ou adaptation de tout ou partie des elements du site est interdite sans l'autorisation ecrite prealable de Demande Raccordement.`,
  },
  {
    title: "6. Donnees personnelles",
    content: `Conformement au Reglement General sur la Protection des Donnees (RGPD) et a la loi Informatique et Libertes, les utilisateurs disposent de droits sur leurs donnees personnelles. Pour plus d'informations, veuillez consulter notre Politique de Confidentialite.

Les donnees collectees via les formulaires du site sont utilisees exclusivement pour le traitement des demandes de raccordement et la communication avec les utilisateurs.`,
  },
  {
    title: "7. Cookies",
    content: `Le site utilise des cookies techniques necessaires a son bon fonctionnement ainsi que des cookies analytiques (Google Analytics) pour mesurer l'audience. L'utilisateur peut configurer son navigateur pour refuser les cookies.`,
  },
  {
    title: "8. Limitation de responsabilite",
    content: `Demande Raccordement s'efforce d'assurer l'exactitude des informations diffusees sur le site. Toutefois, Demande Raccordement ne peut garantir l'exactitude, la completude ou l'actualite des informations. Demande Raccordement decline toute responsabilite pour les decisions prises par Enedis ou tout distributeur d'electricite, ainsi que pour les delais et couts de raccordement eux-memes.`,
  },
  {
    title: "9. Droit applicable",
    content: `Les presentes mentions legales sont soumises au droit francais. En cas de litige, les tribunaux de Paris seront seuls competents.`,
  },
];

const MentionsLegales = () => {
  const heroRef = useScrollFadeIn();
  const contentRef = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="py-16 sm:py-24 bg-muted/40">
          <div className="section-container">
            <div ref={heroRef} className="scroll-fade-in text-center max-w-3xl mx-auto">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
                Mentions legales
              </h1>
              <p className="text-sm text-muted-foreground">
                Derniere mise a jour : Mars 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div ref={contentRef} className="scroll-fade-in max-w-3xl mx-auto">
              <div className="space-y-10">
                {sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="font-heading text-xl sm:text-2xl text-foreground mb-4">
                      {section.title}
                    </h2>
                    <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                    {i < sections.length - 1 && (
                      <div className="border-b border-border mt-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default MentionsLegales;
