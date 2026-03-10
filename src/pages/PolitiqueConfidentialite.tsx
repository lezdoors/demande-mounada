import { usePageMeta } from "@/hooks/usePageMeta";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "1. Introduction",
    content: `Demande Raccordement s'engage a proteger la vie privee des utilisateurs de son site demande-raccordement.fr. La presente politique de confidentialite decrit les types de donnees personnelles collectees, les finalites de leur traitement, ainsi que les droits dont disposent les personnes concernees conformement au Reglement General sur la Protection des Donnees (RGPD).`,
  },
  {
    title: "2. Responsable du traitement",
    content: `Le responsable du traitement des donnees personnelles est :

Demande Raccordement
Email : contact@demande-raccordement.fr
Telephone : 01 88 61 50 00

Pour toute question relative a la protection de vos donnees personnelles, vous pouvez nous contacter a l'adresse email ci-dessus.`,
  },
  {
    title: "3. Donnees collectees",
    content: `Dans le cadre de notre service, nous collectons les donnees personnelles suivantes :

- Nom et prenom
- Adresse email
- Numero de telephone
- Adresse du projet de raccordement
- Informations techniques relatives au raccordement (type de raccordement, puissance souhaitee, nature du projet)
- Donnees de paiement (traitees de maniere securisee)

Ces donnees sont collectees lorsque vous remplissez le formulaire de demande en ligne ou lorsque vous nous contactez directement.`,
  },
  {
    title: "4. Finalite du traitement",
    content: `Vos donnees personnelles sont traitees pour les finalites suivantes :

- Preparation et constitution de votre dossier de demande de raccordement electrique
- Communication sur l'avancement de votre dossier
- Traitement de votre paiement
- Reponse a vos demandes de renseignements et de support
- Amelioration continue de notre service et de l'experience utilisateur
- Respect de nos obligations legales et reglementaires`,
  },
  {
    title: "5. Base legale du traitement",
    content: `Le traitement de vos donnees personnelles repose sur les bases legales suivantes :

- Execution du contrat de service (article 6.1.b du RGPD) : le traitement est necessaire a l'execution du service que vous avez commande, a savoir la preparation de votre dossier de raccordement.
- Interet legitime (article 6.1.f du RGPD) : amelioration de nos services et analyse de l'utilisation du site.
- Consentement (article 6.1.a du RGPD) : pour les cookies analytiques et les communications marketing eventuelles.`,
  },
  {
    title: "6. Destinataires des donnees",
    content: `Vos donnees personnelles sont accessibles uniquement aux personnes et entites suivantes :

- L'equipe interne de Demande Raccordement, dans la stricte mesure necessaire au traitement de votre dossier
- Nos sous-traitants techniques :
  - Hebergeur : Vercel Inc. (hebergement du site)
  - Service de paiement : prestataire bancaire agree (traitement des paiements par carte)
  - Service email : pour les communications transactionnelles liees a votre dossier

Aucune donnee personnelle n'est vendue, louee ou cedee a des tiers a des fins commerciales.`,
  },
  {
    title: "7. Duree de conservation",
    content: `Vos donnees personnelles sont conservees pendant une duree de 3 ans a compter de votre derniere interaction avec notre service (derniere connexion, derniere demande, dernier echange).

A l'issue de cette periode, vos donnees sont supprimees ou anonymisees de maniere irreversible.

Les donnees necessaires au respect de nos obligations legales (notamment fiscales et comptables) peuvent etre conservees pour la duree prevue par la reglementation applicable.`,
  },
  {
    title: "8. Droits des personnes",
    content: `Conformement au RGPD, vous disposez des droits suivants sur vos donnees personnelles :

- Droit d'acces : obtenir la confirmation du traitement de vos donnees et en recevoir une copie
- Droit de rectification : faire corriger des donnees inexactes ou incompletes
- Droit a l'effacement : demander la suppression de vos donnees dans les conditions prevues par la loi
- Droit a la portabilite : recevoir vos donnees dans un format structure et lisible par machine
- Droit d'opposition : vous opposer au traitement de vos donnees pour des motifs legitimes
- Droit a la limitation du traitement : demander la suspension du traitement dans certains cas

Pour exercer l'un de ces droits, contactez-nous a : contact@demande-raccordement.fr

Vous disposez egalement du droit d'introduire une reclamation aupres de la CNIL (Commission Nationale de l'Informatique et des Libertes) : www.cnil.fr`,
  },
  {
    title: "9. Cookies",
    content: `Le site demande-raccordement.fr utilise les types de cookies suivants :

Cookies techniques (strictement necessaires) :
Ces cookies sont indispensables au fonctionnement du site. Ils permettent la navigation, la securite et l'acces aux fonctionnalites de base. Ils ne necessitent pas de consentement prealable.

Cookies analytiques (Google Analytics) :
Ces cookies nous permettent de mesurer l'audience du site, de comprendre comment les visiteurs interagissent avec nos pages et d'ameliorer notre service. Ces cookies sont deposes uniquement avec votre consentement.

Vous pouvez a tout moment configurer votre navigateur pour accepter ou refuser les cookies. Le refus des cookies analytiques n'affecte pas le fonctionnement du site.`,
  },
  {
    title: "10. Modifications de la politique",
    content: `Nous nous reservons le droit de modifier la presente politique de confidentialite a tout moment afin de l'adapter aux evolutions legales, reglementaires ou techniques.

En cas de modification substantielle, nous vous en informerons via le site. La date de derniere mise a jour est indiquee en haut de cette page.

Nous vous invitons a consulter regulierement cette page pour prendre connaissance des eventuelles modifications.`,
  },
];

const PolitiqueConfidentialite = () => {
  usePageMeta({
    title: "Politique de Confidentialité | Demande Raccordement",
    description: "Politique de confidentialité et protection des données personnelles. Conformité RGPD.",
  });
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
                Politique de confidentialite
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

export default PolitiqueConfidentialite;
