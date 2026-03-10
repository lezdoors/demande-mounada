import { usePageMeta } from "@/hooks/usePageMeta";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "1. Objet",
    content: `Les presentes Conditions Generales de Vente (ci-apres "CGV") regissent les relations contractuelles entre Demande Raccordement (ci-apres "le Prestataire") et toute personne physique ou morale (ci-apres "le Client") passant commande du service de preparation de dossier de raccordement electrique via le site demande-raccordement.fr.

Toute commande implique l'acceptation sans reserve des presentes CGV.`,
  },
  {
    title: "2. Service propose",
    content: `Le Prestataire propose un service de preparation, verification et structuration du dossier de demande de raccordement electrique aupres d'Enedis. Ce service comprend :

- L'analyse de votre projet de raccordement
- La verification de la completude et de la conformite des informations fournies
- La constitution du dossier selon les exigences d'Enedis
- La structuration des documents necessaires a la demande
- L'accompagnement dans les demarches administratives

Le service vise a simplifier et accelerer le processus de demande de raccordement pour les particuliers et les professionnels.`,
  },
  {
    title: "3. Ce qui n'est PAS inclus",
    content: `Le service de preparation de dossier ne couvre pas les elements suivants :

- Les frais de raccordement factures par Enedis : le cout du raccordement lui-meme est determine et facture directement par Enedis selon ses propres baremes.
- Les travaux d'installation electrique : les travaux de mise en conformite, d'installation du tableau electrique ou de tout autre equipement electrique sur le site du Client.
- Le choix du fournisseur d'electricite : la souscription d'un contrat de fourniture d'electricite aupres du fournisseur de votre choix.
- Les decisions d'Enedis : les delais de traitement, les conditions techniques et les tarifs appliques par Enedis, sur lesquels le Prestataire n'a aucun controle.`,
  },
  {
    title: "4. Prix",
    content: `Le prix du service de preparation de dossier est de 129,80 EUR TTC (Toutes Taxes Comprises).

Le paiement s'effectue en une seule fois, par carte bancaire. Le paiement est exige au moment de la validation de la commande.

Le Prestataire se reserve le droit de modifier ses tarifs a tout moment. Les tarifs applicables sont ceux en vigueur au moment de la validation de la commande par le Client.`,
  },
  {
    title: "5. Processus de commande",
    content: `La commande s'effectue selon les etapes suivantes :

1. Remplissage du formulaire en ligne : le Client fournit les informations relatives a son projet de raccordement (type de raccordement, adresse, puissance souhaitee, etc.).
2. Validation des informations : le Client verifie les informations saisies et valide sa demande.
3. Paiement : le Client procede au reglement de 129,80 EUR TTC par carte bancaire.
4. Confirmation : le Client recoit une confirmation de commande par email avec un numero de reference.
5. Traitement du dossier : l'equipe de Demande Raccordement prend en charge la preparation du dossier.

La commande est consideree comme definitive apres la confirmation du paiement.`,
  },
  {
    title: "6. Delai d'execution",
    content: `Le traitement du dossier de raccordement debute sous 48 heures ouvrees apres la reception du paiement et la validation des informations fournies par le Client.

Le delai d'execution peut varier en fonction de la complexite du dossier et de la completude des informations transmises par le Client. Le Prestataire s'engage a informer le Client de l'avancement de son dossier par email.

En cas d'informations manquantes ou incorrectes, le Prestataire contactera le Client pour obtenir les complements necessaires. Le delai de traitement sera ajuste en consequence.`,
  },
  {
    title: "7. Droit de retractation",
    content: `Conformement a l'article L.221-18 du Code de la consommation, le Client dispose d'un droit de retractation de 14 jours a compter de la date d'achat, sans avoir a justifier de motifs ni a payer de penalites.

Si le service n'a pas encore ete execute (c'est-a-dire si le traitement du dossier n'a pas encore debute), le Client beneficiera d'un remboursement integral du montant verse.

Si le Client a expressement demande que l'execution du service commence avant l'expiration du delai de retractation et que le service a ete partiellement ou integralement execute, le droit de retractation ne pourra plus etre exerce, conformement a l'article L.221-28 du Code de la consommation.

Pour exercer son droit de retractation, le Client doit adresser sa demande par email a : contact@demande-raccordement.fr en indiquant son numero de reference de commande. Le remboursement sera effectue dans un delai de 14 jours suivant la reception de la demande, via le meme moyen de paiement que celui utilise pour la commande.`,
  },
  {
    title: "8. Responsabilite",
    content: `Le Prestataire s'engage a apporter tout le soin et la diligence necessaires a la preparation du dossier de raccordement du Client.

Toutefois, le Prestataire ne peut etre tenu responsable :

- Des decisions prises par Enedis concernant l'acceptation, le refus ou les conditions du raccordement
- Des delais de traitement appliques par Enedis ou tout autre organisme
- Du cout du raccordement lui-meme, determine par Enedis selon ses propres baremes
- Des informations erronees ou incompletes fournies par le Client
- Des consequences liees a l'interruption ou au dysfonctionnement du site pour des raisons techniques independantes de sa volonte

La responsabilite du Prestataire est limitee au montant de la commande, soit 129,80 EUR TTC.`,
  },
  {
    title: "9. Reclamations",
    content: `Pour toute reclamation relative au service, le Client peut contacter le Prestataire :

- Par email : contact@demande-raccordement.fr
- Par telephone : 01 88 61 50 00 (du lundi au vendredi, de 9h a 18h)

Le Prestataire s'engage a accuser reception de toute reclamation dans un delai de 48 heures ouvrees et a y apporter une reponse dans un delai raisonnable.

En cas de litige non resolu a l'amiable, le Client peut recourir a un mediateur de la consommation conformement aux articles L.611-1 et suivants du Code de la consommation.`,
  },
  {
    title: "10. Droit applicable et juridiction competente",
    content: `Les presentes CGV sont soumises au droit francais.

En cas de litige relatif a l'interpretation ou a l'execution des presentes CGV, et a defaut de resolution amiable, les tribunaux competents de Paris seront seuls competents pour connaitre du differend.

Le Client est informe qu'il peut en tout etat de cause recourir a une mediation conventionnelle ou a tout autre mode alternatif de reglement des differends.`,
  },
];

const ConditionsGenerales = () => {
  usePageMeta({
    title: "Conditions Générales de Vente | Demande Raccordement",
    description: "Conditions générales de vente du service de raccordement électrique en ligne.",
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
                Conditions generales de vente
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

export default ConditionsGenerales;
